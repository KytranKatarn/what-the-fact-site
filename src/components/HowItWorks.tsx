import React from 'react';
import { PIPELINE_STEPS } from '../data/content';
import { Info } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'ink':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        );
      case 'bias':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <line x1="3" y1="12" x2="21" y2="12" />
            <polyline points="3 6 12 3 21 6" />
            <polyline points="3 18 12 21 21 18" />
          </svg>
        );
      case 'verify':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'draft':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        );
      case 'publish':
        return (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22l-4-9-9-4 20-7z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section className="section how-it-works" id="how-it-works" aria-labelledby="how-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">The Process</span>
          <h2 className="section-title" id="how-title">From Raw Story to Verified Truth</h2>
          <p className="section-subtitle">
            Five specialized AI agents process every story through a transparent, auditable pipeline — no shortcuts, no black boxes.
          </p>
        </div>

        <div className="pipeline-wrapper" role="list" aria-label="News processing pipeline steps">
          {PIPELINE_STEPS.map((step, index) => {
            const isLast = index === PIPELINE_STEPS.length - 1;
            return (
              <article 
                key={step.id} 
                className={`pipeline-step ${isLast ? 'pipeline-step--last' : ''} is-visible`}
                role="listitem"
              >
                <div className="step-number" aria-hidden="true">{step.number}</div>
                <div className={`step-icon step-icon--${step.iconType}`} aria-hidden="true">
                  {renderIcon(step.iconType)}
                </div>
                <div className="step-content">
                  <h3 className="step-agent">{step.name}</h3>
                  <p className="step-fullname">{step.fullName}</p>
                  <p className="step-desc">{step.description}</p>
                </div>
                {!isLast && <div className="step-connector" aria-hidden="true"></div>}
              </article>
            );
          })}
        </div>

        <div className="pipeline-note" role="note">
          <Info size={18} aria-hidden="true" />
          <span>
            Every pipeline run is logged and audited by{' '}
            <a href="https://creed-ai.org" target="_blank" rel="noopener noreferrer">
              C.R.E.E.D.
            </a>{' '}
            — our open-source AI governance platform.
          </span>
        </div>
      </div>
    </section>
  );
};
