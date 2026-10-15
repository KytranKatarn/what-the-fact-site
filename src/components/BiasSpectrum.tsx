import React, { useState } from 'react';
import { OUTLETS } from '../data/content';
import { Outlet } from '../types';
import { Eye, Activity, Layers, Sparkles } from 'lucide-react';

export const BiasSpectrum: React.FC = () => {
  const [selectedOutlet, setSelectedOutlet] = useState<Outlet>(
    OUTLETS.find(o => o.isVerifiedCenter) || OUTLETS[0]
  );

  return (
    <section className="section bias-spectrum" id="bias-spectrum" aria-labelledby="bias-title">
      <div className="container">
        <div className="section-header section-header--center">
          <span className="section-label">Media Transparency</span>
          <h2 className="section-title" id="bias-title">See Where Every Source Falls</h2>
          <p className="section-subtitle">
            Every story. Every outlet. On the same spectrum. No more guessing whose agenda is showing.
          </p>
        </div>

        <div className="spectrum-card" role="region" aria-label="Bias spectrum interactive visualization">
          <div className="spectrum-labels" aria-hidden="true">
            <span className="spectrum-label-item spectrum-label--left">Far Left</span>
            <span className="spectrum-label-item spectrum-label--cleft">Center Left</span>
            <span className="spectrum-label-item spectrum-label--center">Center</span>
            <span className="spectrum-label-item spectrum-label--cright">Center Right</span>
            <span className="spectrum-label-item spectrum-label--right">Far Right</span>
          </div>

          <div className="spectrum-bar-wrapper">
            <div className="spectrum-bar">
              <div className="spectrum-gradient" aria-hidden="true"></div>
              <div className="center-line" title="Verified Center" aria-hidden="true"></div>

              {OUTLETS.map((outlet) => {
                let dotClass = 'outlet-dot';
                if (outlet.isVerifiedCenter) {
                  dotClass += ' outlet-dot--verified';
                } else if (outlet.isGold) {
                  dotClass += ' outlet-dot--gold';
                }
                if (selectedOutlet.name === outlet.name) {
                  dotClass += ' active';
                }

                return (
                  <button
                    key={outlet.name}
                    type="button"
                    className={dotClass}
                    style={{
                      left: `${outlet.positionPercent}%`,
                      bottom: outlet.bottomOffset || '8px'
                    }}
                    onClick={() => setSelectedOutlet(outlet)}
                    onMouseEnter={() => setSelectedOutlet(outlet)}
                    aria-label={`${outlet.name} - ${outlet.category} (${outlet.positionPercent}%)`}
                    title={`${outlet.name} (${outlet.category})`}
                  />
                );
              })}
            </div>
          </div>

          {/* Active outlet inspection callout */}
          {selectedOutlet && (
            <div className="outlet-details-panel">
              <div>
                <div className="outlet-details-title">
                  <span>{selectedOutlet.name}</span>
                  <span 
                    className="outlet-details-badge" 
                    style={{
                      backgroundColor: selectedOutlet.isVerifiedCenter 
                        ? 'rgba(34, 211, 238, 0.15)' 
                        : selectedOutlet.category.includes('Left')
                          ? 'rgba(96, 165, 250, 0.15)'
                          : selectedOutlet.category.includes('Right')
                            ? 'rgba(230, 57, 70, 0.15)'
                            : 'rgba(201, 164, 76, 0.15)',
                      color: selectedOutlet.isVerifiedCenter 
                        ? '#22d3ee' 
                        : selectedOutlet.category.includes('Left')
                          ? '#60a5fa'
                          : selectedOutlet.category.includes('Right')
                            ? '#e63946'
                            : '#c9a44c'
                    }}
                  >
                    {selectedOutlet.category} • {selectedOutlet.positionPercent}% Spectrum Index
                  </span>
                </div>
                <div className="outlet-details-text" style={{ marginTop: '4px' }}>
                  {selectedOutlet.description}
                </div>
              </div>
              {selectedOutlet.isVerifiedCenter && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#22d3ee', fontSize: '0.8rem', fontWeight: 600 }}>
                  <Sparkles size={16} /> Verified Center
                </div>
              )}
            </div>
          )}

          <div className="spectrum-legend" aria-hidden="true">
            <div className="legend-item">
              <span className="legend-dot legend-dot--white"></span>
              <span>Media outlet score</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-dot--gold"></span>
              <span>Prominent outlet</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot legend-dot--verified"></span>
              <span>WTF verified center</span>
            </div>
          </div>

          <p className="spectrum-caption">
            Scores are computed per-story based on language analysis, source selection, and omission patterns — not permanent political labels. Click or hover any node to inspect.
          </p>
        </div>

        <div className="spectrum-features" role="list" aria-label="Bias spectrum features">
          <div className="spec-feature is-visible" role="listitem">
            <div className="spec-feature-icon" aria-hidden="true">
              <Eye size={22} />
            </div>
            <h3>Per-Story Scoring</h3>
            <p>No permanent labels. Each outlet is re-scored on every story based on actual content analysis.</p>
          </div>
          <div className="spec-feature is-visible" role="listitem">
            <div className="spec-feature-icon" aria-hidden="true">
              <Activity size={22} />
            </div>
            <h3>Omission Detection</h3>
            <p>Identifies not just what was said, but what was left out — often the most revealing bias signal.</p>
          </div>
          <div className="spec-feature is-visible" role="listitem">
            <div className="spec-feature-icon" aria-hidden="true">
              <Layers size={22} />
            </div>
            <h3>Cross-Source Matrix</h3>
            <p>See how 10+ outlets cover the same event — gaps and contradictions highlighted automatically.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
