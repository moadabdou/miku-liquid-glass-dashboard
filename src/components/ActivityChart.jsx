import React, { useState } from 'react';
import { Activity as ActivityIcon } from 'lucide-react';

export default function ActivityChart() {
  const capsuleRef = React.useRef(null);
  const btn24Ref = React.useRef(null);
  const btn7Ref = React.useRef(null);
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 });
  const [timeRange, setTimeRange] = useState('24h');
  const [hoveredBar, setHoveredBar] = useState(null);

  const updateIndicator = React.useCallback(() => {
    const cap = capsuleRef.current;
    const btn = timeRange === '24h' ? btn24Ref.current : btn7Ref.current;
    if (!cap || !btn) return;
    const cRect = cap.getBoundingClientRect();
    const bRect = btn.getBoundingClientRect();
    setIndicator({ left: bRect.left - cRect.left, width: bRect.width });
  }, [timeRange]);

  React.useLayoutEffect(() => {
    updateIndicator();
    const ro = new ResizeObserver(updateIndicator);
    if (capsuleRef.current) ro.observe(capsuleRef.current);
    window.addEventListener('resize', updateIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator]);

  // 24-hour data points mimicking the exact distribution in ui.png
  const data24h = [
    { time: '22:00', value: 85 },
    { time: '23:00', value: 92 },
    { time: '00:00', value: 75 },
    { time: '01:00', value: 80 },
    { time: '02:00', value: 110 },
    { time: '03:00', value: 95 },
    { time: '04:00', value: 105 },
    { time: '05:00', value: 90 },
    { time: '06:00', value: 115 },
    { time: '07:00', value: 120 },
    { time: '08:00', value: 140 },
    { time: '09:00', value: 135 },
    { time: '10:00', value: 190 },
    { time: '11:00', value: 310 },
    { time: '12:00', value: 520 },
    { time: '13:00', value: 780 },
    { time: '14:00', value: 1120 },
    { time: '15:00', value: 1340 },
    { time: '16:00', value: 1890, isPeak: true },
    { time: '16:30', value: 1510 },
    { time: '17:00', value: 1320 },
    { time: '17:30', value: 890 },
  ];

  const data7d = [
    { time: 'Mon', value: 1250 },
    { time: 'Tue', value: 1420 },
    { time: 'Wed', value: 1680 },
    { time: 'Thu', value: 1950, isPeak: true },
    { time: 'Fri', value: 1820 },
    { time: 'Sat', value: 980 },
    { time: 'Sun', value: 1150 },
  ];

  const activeData = timeRange === '24h' ? data24h : data7d;
  const maxValue = 2000;

  return (
    <div className="activity-card">
      {/* Header with Title & Range Toggle */}
      <div className="activity-header">
        <div className="activity-title-group">
          <span className="activity-pulse-icon">
            <ActivityIcon size={20} strokeWidth={2.4} />
          </span>
          <h2 className="activity-title">Activity</h2>
        </div>

        <div ref={capsuleRef} className="time-toggle-capsule">
          <div
            className="toggle-indicator"
            aria-hidden="true"
            style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }}
          />
          <button
            ref={btn24Ref}
            type="button"
            className={`toggle-btn ${timeRange === '24h' ? 'active' : ''}`}
            onClick={() => setTimeRange('24h')}
          >
            24h
          </button>
          <button
            ref={btn7Ref}
            type="button"
            className={`toggle-btn ${timeRange === '7d' ? 'active' : ''}`}
            onClick={() => setTimeRange('7d')}
          >
            7d
          </button>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="chart-canvas-wrapper">
        {/* Main Plot Area (Y-Axis + Bars + Reference Lines) */}
        <div className="chart-plot-area">
          <div className="chart-y-axis">
            <span className="y-label y-pos-100">2k</span>
            <span className="y-label y-pos-75">1.5k</span>
            <span className="y-label y-pos-50">1k</span>
            <span className="y-label y-pos-25">500</span>
            <span className="y-label y-pos-0">0</span>
          </div>

          <div className="chart-bars-container">
            {/* Horizontal Reference Lines */}
            <div className="grid-line" style={{ top: '0%' }}></div>
            <div className="grid-line" style={{ top: '25%' }}></div>
            <div className="grid-line" style={{ top: '50%' }}></div>
            <div className="grid-line" style={{ top: '75%' }}></div>
            <div className="grid-line baseline-grid-line" style={{ top: '100%' }}></div>

            {/* Render Interactive Bars */}
            <div className="bars-flex-row">
              {activeData.map((item, index) => {
                const heightPercent = Math.min(100, Math.max(4, (item.value / maxValue) * 100));
                const isHovered = hoveredBar === index;

                return (
                  <div
                    key={index}
                    className={`bar-column ${isHovered ? 'active' : ''}`}
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Bar Element */}
                    <div
                      className={`chart-bar ${item.isPeak ? 'peak-bar' : ''}`}
                      style={{ height: `${heightPercent}%` }}
                    >

                      {/* Tooltip positioned directly above this specific bar tip */}
                      {isHovered && (
                        <div className="bar-tooltip glass-panel">
                          <div className="tooltip-time">{item.time}</div>
                          <div className="tooltip-val">{item.value.toLocaleString()} reqs</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Timeline Row strictly aligned under the bars and below the baseline */}
        <div className="chart-timeline-row">
          <div className="chart-y-axis-spacer" />
          <div className="timeline-labels-container">
            {activeData.map((item, index) => {
              const shouldShow =
                timeRange === '24h'
                  ? ['22:00', '00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '17:00'].includes(item.time)
                  : true;

              return (
                <div
                  key={index}
                  className={`timeline-slot ${hoveredBar === index ? 'active' : ''}`}
                  onMouseEnter={() => setHoveredBar(index)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {shouldShow && <span className="timeline-tick" />}
                  {shouldShow && <span className="timeline-label">{item.time}</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Chart Footer with Miku Cheer & Requests Badge */}
      <div className="activity-footer">
        <div className="requests-ticker">
          <div className="eq-icon-group">
            <span className="eq-bar-sm b1"></span>
            <span className="eq-bar-sm b2"></span>
            <span className="eq-bar-sm b3"></span>
            <span className="eq-bar-sm b4"></span>
            <span className="eq-bar-sm b5"></span>
          </div>
          <span className="requests-text">REQUESTS</span>
        </div>

        <div className="miku-nice-badge">
          <img
            src="/assets/chibi_nice.png"
            alt="Miku Nice!"
            className="chibi-nice-img"
          />
          <div className="footer-mini-eq">
            <span className="f-bar fb1"></span>
            <span className="f-bar fb2"></span>
            <span className="f-bar fb3"></span>
            <span className="f-bar fb4"></span>
            <span className="f-bar fb5"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
