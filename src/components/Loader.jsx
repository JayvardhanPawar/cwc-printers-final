import React, { useEffect, useRef } from 'react';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Rajdhani:wght@300;400;600;700&display=swap');

  :root {
    --accent:       #16A34A;
    --accent-hover: #15803D;
    --accent-glow:  rgba(22, 163, 74, 0.35);
    --accent-dim:   rgba(22, 163, 74, 0.08);
    --bg:           #ffffff;
    --surface:      #E8F5E9;
    --text:         #052e16;
    --text-muted:   rgba(5, 46, 22, 0.45);
    --ink:          #d1fae5;
  }

  @media (prefers-color-scheme: dark) {
    :root {
      --accent:       #59FF73;
      --accent-glow:  rgba(89, 255, 115, 0.3);
      --accent-dim:   rgba(89, 255, 115, 0.07);
      --bg:           #000000;
      --surface:      #0A0A0A;
      --text:         #F0FFF4;
      --text-muted:   rgba(240, 255, 244, 0.4);
      --ink:          #111111;
    }
  }

  .dark .loader-root {
    --accent:       #59FF73;
    --accent-glow:  rgba(89, 255, 115, 0.3);
    --accent-dim:   rgba(89, 255, 115, 0.07);
    --bg:           #000000;
    --surface:      #0A0A0A;
    --text:         #F0FFF4;
    --text-muted:   rgba(240, 255, 244, 0.4);
    --ink:          #111111;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .loader-root {
    position: fixed; inset: 0; z-index: 9999;
    display: flex; align-items: center; justify-content: center;
    background: var(--bg);
    overflow: hidden;
    font-family: 'Rajdhani', sans-serif;
  }

  /* ── GRID BACKGROUND ── */
  .grid-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(var(--accent-dim) 1px, transparent 1px),
      linear-gradient(90deg, var(--accent-dim) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: gridDrift 20s linear infinite;
  }
  @keyframes gridDrift {
    0%   { background-position: 0 0; }
    100% { background-position: 60px 60px; }
  }

  /* ── NOISE OVERLAY ── */
  .noise {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.03;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  }

  /* ── RADIAL AMBIENT ── */
  .ambient {
    position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 50% at 50% 50%, rgba(22,163,74,0.07) 0%, transparent 70%);
    animation: ambientPulse 3s ease-in-out infinite alternate;
  }
  @keyframes ambientPulse {
    from { opacity: 0.6; transform: scale(1); }
    to   { opacity: 1;   transform: scale(1.1); }
  }

  /* ── CORNER MARKS ── */
  .corner { position: absolute; width: 28px; height: 28px; }
  .corner::before, .corner::after { content:''; position:absolute; background: var(--accent); }
  .corner::before { width: 2px; height: 100%; }
  .corner::after  { width: 100%; height: 2px; }
  .corner.tl { top:28px; left:28px; }
  .corner.tr { top:28px; right:28px; transform: scaleX(-1); }
  .corner.bl { bottom:28px; left:28px; transform: scaleY(-1); }
  .corner.br { bottom:28px; right:28px; transform: scale(-1); }
  .corner { opacity: 0; animation: cornerIn 0.6s ease forwards; }
  .corner.tl { animation-delay: 0.1s; }
  .corner.tr { animation-delay: 0.2s; }
  .corner.bl { animation-delay: 0.3s; }
  .corner.br { animation-delay: 0.4s; }
  @keyframes cornerIn {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
  .corner.tr { animation-name: cornerInMirrorX; }
  .corner.bl { animation-name: cornerInMirrorY; }
  .corner.br { animation-name: cornerInMirrorXY; }
  @keyframes cornerInMirrorX  { from { opacity:0; transform:scaleX(-1) scale(0.5); } to { opacity:1; transform:scaleX(-1) scale(1); } }
  @keyframes cornerInMirrorY  { from { opacity:0; transform:scaleY(-1) scale(0.5); } to { opacity:1; transform:scaleY(-1) scale(1); } }
  @keyframes cornerInMirrorXY { from { opacity:0; transform:scale(-0.5); }           to { opacity:1; transform:scale(-1); } }

  /* ── SCAN LINE ── */
  .scanline {
    position: absolute; inset: 0; pointer-events: none; overflow: hidden;
  }
  .scanline::after {
    content: '';
    position: absolute; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
    opacity: 0.6;
    animation: scan 2.5s ease-in-out infinite;
  }
  @keyframes scan {
    0%   { top: -2px; }
    100% { top: 100%; }
  }

  /* ── MAIN STAGE ── */
  .stage {
    position: relative; z-index: 10;
    display: flex; flex-direction: column; align-items: center; gap: 0;
  }

  /* ── TOP LABEL ── */
  .top-label {
    font-family: 'Rajdhani', sans-serif;
    font-size: 11px; font-weight: 600;
    letter-spacing: 0.5em; color: var(--text-muted);
    text-transform: uppercase;
    opacity: 0; animation: fadeUp 0.6s 0.3s ease forwards;
    margin-bottom: 20px;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── ICON RING ── */
  .icon-wrap {
    position: relative; width: 100px; height: 100px;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 32px;
    opacity: 0; animation: popIn 0.7s 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
  }
  @keyframes popIn {
    from { opacity: 0; transform: scale(0.5) rotate(-15deg); }
    to   { opacity: 1; transform: scale(1) rotate(0deg); }
  }

  /* Rotating dashed ring */
  .ring-outer {
    position: absolute; inset: 0;
    border-radius: 50%;
    border: 1.5px dashed rgba(22, 163, 74, 0.35);
    animation: spinCW 8s linear infinite;
  }
  @keyframes spinCW { to { transform: rotate(360deg); } }

  /* Rotating solid segments */
  .ring-inner { 
    position: absolute; inset: 6px;
    border-radius: 50%;
    border: 2px solid transparent;
    border-top-color: var(--accent);
    border-right-color: var(--accent);
    animation: spinCCW 1.6s cubic-bezier(0.6,0.2,0.4,0.8) infinite;
  }
  @keyframes spinCCW { to { transform: rotate(-360deg); } }

  /* Pulsing glow disk */
  .ring-glow {
    position: absolute; inset: 10px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--accent-dim) 0%, transparent 70%);
    animation: glowPulse 1.8s ease-in-out infinite alternate;
  }
  @keyframes glowPulse {
    from { opacity: 0.4; transform: scale(0.9); }
    to   { opacity: 1;   transform: scale(1.1); }
  }

  /* Printer SVG Icon */
  .icon-svg {
    position: relative; z-index: 2;
    color: var(--accent);
    filter: drop-shadow(0 0 12px var(--accent-glow));
    animation: iconFloat 2.5s ease-in-out infinite;
  }
  @keyframes iconFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-4px); }
  }

  /* Paper feed lines animation */
  .paper-feed {
    position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
    width: 18px; overflow: hidden; height: 14px;
  }
  .paper-line {
    width: 100%; height: 2px; background: var(--accent); opacity: 0.8;
    margin-bottom: 3px;
    animation: feedDown 0.8s linear infinite;
  }
  .paper-line:nth-child(2) { animation-delay: 0.26s; }
  .paper-line:nth-child(3) { animation-delay: 0.52s; }
  @keyframes feedDown {
    0%   { transform: translateY(-100%); opacity: 0; }
    30%  { opacity: 1; }
    100% { transform: translateY(200%); opacity: 0; }
  }

  /* ── WORDMARK ── */
  .wordmark {
    display: flex; flex-direction: column; align-items: center;
    margin-bottom: 40px;
    opacity: 0; animation: fadeUp 0.6s 0.9s ease forwards;
  }
  .brand-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 72px; line-height: 1;
    letter-spacing: 0.08em;
    color: var(--text);
    text-shadow: 0 0 60px rgba(22, 163, 74, 0.15);
    position: relative;
  }
  /* Glitch effect */
  .brand-name::before,
  .brand-name::after {
    content: attr(data-text);
    position: absolute; inset: 0;
    font-family: inherit; font-size: inherit;
    letter-spacing: inherit; line-height: inherit;
    color: var(--text);
  }
  .brand-name::before {
    clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
    transform: translate(-2px, 0);
    color: var(--accent);
    opacity: 0;
    animation: glitch1 4s steps(1) infinite;
  }
  .brand-name::after {
    clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
    transform: translate(2px, 0);
    color: #15803D;
    opacity: 0;
    animation: glitch2 4s steps(1) infinite;
  }
  @keyframes glitch1 {
    0%, 89%, 100% { opacity: 0; }
    90%, 91%      { opacity: 1; transform: translate(-3px, 0); }
    91.5%, 92%    { opacity: 1; transform: translate(2px, 1px); }
    92.5%         { opacity: 0; }
  }
  @keyframes glitch2 {
    0%, 89%, 100% { opacity: 0; }
    90%, 91%      { opacity: 1; transform: translate(3px, 0); }
    91.5%, 92%    { opacity: 1; transform: translate(-1px, -1px); }
    92.5%         { opacity: 0; }
  }

  .brand-sub {
    font-family: 'Rajdhani', sans-serif;
    font-size: 10px; font-weight: 600;
    letter-spacing: 0.55em; color: var(--accent);
    text-transform: uppercase;
    margin-top: 2px;
  }

  /* Separator line with diamond */
  .separator {
    display: flex; align-items: center; gap: 10px;
    width: 260px; margin-top: 12px;
  }
  .sep-line { flex: 1; height: 1px; background: rgba(255,255,255,0.1); }
  .sep-diamond {
    width: 5px; height: 5px;
    background: var(--accent);
    transform: rotate(45deg);
    box-shadow: 0 0 8px var(--accent-glow);
    animation: diamondPulse 1.5s ease-in-out infinite alternate;
  }
  @keyframes diamondPulse {
    from { box-shadow: 0 0 4px var(--accent-glow); }
    to   { box-shadow: 0 0 14px var(--accent-glow), 0 0 28px var(--accent-glow); }
  }

  /* ── PROGRESS TRACK ── */
  .progress-wrap {
    width: 260px;
    opacity: 0; animation: fadeUp 0.6s 1.1s ease forwards;
  }
  .progress-meta {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 8px;
  }
  .progress-label {
    font-size: 10px; font-weight: 600; letter-spacing: 0.2em;
    color: var(--text-muted); text-transform: uppercase;
  }
  .progress-pct {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 16px; letter-spacing: 0.05em;
    color: var(--accent);
  }
  .progress-track {
    width: 100%; height: 3px;
    background: var(--ink);
    border-radius: 2px; overflow: hidden;
    position: relative;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #15803D);
    border-radius: 2px;
    box-shadow: 0 0 10px var(--accent-glow);
    animation: loadFill 2.2s cubic-bezier(0.4,0,0.2,1) forwards;
    width: 0%;
  }
  @keyframes loadFill {
    0%   { width: 0%; }
    30%  { width: 28%; }
    60%  { width: 65%; }
    85%  { width: 88%; }
    100% { width: 100%; }
  }

  /* Shimmer over bar */
  .progress-shimmer {
    position: absolute; inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
    animation: shimmer 1.5s ease-in-out infinite;
    background-size: 200% 100%;
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(200%); }
  }

  /* ── DOTS ── */
  .dots {
    display: flex; gap: 6px; margin-top: 16px; justify-content: center;
    opacity: 0; animation: fadeUp 0.5s 1.3s ease forwards;
  }
  .dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--accent); opacity: 0.3;
    animation: dotBlink 1.2s ease-in-out infinite;
  }
  .dot:nth-child(1) { animation-delay: 0s; }
  .dot:nth-child(2) { animation-delay: 0.2s; }
  .dot:nth-child(3) { animation-delay: 0.4s; }
  .dot:nth-child(4) { animation-delay: 0.6s; }
  .dot:nth-child(5) { animation-delay: 0.8s; }
  @keyframes dotBlink {
    0%, 100% { opacity: 0.2; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.5); background: #15803D; box-shadow: 0 0 6px var(--accent-glow); }
  }

  /* ── STATUS TEXT ── */
  .status {
    margin-top: 10px;
    font-size: 10px; letter-spacing: 0.25em;
    color: var(--text-muted); text-transform: uppercase;
    opacity: 0; animation: fadeUp 0.5s 1.4s ease forwards;
    min-height: 14px;
  }

  /* ── FLOATING PARTICLES ── */
  .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
  .particle {
    position: absolute;
    width: 2px; height: 2px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    animation: particleFloat linear infinite;
  }
