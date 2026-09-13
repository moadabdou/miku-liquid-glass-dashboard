import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MetricsGrid from './components/MetricsGrid';
import ActivityChart from './components/ActivityChart';
import ModelBreakdown from './components/ModelBreakdown';
import ApiKeyModal from './components/ApiKeyModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [profileOpen, setProfileOpen] = useState(false);
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);

  return (
    <div className="dashboard-root">
      {/* Background layer for proper backdrop-filter compositing */}
      <div className="dashboard-bg-layer" aria-hidden="true" />

      {/* SVG Filter for Liquid Glass Refraction */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="glass-distortion" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.008 0.008"
              numOctaves="2" 
              seed="92" 
              result="noise" 
            />
            <feGaussianBlur 
              in="noise" 
              stdDeviation="2" 
              result="blurred" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="blurred" 
              scale="65"
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      {/* Floating Animated Ambient Cyber Dust / Notes */}
      <div className="ambient-particles" aria-hidden="true">
        <span className="particle p1"></span>
        <span className="particle p2"></span>
        <span className="particle p3"></span>
        <span className="particle p4"></span>
        <span className="particle p5"></span>
      </div>

      {/* Global Application Layout matching design/ui.png */}
      <div className="dashboard-container">
        {/* Full-width Top Navbar spanning from left to right */}
        <Navbar
          profileOpen={profileOpen}
          onToggleProfile={() => setProfileOpen(!profileOpen)}
        />

        {/* Lower Body: Left Sidebar + Right Content Area */}
        <div className="dashboard-main-body">
          {/* Left Column: Frosted Glass Sidebar */}
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenApiKeyModal={() => setApiKeyModalOpen(true)}
          />

          {/* Right Column: Main Content Area */}
          <main className="main-content-area">
            {/* Hero Banner */}
            <HeroBanner onGenerateKey={() => setApiKeyModalOpen(true)} />

            {/* Metrics Row (6 Cards) */}
            <MetricsGrid />

            {/* Bottom Dual Grid: Activity Chart & Model Breakdown */}
            <div className="bottom-charts-wrapper">
              <div className="bottom-charts-grid">
                <ActivityChart />
                <ModelBreakdown />
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Modal Dialog */}
      <ApiKeyModal
        isOpen={apiKeyModalOpen}
        onClose={() => setApiKeyModalOpen(false)}
      />
    </div>
  );
}
