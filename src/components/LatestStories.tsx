import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertCircle, ExternalLink, MapPin, RefreshCw, Newspaper, Clock, CheckCircle2 } from 'lucide-react';
import { GeoArticle } from '../types';

const GEO_FEED_URL = 'https://what-the-fact.com/api/proxy/articles/geo?scope=canada';
const INITIAL_VISIBLE_COUNT = 6;
const FETCH_TIMEOUT_MS = 12000;

type FetchStatus = 'loading' | 'success' | 'error' | 'empty';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeOptionalText(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeArticle(item: unknown): GeoArticle | null {
  if (!isRecord(item)) return null;

  const rawId = item.id;
  if (typeof rawId !== 'number' || !Number.isSafeInteger(rawId) || rawId <= 0) {
    return null;
  }

  const title = normalizeOptionalText(item.title);
  if (!title) {
    return null;
  }

  const rawProvince = normalizeOptionalText(item.province_code);
  const provinceCode = rawProvince ? rawProvince.toUpperCase() : null;
  const sourceName = normalizeOptionalText(item.source_name) ?? 'Canadian Source';
  const biasBand = normalizeOptionalText(item.bias_band);
  const aiAnalyzed = typeof item.ai_analyzed === 'boolean' ? item.ai_analyzed : false;

  const lat = typeof item.lat === 'number' && Number.isFinite(item.lat) ? item.lat : null;
  const lng = typeof item.lng === 'number' && Number.isFinite(item.lng) ? item.lng : null;

  return {
    id: rawId,
    title,
    lat,
    lng,
    province_code: provinceCode,
    source_name: sourceName,
    bias_band: biasBand,
    ai_analyzed: aiAnalyzed,
  };
}

function formatBiasBand(band: string | null): string {
  if (!band) return 'Unclassified';
  const normalized = band.trim().toLowerCase().replace(/-/g, '_');
  switch (normalized) {
    case 'far_left':
      return 'Far Left';
    case 'left':
      return 'Left';
    case 'center_left':
      return 'Center Left';
    case 'center':
      return 'Center';
    case 'center_right':
      return 'Center Right';
    case 'right':
      return 'Right';
    case 'far_right':
      return 'Far Right';
    default:
      return band.trim().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ');
  }
}

function getBiasBandModifier(band: string | null): string {
  if (!band) return 'story-badge--neutral';
  const normalized = band.trim().toLowerCase().replace(/-/g, '_');
  if (normalized.includes('left')) return 'story-badge--left';
  if (normalized.includes('right')) return 'story-badge--right';
  if (normalized === 'center') return 'story-badge--center';
  return 'story-badge--neutral';
}

export const LatestStories: React.FC = () => {
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [articles, setArticles] = useState<GeoArticle[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string>('ALL');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const loadStories = useCallback(async () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    let didTimeout = false;
    const timeoutId = window.setTimeout(() => {
      didTimeout = true;
      controller.abort();
    }, FETCH_TIMEOUT_MS);
    timeoutRef.current = timeoutId;

    setStatus('loading');
    setErrorMessage(null);

    try {
      const response = await fetch(GEO_FEED_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Feed request failed with status ${response.status}`);
      }

      const rawData: unknown = await response.json();

      if (!isRecord(rawData) || rawData.ok !== true || !Array.isArray(rawData.articles)) {
        throw new Error('Unexpected response format from the stories feed.');
      }

      const validArticles = rawData.articles
        .map(normalizeArticle)
        .filter((item): item is GeoArticle => item !== null);

      if (controller.signal.aborted) {
        return;
      }

      setArticles(validArticles);
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      setStatus(validArticles.length === 0 ? 'empty' : 'success');
    } catch (err) {
      if (didTimeout) {
        setErrorMessage('Request timed out while loading sourced stories. Please try again.');
        setStatus('error');
        return;
      }
      if ((err instanceof DOMException && err.name === 'AbortError') || controller.signal.aborted) {
        return;
      }
      const message =
        err instanceof Error ? err.message : 'Unable to load the latest sourced stories.';
      setErrorMessage(message);
      setStatus('error');
    } finally {
      window.clearTimeout(timeoutId);
      if (timeoutRef.current === timeoutId) {
        timeoutRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    void loadStories();
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadStories]);

  const provinces = useMemo(() => {
    const codes = new Set<string>();
    articles.forEach((article) => {
      if (article.province_code) {
        codes.add(article.province_code);
      }
    });
    return Array.from(codes).sort();
  }, [articles]);

  const filteredArticles = useMemo(() => {
    if (selectedProvince === 'ALL') {
      return articles;
    }
    return articles.filter((article) => article.province_code === selectedProvince);
  }, [articles, selectedProvince]);

  const displayedArticles = useMemo(
    () => filteredArticles.slice(0, visibleCount),
    [filteredArticles, visibleCount]
  );

  const handleProvinceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(event.target.value);
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  };

  return (
    <section
      className="section latest-stories"
      id="latest-stories"
      aria-labelledby="latest-stories-title"
    >
      <div className="container">
        <div className="stories-header">
          <div className="section-header" style={{ marginBottom: 0 }}>
            <span className="section-label">Live Canadian Coverage</span>
            <h2 className="section-title" id="latest-stories-title">
              Latest Sourced Stories
            </h2>
            <p className="section-subtitle">
              Recent headlines mapped across Canada from participating newsrooms. This preview
              includes location-tagged stories only and does not show every article, date, or
              summary.
            </p>
          </div>

          <div className="stories-controls">
            {provinces.length > 0 && status === 'success' && (
              <div className="stories-filter">
                <label htmlFor="province-filter" className="stories-filter-label">
                  Province
                </label>
                <select
                  id="province-filter"
                  className="stories-select"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                  aria-label="Filter stories by province"
                >
                  <option value="ALL">All ({articles.length})</option>
                  {provinces.map((code) => (
                    <option key={code} value={code}>
                      {code}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              type="button"
              className="btn btn-outline stories-refresh-btn"
              onClick={() => void loadStories()}
              disabled={status === 'loading'}
              aria-label="Refresh latest sourced stories"
            >
              <RefreshCw
                size={15}
                className={status === 'loading' ? 'spin-icon' : ''}
                aria-hidden="true"
              />
              {status === 'loading' ? 'Loading…' : 'Refresh'}
            </button>
          </div>
        </div>

        <div className="stories-live-region" aria-live="polite" aria-busy={status === 'loading'}>
          {status === 'loading' && (
            <div className="stories-grid" role="status" aria-label="Loading sourced stories">
              {Array.from({ length: INITIAL_VISIBLE_COUNT }).map((_, index) => (
                <div key={index} className="story-card story-card--skeleton" aria-hidden="true">
                  <div className="skeleton-line skeleton-line--short" />
                  <div className="skeleton-line skeleton-line--title" />
                  <div className="skeleton-line skeleton-line--title-sm" />
                  <div className="skeleton-footer">
                    <div className="skeleton-pill" />
                    <div className="skeleton-pill" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {status === 'error' && (
            <div className="stories-state-card stories-state-card--error" role="alert">
              <AlertCircle size={28} aria-hidden="true" className="stories-state-icon" />
              <h3>Unable to load sourced stories</h3>
              <p>{errorMessage || 'A network or server error occurred while fetching the feed.'}</p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => void loadStories()}
              >
                <RefreshCw size={16} aria-hidden="true" />
                Retry
              </button>
            </div>
          )}

          {status === 'empty' && (
            <div className="stories-state-card" role="status">
              <Newspaper size={28} aria-hidden="true" className="stories-state-icon" />
              <h3>No sourced stories available</h3>
              <p>No location-tagged stories were returned right now.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => void loadStories()}
              >
                <RefreshCw size={16} aria-hidden="true" />
                Retry
              </button>
            </div>
          )}

          {status === 'success' && filteredArticles.length === 0 && (
            <div className="stories-state-card" role="status">
              <Newspaper size={28} aria-hidden="true" className="stories-state-icon" />
              <h3>No stories for {selectedProvince}</h3>
              <p>Try clearing the province filter to view all available location-tagged stories.</p>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedProvince('ALL')}
              >
                Show all provinces
              </button>
            </div>
          )}

          {status === 'success' && displayedArticles.length > 0 && (
            <>
              <div className="stories-grid" role="list" aria-label="Sourced news stories">
                {displayedArticles.map((article) => {
                  const isAnalyzed = article.ai_analyzed === true;
                  const articleUrl = `https://what-the-fact.com/article/${article.id}`;

                  return (
                    <article key={article.id} className="story-card" role="listitem">
                      <div className="story-card-meta">
                        <span className="story-source">{article.source_name}</span>
                        {article.province_code && (
                          <span
                            className="story-province"
                            title={`Province: ${article.province_code}`}
                          >
                            <MapPin size={12} aria-hidden="true" />
                            {article.province_code}
                          </span>
                        )}
                      </div>

                      <h3 className="story-title">
                        <a
                          href={articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="story-title-link"
                        >
                          <span>{article.title}</span>
                          <ExternalLink
                            size={14}
                            className="story-external-icon"
                            aria-hidden="true"
                          />
                        </a>
                      </h3>

                      <div className="story-card-footer">
                        <span
                          className={`story-badge ${
                            isAnalyzed
                              ? getBiasBandModifier(article.bias_band)
                              : 'story-badge--neutral'
                          }`}
                        >
                          {isAnalyzed ? formatBiasBand(article.bias_band) : 'Bias pending'}
                        </span>

                        <span
                          className={`story-analysis ${
                            isAnalyzed ? 'story-analysis--done' : 'story-analysis--pending'
                          }`}
                          title={
                            isAnalyzed
                              ? 'AI pipeline analysis completed'
                              : 'AI pipeline analysis is pending — not verified'
                          }
                        >
                          {isAnalyzed ? (
                            <>
                              <CheckCircle2 size={13} aria-hidden="true" />
                              AI Analyzed
                            </>
                          ) : (
                            <>
                              <Clock size={13} aria-hidden="true" />
                              Analysis Pending
                            </>
                          )}
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="stories-footer-bar">
                <p className="stories-count-note">
                  Showing {displayedArticles.length} of {filteredArticles.length} location-tagged
                  stories{selectedProvince !== 'ALL' ? ` in ${selectedProvince}` : ''}.
                </p>

                {visibleCount < filteredArticles.length && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setVisibleCount((prev) => prev + 6)}
                  >
                    Load 6 more
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
