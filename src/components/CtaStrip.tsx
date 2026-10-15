import React from 'react';

interface CtaStripProps {
  onOpenWaitlist: () => void;
}

export const CtaStrip: React.FC<CtaStripProps> = ({ onOpenWaitlist }) => {
  return (
    <section className="section cta-strip" aria-label="Call to action">
      <div className="container">
        <div className="cta-strip-inner">
          <div className="cta-strip-text">
            <h2>Be First to Know When We Launch</h2>
            <p>Canadian news. Fact-checked. Bias-mapped. Fully transparent. We're building something Canada has never had.</p>
          </div>
          <div className="cta-strip-actions">
            <button 
              type="button"
              className="btn btn-primary btn-large"
              onClick={onOpenWaitlist}
            >
              Join the Waitlist — Coming Soon
            </button>
            <a 
              href="https://what-the-fact.tech" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="cta-methodology-link"
            >
              Read the methodology →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
