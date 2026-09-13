import React from 'react';
import { User, ChevronDown } from 'lucide-react';

export default function Navbar({ onToggleProfile, profileOpen }) {
  return (
    <header className="navbar-container">
      {/* Brand & Logo */}
      <div className="navbar-brand-section">
        <div className="brand-logo-pill">
          <span className="brand-number">
            <span className="brand-zero">0</span>
            <span className="brand-one">1</span>
          </span>
          <span className="brand-title">mproxy</span>
        </div>
        <div className="brand-soundwave">
          <span className="wave-bar w1"></span>
          <span className="wave-bar w2"></span>
          <span className="wave-bar w3"></span>
          <span className="wave-bar w4"></span>
        </div>
      </div>

      {/* Center Ticker / Motto */}
      <div className="navbar-ticker">
        <span className="ticker-item">FAST</span>
        <span className="ticker-slash">/</span>
        <span className="ticker-item">RELIABLE</span>
        <span className="ticker-slash">/</span>
        <span className="ticker-item">YOUR PROXY</span>
        <span className="ticker-note">🎵</span>
      </div>

      {/* Right User & Cheer Section */}
      <div className="navbar-right-section">
        {/* Miku Cheer Peek */}
        <div className="miku-cheer-capsule">
          <img
            src="/assets/navbar_miku.png"
            alt="Miku cheer"
            className="navbar-miku-img"
          />
          <div className="cheer-bubble">
            <div className="cheer-text-wrap">
              <span>Keep</span>
              <span>going!</span>
            </div>
            <span className="cheer-heart">♥</span>
          </div>
        </div>

        {/* User Profile Pill */}
        <div className="profile-pill-wrapper">
          <button
            type="button"
            className={`profile-pill ${profileOpen ? 'active' : ''}`}
            onClick={onToggleProfile}
            title="User Profile"
          >
            <div className="avatar-circle">
              <User size={18} strokeWidth={2.4} />
            </div>
            <ChevronDown size={14} strokeWidth={2.5} className="profile-chevron" />
          </button>

          {profileOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-name">Miku Admin</span>
                <span className="dropdown-email">admin@mproxy.ai</span>
              </div>
              <hr className="dropdown-divider" />
              <button className="dropdown-item" type="button">Dashboard Settings</button>
              <button className="dropdown-item" type="button">API Credentials</button>
              <button className="dropdown-item text-danger" type="button">Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
