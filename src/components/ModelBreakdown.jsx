import React from 'react';
import { Box, ChevronUp } from 'lucide-react';

export default function ModelBreakdown() {
  const models = [
    {
      id: '01',
      name: 'claude-opus-5',
      badge: 'Custom',
      badgeType: 'cyan',
      inputTokens: '165.19M in',
      outputTokens: '236.4k out',
      requests: '655 req',
      percent: 85,
      barColor: 'cyan',
      circleColor: 'cyan'
    },
    {
      id: '02',
      name: 'big-pickle',
      badge: 'Custom',
      badgeType: 'cyan',
      inputTokens: '54.45M in',
      outputTokens: '84.0k out',
      requests: '215 req',
      percent: 48,
      barColor: 'cyan',
      circleColor: 'cyan'
    },
    {
      id: '03',
      name: 'deepseek-v4-flash',
      badge: 'v4-flash',
      badgeType: 'pink',
      inputTokens: '24.09M in',
      outputTokens: '20.6k out',
      requests: '55 req',
      percent: 38,
      barColor: 'pink',
      circleColor: 'pink'
    },
    {
      id: '04',
      name: 'glm-5.3',
      badge: 'Custom',
      badgeType: 'cyan',
      inputTokens: '1.61M in',
      outputTokens: '19.8k out',
      requests: '67 req',
      percent: 22,
      barColor: 'slate',
      circleColor: 'dark'
    }
  ];

  return (
    <div className="models-card">
      {/* Header */}
      <div className="models-header">
        <div className="models-title-wrap">
          <div className="models-title-group">
            <span className="models-cube-icon">
              <Box size={20} strokeWidth={2.4} />
            </span>
            <h2 className="models-title">By model</h2>
          </div>
        </div>
        <button type="button" className="collapse-chevron-btn" title="Toggle Collapse">
          <ChevronUp size={16} strokeWidth={2.5} />
        </button>
      </div>

      {/* Models List */}
      <div className="models-list">
        {models.map((model) => (
          <div key={model.id} className="model-item-row">
            {/* Left ID Coin Badge */}
            <span className={`model-id-bubble ${model.circleColor}`}>
              {model.id}
            </span>

            {/* Right Content Column (Top info + Progress bar) */}
            <div className="model-content-col">
              <div className="model-row-top">
                <div className="model-name-group">
                  <span className="model-name">{model.name}</span>
                  <span className={`model-badge ${model.badgeType}`}>
                    {model.badge}
                  </span>
                </div>

                <div className="model-stats">
                  <span className="stat-in">{model.inputTokens}</span>
                  <span className="stat-dot">·</span>
                  <span className="stat-out">{model.outputTokens}</span>
                  <span className="stat-dot">·</span>
                  <span className="stat-req">{model.requests}</span>
                </div>
              </div>

              {/* Progress Track */}
              <div className="model-progress-track">
                <div
                  className={`model-progress-fill ${model.barColor}`}
                  style={{ width: `${model.percent}%` }}
                >
                  <span className="progress-glow-tip"></span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
