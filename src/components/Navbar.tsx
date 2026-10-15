import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-inner">
        <a href="/" className="nav-logo" aria-label="What The Fact home">
          <span className="logo-wtf">WTF</span>
          <span className="logo-full">What The Fact</span>
        </a>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'nav-links--mobile-open' : ''}`}>
          <a href="#how-it-works" onClick={(e) => handleNavClick(e, '#how-it-works')}>
            How It Works
          </a>
          <a href="#bias-spectrum" onClick={(e) => handleNavClick(e, '#bias-spectrum')}>
            Bias Spectrum
          </a>
          <a href="#team" onClick={(e) => handleNavClick(e, '#team')}>
            The Team
          </a>
          <a href="https://what-the-fact.tech" target="_blank" rel="noopener noreferrer">
            Methodology
          </a>
          <a 
            href="#governance" 
            className="nav-badge-link"
            onClick={(e) => handleNavClick(e, '#governance')}
          >
            <span className="creed-dot" aria-hidden="true"></span>
            C.R.E.E.D.
          </a>
          <button 
            onClick={() => { setMobileMenuOpen(false); onOpenWaitlist(); }}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.8rem' }}
          >
            Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
};
