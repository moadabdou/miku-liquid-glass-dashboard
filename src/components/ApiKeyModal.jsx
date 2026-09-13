import React, { useState } from 'react';
import { X, KeyRound, Copy, Check, Sparkles } from 'lucide-react';

export default function ApiKeyModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('mk_live_9a7f3e829d1045b8c0e24177d');

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    const chars = 'abcdef0123456789';
    let rand = 'mk_live_';
    for (let i = 0; i < 24; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setApiKey(rand);
    setCopied(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-glass-card glass-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-key-icon">
              <KeyRound size={20} />
            </span>
            <h3>Generate Proxy API Key</h3>
          </div>
          <button type="button" className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p className="modal-description">
            Your API key provides secure, low-latency access to all routed models on the
            mproxy network. Keep it safe!
          </p>

          <div className="key-display-box glass-pill">
            <code className="key-string">{apiKey}</code>
            <button
              type="button"
              className="copy-btn glass-pill-btn"
              onClick={handleCopy}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-success" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="regenerate-btn"
              onClick={handleRegenerate}
            >
              <Sparkles size={15} />
              <span>Generate New</span>
            </button>
            <button
              type="button"
              className="done-btn glass-pill-btn active"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
