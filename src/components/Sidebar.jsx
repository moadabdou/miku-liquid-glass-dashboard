import React, { useState, useRef, useEffect } from 'react';
import {
  Home,
  KeyRound,
  Users,
  Box,
  ArrowLeftRight,
  Activity,
  Settings,
  AudioLines
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenApiKeyModal }) {
  const asideRef = useRef(null);
  const navGroupRef = useRef(null);
  const isHoveringRef = useRef(false);
  const [hoverY, setHoverY] = useState(0);
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const [hoverStyle, setHoverStyle] = useState({
    opacity: 0,
    top: 0,
    width: 0,
    height: 44,
    animating: false,
  });

  const [activeStyle, setActiveStyle] = useState({
    top: 0,
    width: 0,
    height: 44,
    opacity: 0,
  });

  // Calculate and update the active selection pill's position
  useEffect(() => {
    const updateActivePosition = () => {
      const container = navGroupRef.current;
      if (!container) return;
      const activeButton = container.querySelector(`[data-tab-id="${activeTab}"]`);
      if (!activeButton) return;

      const targetRect = activeButton.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setActiveStyle({
        top: Math.round(targetRect.top - containerRect.top),
        width: Math.round(targetRect.width),
        height: Math.round(targetRect.height),
        opacity: 1,
      });
    };

    updateActivePosition();
    window.addEventListener('resize', updateActivePosition);
    return () => window.removeEventListener('resize', updateActivePosition);
  }, [activeTab]);

  const handleMouseEnter = (e, id) => {
    if (id === activeTab) {
      setHoverStyle((prev) => ({ ...prev, opacity: 0, animating: false }));
      setHoverOpacity(0);
      isHoveringRef.current = false;
      return;
    }
    const target = e.currentTarget;
    const navGroup = navGroupRef.current;
    const aside = asideRef.current;
    if (!navGroup || !target || !aside) return;

    const targetRect = target.getBoundingClientRect();
    const navGroupRect = navGroup.getBoundingClientRect();
    const asideRect = aside.getBoundingClientRect();

    const targetTop = Math.round(targetRect.top - navGroupRect.top);
    const targetCenterY = Math.round(targetRect.top - asideRect.top + targetRect.height / 2);

    const wasHovering = isHoveringRef.current;
    isHoveringRef.current = true;

    setHoverY(targetCenterY);
    setHoverOpacity(1);
    setHoverStyle({
      opacity: 1,
      top: targetTop,
      width: targetRect.width,
      height: targetRect.height,
      animating: wasHovering,
    });
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    setHoverOpacity(0);
    setHoverStyle((prev) => ({ ...prev, opacity: 0, animating: false }));
  };

  const mainNav = [
    { id: 'overview', label: 'Overview', icon: Home, hasSoundwave: true },
    { id: 'apikeys', label: 'API Keys', icon: KeyRound },
    { id: 'accounts', label: 'Accounts', icon: Users },
    { id: 'models', label: 'Models', icon: Box },
    { id: 'transform', label: 'Transform', icon: ArrowLeftRight },
  ];

  const monitorNav = [
    { id: 'logs', label: 'Request Logs', icon: Activity },
  ];

  const systemNav = [
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id) => {
    if (id === 'apikeys') {
      onOpenApiKeyModal();
    }
    setActiveTab(id);
    setHoverStyle((prev) => ({ ...prev, opacity: 0, animating: false }));
    setHoverOpacity(0);
    isHoveringRef.current = false;
  };

  return (
    <aside
      ref={asideRef}
      className="sidebar-container liquid-glass-card"
      style={{
        '--hover-y': `${hoverY}px`,
        '--hover-opacity': hoverOpacity,
      }}
    >
      <div className="sidebar-content card-content">
        {/* Upper Navigation with Sliding Hover & Active Pills */}
        <div
          className="sidebar-nav-group"
          ref={navGroupRef}
          onMouseLeave={handleMouseLeave}
        >
          {/* Sliding Glass Active Selection Pill */}
          <div
            className="sidebar-active-pill"
            style={{
              transform: `translate3d(0, ${activeStyle.top}px, 0)`,
              width: activeStyle.width ? `${activeStyle.width}px` : '100%',
              height: `${activeStyle.height}px`,
              opacity: activeStyle.opacity,
            }}
            aria-hidden="true"
          />

          {/* Sliding Glass Hover Pill */}
          <div
            className={`sidebar-hover-pill ${hoverStyle.animating ? 'animate' : ''}`}
            style={{
              transform: `translate3d(0, ${hoverStyle.top}px, 0)`,
              width: hoverStyle.width ? `${hoverStyle.width}px` : '100%',
              height: `${hoverStyle.height}px`,
              opacity: hoverStyle.opacity,
            }}
            aria-hidden="true"
          />

          <ul className="sidebar-menu">
            {mainNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-tab-id={item.id}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                  >
                  <span className="sidebar-icon-wrap">
                    {item.id === 'overview' && isActive ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 3L2.5 11.2L4 12.8L5.5 11.5V21H10V15.5H14V21H18.5V11.5L20 12.8L21.5 11.2L12 3Z" />
                      </svg>
                    ) : (
                      <Icon size={20} strokeWidth={2.3} />
                    )}
                  </span>
                  <span className="sidebar-label">{item.label}</span>
                  {isActive && item.hasSoundwave && (
                    <div className="sidebar-soundwave">
                      <span className="bar bar1"></span>
                      <span className="bar bar2"></span>
                      <span className="bar bar3"></span>
                      <span className="bar bar4"></span>
                      <span className="bar bar5"></span>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Monitor Section */}
        <div className="sidebar-section-divider">
          <span className="sidebar-section-title">MONITOR</span>
          <ul className="sidebar-menu">
            {monitorNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-tab-id={item.id}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                  >
                    <span className="sidebar-icon-wrap">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span className="sidebar-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* System Section */}
        <div className="sidebar-section-divider">
          <span className="sidebar-section-title">SYSTEM</span>
          <ul className="sidebar-menu">
            {systemNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    data-tab-id={item.id}
                    className={`sidebar-link ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={(e) => handleMouseEnter(e, item.id)}
                  >
                    <span className="sidebar-icon-wrap">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span className="sidebar-label">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>

      {/* Bottom Illustration Scene: Peeking Rotated Miku Behind Rotated Glassy Wall */}
      <div className="sidebar-bottom-scene">
        {/* Ambient Liquid Splashes & Cyber Petals */}
        <div className="sidebar-splashes-wrap" aria-hidden="true">
          <img
            src="/assets/splashes.png"
            alt=""
            className="sidebar-splashes-img"
          />
        </div>

        {/* Tilted Chibi Miku Character */}
        <div className="sidebar-miku-tilted-wrap">
          <img
            src="/assets/sidebar_miku.png"
            alt="Hatsune Miku"
            className="sidebar-miku-tilted-img"
          />
        </div>

        {/* Rotated Glassy Wall in Front of Miku */}
        <div className="sidebar-glass-wall" />

        {/* Magenta/Red Writing on Glass Surface */}
        <div className="sidebar-miku-typography">
          <div className="miku-logo-group">
            <span className="miku-logo-jp">初音ミク</span>
            <span className="miku-logo-en">HATSUNE MIKU</span>
          </div>
          <div className="miku-stencil-group">
            <span className="miku-stencil-01">01</span>
            <span className="miku-stencil-cfm">© CFM</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
