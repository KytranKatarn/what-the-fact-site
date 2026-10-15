import React, { useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';

export const Governance: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="section governance" id="governance" aria-labelledby="governance-title">
      <div className="container">
        <div className="governance-inner">
          <div className="governance-text">
            <span className="section-label">AI Governance</span>
            <h2 className="section-title" id="governance-title">Monitored by C.R.E.E.D.</h2>
            <p className="governance-desc">
              Every AI decision made in our pipeline is logged, scored, and publicly audited by{' '}
              <strong>C.R.E.E.D.</strong> — the Compliance, Rights &amp; Ethical Enforcement Directive.
              No black boxes. No hidden prompts. If an agent makes a call, you can see why.
            </p>
            <ul className="governance-list" role="list">
              <li>
                <Check size={18} aria-hidden="true" />
                <span>Real-time audit log of every agent action</span>
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                <span>Ethics scoring on every published decision</span>
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                <span>Open-source governance methodology</span>
              </li>
              <li>
                <Check size={18} aria-hidden="true" />
                <span>Public compliance results — no cherry-picking</span>
              </li>
            </ul>
            <a 
              href="https://creed-ai.org" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline btn-outline--gold"
            >
              Visit C.R.E.E.D. Institute
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>

          <div className="governance-badge-panel" aria-label="C.R.E.E.D. compliance badge">
            <div className="badge-card">
              <div className="badge-header">
                <span className="badge-org">C.R.E.E.D.</span>
                <span className="badge-status">MONITORED</span>
              </div>
              <div className="badge-embed-wrapper">
                {!imgError ? (
                  <img
                    src="https://creed.kytranempowerment.com/api/v1/badge/overall"
                    alt="C.R.E.E.D. overall compliance badge"
                    className="creed-badge-img"
                    loading="lazy"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="badge-fallback" role="status" aria-label="Badge status">
                    <span className="badge-fallback-icon">⚖</span>
                    <span className="badge-fallback-text">C.R.E.E.D. Monitored</span>
                  </div>
                )}
              </div>
              <a 
                href="https://creed.kytranempowerment.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="badge-view-link"
              >
                View public compliance results →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
