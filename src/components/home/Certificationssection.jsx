import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const certGrid = [
  { name: 'ISO 9001',  sub: 'Quality',     color: 'text-brand-accent' },
  { name: 'ISO 14001', sub: 'Environment', color: 'text-brand-accent' },
  { name: 'ISO 27001', sub: 'Security',    color: 'text-brand-accent' },
  { name: 'ISO 45001', sub: 'Safety',      color: 'text-brand-accent' },
  { name: 'BIS',       sub: 'India',       color: 'text-brand-accent' },
  { name: 'RoHS',      sub: 'Hazard-Free', color: 'text-brand-accent' },
  { name: 'FCC',       sub: 'USA',         color: 'text-brand-accent' },
  { name: 'CE Mark',   sub: 'Europe',      color: 'text-brand-accent' },
  { name: 'ETA-WPC',   sub: 'Wireless',    color: 'text-blue-500 dark:text-blue-400' },
  { name: 'LMPC',      sub: 'Metrology',   color: 'text-blue-500 dark:text-blue-400' },
  { name: 'ZED',       sub: 'Zero Defect', color: 'text-blue-500 dark:text-blue-400' },
  { name: 'NSIC',      sub: 'Industries',  color: 'text-blue-500 dark:text-blue-400' },
];

const stats = [
  { num: '12',  label: 'ISO Standards'  },
  { num: 'BIS', label: 'India Licensed' },
  { num: 'GeM', label: 'Gov. Portal'    },
  { num: 'ZED', label: 'Zero Defect'    },
];

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export default function CertificationsSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2
          bg-gray-100 dark:bg-gray-950
          shadow-xl
          border border-gray-200 dark:border-gray-800
          transition-all duration-700
          ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >

          {/* ── Left: cert grid ── */}
          <div className="p-8 md:p-12 flex flex-col justify-center
            border-b lg:border-b-0 lg:border-r
            border-gray-200 dark:border-white/10">
            <div className="grid grid-cols-4">
              {certGrid.map((c, i) => {
                const isLastRow = i >= certGrid.length - 4;
                const isLastCol = (i + 1) % 4 === 0;
                return (
                  <div
                    key={i}
                    className={`py-5 px-3
                      ${!isLastRow ? 'border-b border-gray-300 dark:border-white/10' : ''}
                      ${!isLastCol ? 'border-r border-gray-300 dark:border-white/10' : ''}`}
                  >
                    <p className={`text-sm font-bold mb-0.5 ${c.color}`}>{c.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{c.sub}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: headline + stats ── */}
          <div className="p-8 md:p-12 flex flex-col justify-center
            bg-gray-200/60 dark:bg-gray-900">

            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-accent mb-4">
              Certifications
            </p>

            {/* Headline */}
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5
              text-brand-text dark:text-white">
              24 certificates.<br />Zero compromises.
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-8 max-w-sm
              text-gray-600 dark:text-gray-400">
              More certifications than any Indian competitor — from ISO 9001 quality management
              to ISO 27001 information security.
            </p>

            {/* Stat cards */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {stats.map((s) => (
                <div
                  key={s.num}
                  className="rounded-2xl px-5 py-4 border transition-colors
                    bg-white dark:bg-gray-800/60
                    border-gray-300 dark:border-white/10
                    hover:border-brand-accent/40 dark:hover:border-brand-accent/40"
                >
                  <p className="text-2xl font-bold mb-1 text-orange-500 dark:text-orange-400">
                    {s.num}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest
                    text-gray-500 dark:text-gray-500">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/certifications"
              className="inline-flex items-center gap-1 font-semibold text-sm transition-colors
                text-orange-500 dark:text-orange-400
                hover:text-orange-600 dark:hover:text-orange-300"
            >
              See all certifications
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}