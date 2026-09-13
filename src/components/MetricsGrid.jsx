import React from 'react';
import {
  Headphones,
  Activity,
  Music2,
  KeyRound,
  User,
  Users,
  Box,
  TrendingUp,
  AudioLines
} from 'lucide-react';

export default function MetricsGrid() {
  return (
    <section className="metrics-grid">
      {/* 1. Requests Card */}
      <div className="metric-card requests-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap cyan">
              <Headphones size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Requests</span>
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">2.7<span className="stat-unit">k</span></div>
            <div className="stat-sub">total requests</div>
          </div>

          <div className="metric-chibi-badge">
            <img
              src="/assets/chibi_requests.png"
              alt="Miku waving"
              className="chibi-requests-img"
            />
            <span className="stat-trend pink">
              <span className="trend-arrow">↑</span> 12%
            </span>
          </div>
        </div>
      </div>

      {/* 2. Input Tokens Card */}
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap cyan">
              <AudioLines size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Input</span>
          </div>
          <div className="card-top-accent">
            <span className="mini-bars">
              <span className="mb1"></span>
              <span className="mb2"></span>
              <span className="mb3"></span>
            </span>
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">501.06<span className="stat-unit">M</span></div>
            <div className="stat-sub">total input tokens</div>
          </div>
          <span className="stat-trend pink trend-bottom-right">
            <span className="trend-arrow">↑</span> 8%
          </span>
        </div>
      </div>

      {/* 3. Output Tokens Card */}
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap cyan">
              <AudioLines size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Output</span>
          </div>
          <div className="card-top-accent cyan-note">
            <Music2 size={20} strokeWidth={2.4} />
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">1.19<span className="stat-unit">M</span></div>
            <div className="stat-sub">total output tokens</div>
          </div>
          <span className="stat-trend pink trend-bottom-right">
            <span className="trend-arrow">↑</span> 11%
          </span>
        </div>
      </div>

      {/* 4. Active Keys Card */}
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap pink">
              <KeyRound size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Active Keys</span>
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">1</div>
            <div className="stat-sub">active key</div>
          </div>
          <div className="key-status-indicator">
            <span className="key-dot pink"></span>
            <span className="key-dash">—</span>
          </div>
        </div>
      </div>

      {/* 5. Accounts Card */}
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap cyan">
              <User size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Accounts</span>
          </div>
          <div className="card-top-accent cyan-users">
            <Users size={22} strokeWidth={2} />
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">7</div>
            <div className="stat-sub">total accounts</div>
          </div>
          <span className="stat-trend pink trend-bottom-right">
            <span className="trend-arrow">↑</span> 17%
          </span>
        </div>
      </div>

      {/* 6. Models Card */}
      <div className="metric-card">
        <div className="metric-header">
          <div className="metric-icon-title">
            <span className="metric-icon-wrap cyan">
              <Box size={26} strokeWidth={2.4} />
            </span>
            <span className="metric-label">Models</span>
          </div>
          <div className="card-top-accent cyan-cube">
            <Box size={22} strokeWidth={2} />
          </div>
        </div>

        <div className="metric-body">
          <div className="metric-main-stat">
            <div className="stat-number">93</div>
            <div className="stat-sub">available models</div>
          </div>
          <span className="stat-trend pink trend-bottom-right">
            <span className="trend-arrow">↑</span> 6%
          </span>
        </div>
      </div>
    </section>
  );
}