`;

const statuses = [
  'Initializing systems...',
  'Loading assets...',
  'Calibrating output...',
  'Almost ready...',
];

export default function Loader() {
  const pctRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    // Animate percentage counter
    let start = 0;
    const targets = [28, 65, 88, 100];
    const timings = [660, 1320, 1870, 2420];
    let idx = 0;
    const tick = () => {
      if (idx >= targets.length) return;
      const target = targets[idx];
      const end = timings[idx];
      idx++;
      const prev = start;
      const duration = end - (timings[idx - 2] || 0);
      const startTime = performance.now();
      const step = (now) => {
        const t = Math.min((now - startTime) / duration, 1);
        const val = Math.round(prev + (target - prev) * t);
        if (pctRef.current) pctRef.current.textContent = val + '%';
        if (t < 1) requestAnimationFrame(step);
        else { start = target; setTimeout(tick, 0); }
      };
      requestAnimationFrame(step);
    };
    setTimeout(tick, 1100);

    // Cycle status text
    let si = 0;
    if (statusRef.current) statusRef.current.textContent = statuses[0];
    const statusInterval = setInterval(() => {
      si = (si + 1) % statuses.length;
      if (statusRef.current) {
        statusRef.current.style.opacity = '0';
        statusRef.current.style.transition = 'opacity 0.3s';
        setTimeout(() => {
          if (statusRef.current) {
            statusRef.current.textContent = statuses[si];
            statusRef.current.style.opacity = '1';
          }
        }, 300);
      }
    }, 620);
    return () => clearInterval(statusInterval);
  }, []);

  // Generate random particles
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 6}s`,
    duration: `${4 + Math.random() * 6}s`,
    size: Math.random() > 0.7 ? '3px' : '2px',
  }));

  return (
    <>
      <style>{styles}</style>
      <div className="loader-root">

        {/* Backgrounds */}
        <div className="grid-bg" />
        <div className="noise" />
        <div className="ambient" />
        <div className="scanline" />

        {/* Corner marks */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        {/* Floating particles */}
        <div className="particles">
          {particles.map(p => (
            <div
              key={p.id}
              className="particle"
              style={{
                left: p.left, top: p.top,
                width: p.size, height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
                animationName: 'particleFloat',
              }}
            />
          ))}
        </div>

        {/* Main stage */}
        <div className="stage">

          {/* Top label */}
          <div className="top-label">Precision · Quality · Innovation</div>

          {/* Icon */}
          <div className="icon-wrap">
            <div className="ring-outer" />
            <div className="ring-inner" />
            <div className="ring-glow" />
            {/* Printer SVG */}
            <svg className="icon-svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            {/* Paper feed */}
            <div className="paper-feed">
              <div className="paper-line" />
              <div className="paper-line" />
              <div className="paper-line" />
            </div>
          </div>

          {/* Wordmark */}
          <div className="wordmark">
            <div className="brand-name" data-text="CWC">CWC</div>
            <div className="brand-sub">Printing&nbsp;&nbsp;Solutions</div>
            <div className="separator">
              <div className="sep-line" />
              <div className="sep-diamond" />
              <div className="sep-line" />
            </div>
          </div>

          {/* Progress */}
          <div className="progress-wrap">
            <div className="progress-meta">
              <span className="progress-label">Loading</span>
              <span className="progress-pct" ref={pctRef}>0%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" />
              <div className="progress-shimmer" />
            </div>
          </div>

          {/* Dots */}
          <div className="dots">
            {[0,1,2,3,4].map(i => <div key={i} className="dot" />)}
          </div>

          {/* Status */}
          <div className="status" ref={statusRef} />

        </div>
      </div>
    </>
  );
}