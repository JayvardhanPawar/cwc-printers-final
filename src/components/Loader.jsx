import React, { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@400;600;700&display=swap');

  :root {
    --accent:       #16A34A;
    --accent-glow:  rgba(22, 163, 74, 0.35);
    --accent-dim:   rgba(22, 163, 74, 0.08);
    --bg:           #ffffff;
    --text:         #052e16;
    --text-muted:   rgba(5, 46, 22, 0.45);
    --track:        #E8F5E9;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --accent:       #4ADE80;
      --accent-glow:  rgba(74, 222, 128, 0.3);
      --accent-dim:   rgba(74, 222, 128, 0.08);
      --bg:           #08120C;
      --text:         #F0FFF4;
      --text-muted:   rgba(240, 255, 244, 0.4);
      --track:        #16241A;
    }
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .loader-root {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg);
    font-family: 'Rajdhani', sans-serif;
    overflow: hidden;
  }

  .ambient {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 55% 45% at 50% 45%, var(--accent-dim) 0%, transparent 70%);
  }

  .stage {
    position: relative; z-index: 1;
    display: flex; flex-direction: column; align-items: center;
  }

  /* ── ICON ── */
  .icon-wrap {
    position: relative; width: 88px; height: 88px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 28px;
    opacity: 0; animation: riseIn 0.6s 0.1s ease forwards;
  }
  @keyframes riseIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .ring {
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 2px solid var(--track);
    border-top-color: var(--accent);
    animation: spin 1.4s cubic-bezier(0.5,0.1,0.5,0.9) infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .icon-svg {
    color: var(--accent);
    filter: drop-shadow(0 0 10px var(--accent-glow));
  }

  /* ── WORDMARK ── */
  .wordmark {
    display: flex; flex-direction: column; align-items: center;
    margin-bottom: 36px;
    opacity: 0; animation: riseIn 0.6s 0.25s ease forwards;
  }
  .brand-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 56px; line-height: 1;
    letter-spacing: 0.06em;
    color: var(--text);
  }
  .brand-sub {
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.4em; color: var(--accent);
    text-transform: uppercase;
    margin-top: 8px;
  }

  /* ── PROGRESS ── */
  .progress-wrap {
    width: 220px;
    opacity: 0; animation: riseIn 0.6s 0.4s ease forwards;
  }
  .progress-track {
    width: 100%; height: 3px;
    background: var(--track);
    border-radius: 2px; overflow: hidden;
  }
  .progress-fill {
    height: 100%; width: 0%;
    background: var(--accent);
    border-radius: 2px;
    box-shadow: 0 0 8px var(--accent-glow);
    animation: fill 2s cubic-bezier(0.4,0,0.2,1) forwards;
  }
  @keyframes fill {
    0%   { width: 0%; }
    100% { width: 100%; }
  }

  .status {
    margin-top: 14px;
    font-size: 11px; letter-spacing: 0.15em;
    color: var(--text-muted); text-transform: uppercase;
    text-align: center;
    min-height: 14px;
    transition: opacity 0.3s;
  }
`;

const statuses = [
  'Initializing...',
  'Loading assets...',
  'Almost ready...',
];

export default function Loader() {
  const statusRef = useRef(null);

  useEffect(() => {
    let si = 0;
    if (statusRef.current) statusRef.current.textContent = statuses[0];
    const interval = setInterval(() => {
      si = (si + 1) % statuses.length;
      if (statusRef.current) {
        statusRef.current.style.opacity = '0';
        setTimeout(() => {
          if (statusRef.current) {
            statusRef.current.textContent = statuses[si];
            statusRef.current.style.opacity = '1';
          }
        }, 300);
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="loader-root">
        <div className="ambient" />
        <div className="stage">
          <div className="icon-wrap">
            <div className="ring" />
            <svg className="icon-svg" width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
          </div>

          <div className="wordmark">
            <div className="brand-name">CWC</div>
            <div className="brand-sub">Printing Solutions</div>
          </div>

          <div className="progress-wrap">
            <div className="progress-track">
              <div className="progress-fill" />
            </div>
            <div className="status" ref={statusRef} />
          </div>
        </div>
      </div>
    </>
  );
}