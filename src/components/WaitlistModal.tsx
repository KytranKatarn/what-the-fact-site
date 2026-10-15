import React, { useState } from 'react';
import { X, CheckCircle, Mail, Bell } from 'lucide-react';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem('wtf_waitlist_emails') || '[]');
      if (!existing.includes(email)) {
        existing.push(email);
        localStorage.setItem('wtf_waitlist_emails', JSON.stringify(existing));
      }
    } catch {
      // ignore local storage error if restricted
    }

    setError('');
    setSubmitted(true);
  };

  const handleReset = () => {
    setEmail('');
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        {!submitted ? (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', marginBottom: '8px' }}>
              <Bell size={20} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Early Access</span>
            </div>
            <h3 className="modal-title" id="modal-title">Join the Waitlist</h3>
            <p className="modal-desc">
              Be the first to experience Canada's transparent, fact-checked newsroom when we launch. No spam, no selling data — ever.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="email"
                className="modal-input"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                autoFocus
                required
              />
              {error && (
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem', marginBottom: '12px' }}>
                  {error}
                </p>
              )}
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Mail size={16} />
                Reserve My Spot
              </button>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <div style={{ display: 'inline-flex', padding: '12px', background: 'rgba(52, 211, 153, 0.15)', borderRadius: '50%', color: '#34d399', marginBottom: '16px' }}>
              <CheckCircle size={36} />
            </div>
            <h3 className="modal-title">You're on the list!</h3>
            <p className="modal-desc" style={{ marginBottom: '24px' }}>
              We've reserved your early access invitation for <strong>{email}</strong>. We'll send you an invitation as soon as the platform goes live.
            </p>
            <button 
              type="button" 
              className="btn btn-outline"
              style={{ margin: '0 auto' }}
              onClick={handleReset}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
