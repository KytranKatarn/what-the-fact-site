import React from 'react';
import { ExternalLink, ChevronDown, Bell } from 'lucide-react';

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="hero" id="hero" role="banner">
      <div className="hero-bg-grid" aria-hidden="true"></div>
      <div className="hero-inner container">
        <div className="hero-eyebrow">
          <span className="eyebrow-badge">Coming Soon</span>
          <span className="eyebrow-text">Canada's First AI-Powered Transparent News Platform</span>
        </div>
        <h1 className="hero-title">
          What <span className="title-the">The</span> <span className="title-fact">Fact</span>
        </h1>
        <p className="hero-tagline">Finding the center of the truth.</p>
        <p className="hero-subtitle">
          Every article fact-checked. Every bias exposed.<br />
          Every decision auditable.
        </p>
        <div className="hero-cta-group" role="group" aria-label="Call to action buttons">
          <button 
            type="button"
            className="btn btn-primary"
            onClick={onOpenWaitlist}
          >
            <Bell size={18} aria-hidden="true" />
            Join the Waitlist
          </button>
          <a 
            href="https://what-the-fact.tech" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-outline"
          >
            View Our Methodology
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        </div>
        <p className="hero-disclaimer">Waitlist opens when we launch. No spam, no selling your data — ever.</p>
      </div>

      <div 
        className="hero-scroll-hint" 
        onClick={scrollToHowItWorks}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter') scrollToHowItWorks(); }}
        aria-label="Scroll to explore pipeline"
      >
        <span>Scroll to explore</span>
        <ChevronDown size={20} aria-hidden="true" />
      </div>
    </header>
  );
};
