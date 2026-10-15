import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { BiasSpectrum } from './components/BiasSpectrum';
import { AgentTeam } from './components/AgentTeam';
import { Governance } from './components/Governance';
import { CtaStrip } from './components/CtaStrip';
import { Footer } from './components/Footer';
import { WaitlistModal } from './components/WaitlistModal';

export const App: React.FC = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <div className="app-root">
      <Navbar onOpenWaitlist={() => setWaitlistOpen(true)} />
      <main>
        <Hero onOpenWaitlist={() => setWaitlistOpen(true)} />
        <HowItWorks />
        <BiasSpectrum />
        <AgentTeam />
        <Governance />
        <CtaStrip onOpenWaitlist={() => setWaitlistOpen(true)} />
      </main>
      <Footer />
      <WaitlistModal 
        isOpen={waitlistOpen} 
        onClose={() => setWaitlistOpen(false)} 
      />
    </div>
  );
};

export default App;
