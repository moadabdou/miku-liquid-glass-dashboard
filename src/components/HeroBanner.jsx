import React from 'react';
import { KeyRound, ChevronRight } from 'lucide-react';

export default function HeroBanner({ onGenerateKey }) {
  const heroRef = React.useRef(null);
  const btnRef = React.useRef(null);
  const [btnMask, setBtnMask] = React.useState({ x: -9999, y: -9999, rx: 0, ry: 0 });

  React.useEffect(() => {
    const updateMask = () => {
      if (!heroRef.current || !btnRef.current) return;
      const hRect = heroRef.current.getBoundingClientRect();
      const bRect = btnRef.current.getBoundingClientRect();
      setBtnMask({
        x: Math.round(bRect.left - hRect.left + bRect.width / 2),
        y: Math.round(bRect.top - hRect.top + bRect.height / 2),
        rx: Math.round(bRect.width / 2 + 1),
        ry: Math.round(bRect.height / 2 + 1),
      });
    };

    updateMask();
    window.addEventListener('resize', updateMask);
    return () => window.removeEventListener('resize', updateMask);
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero-banner-container"
      style={{
        '--btn-x': `${btnMask.x}px`,
        '--btn-y': `${btnMask.y}px`,
        '--btn-rx': `${btnMask.rx}px`,
        '--btn-ry': `${btnMask.ry}px`,
      }}
    >
      {/* Soft Miku Hair Cyan Fog behind the writing */}
      <div className="hero-cyan-fog" aria-hidden="true" />

      {/* Floating Notes */}
      <div className="floating-note note-1">🎵</div>
      <div className="floating-note note-2">🎶</div>
      <div className="floating-note note-3">💕</div>

      {/* Left Info Column */}
      <div className="hero-content">
        {/* Nominal Pill */}
        <div className="status-nominal-pill">
          <span className="status-dot-pulse"></span>
          <span className="status-text">All Systems Nominal</span>
          <div className="mini-equalizer">
            <span className="eq-bar eq-1"></span>
            <span className="eq-bar eq-2"></span>
            <span className="eq-bar eq-3"></span>
            <span className="eq-bar eq-4"></span>
          </div>
        </div>

        {/* Main Title */}
        <h1 className="hero-title">
          Proxy Healthy <span className="hero-heart">💕</span>
        </h1>

        {/* Subtitle and Action Button in a single horizontal row matching reference */}
        <div className="hero-bottom-row">
          <p className="hero-subtitle">Your requests are flowing smoothly!</p>

          {/* Action Button */}
          <button
            ref={btnRef}
            type="button"
            className="generate-key-btn"
            onClick={onGenerateKey}
          >
            <span className="btn-icon-circle">
              <KeyRound size={21} strokeWidth={2.4} />
            </span>
            <span className="btn-text">Generate API Key</span>
            <ChevronRight size={21} strokeWidth={2.6} className="btn-chevron" />
          </button>
        </div>
      </div>

      {/* Right Artwork */}
      <div className="hero-miku-wrapper">
        <img
          src="/assets/banner_miku.png"
          alt="Hatsune Miku Banner"
          className="hero-miku-img"
        />
        <div className="miku-signature-overlay">
          <span className="signature-name">Hatsune Miku</span>
          <span className="signature-num">01</span>
        </div>
      </div>
    </section>
  );
}
