import React from 'react';
import { Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="/" className="footer-logo" aria-label="What The Fact home">
              <span className="logo-wtf">WTF</span>
              <span className="logo-full">What The Fact</span>
            </a>
            <p className="footer-tagline">Finding the center of the truth.</p>
            <p className="footer-initiative">
              A <a href="https://kytranempowerment.com" target="_blank" rel="noopener noreferrer">Kytran Empowerment Inc.</a> initiative
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Platform</h3>
              <ul role="list">
                <li><a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>How It Works</a></li>
                <li><a href="#bias-spectrum" onClick={(e) => handleNavClick(e, '#bias-spectrum')}>Bias Spectrum</a></li>
                <li><a href="#latest-stories" onClick={(e) => handleNavClick(e, '#latest-stories')}>Live Stories</a></li>
                <li><a href="#team" onClick={(e) => handleNavClick(e, '#team')}>The Team</a></li>
                <li><a href="#governance" onClick={(e) => handleNavClick(e, '#governance')}>Governance</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Resources</h3>
              <ul role="list">
                <li><a href="https://what-the-fact.tech" target="_blank" rel="noopener noreferrer">Methodology</a></li>
                <li><a href="https://creed-ai.org" target="_blank" rel="noopener noreferrer">C.R.E.E.D. Institute</a></li>
                <li><a href="https://kytranempowerment.com" target="_blank" rel="noopener noreferrer">Kytran Empowerment</a></li>
                <li><a href="https://github.com/KytranKatarn/what-the-fact-site" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              </ul>
            </div>

            <div className="footer-nav-col">
              <h3 className="footer-nav-heading">Contact</h3>
              <ul role="list">
                <li>
                  <a href="mailto:contact@what-the-fact.com">
                    <Mail size={14} aria-hidden="true" />
                    contact@what-the-fact.com
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">&copy; 2026 Kytran Empowerment Inc. All rights reserved.</p>
          <p className="footer-legal">
            Bias scores are AI-generated estimates, not definitive political classifications.
            Methodology is <a href="https://what-the-fact.tech" target="_blank" rel="noopener noreferrer">publicly documented</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};
