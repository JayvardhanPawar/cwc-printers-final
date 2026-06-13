import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star } from 'lucide-react';

const spotlightData = {
  badge: 'CWC 4055 · Best Seller',
  headline: ['55 pages.', 'Every minute.'],
  description:
    'The CWC 4055 delivers enterprise-class print speed at 55 ppm — outperforming the competition and keeping your team moving.',
  stats: [
    { value: '55',    label: 'Pages / Min'    },
    { value: '1200',  label: 'DPI Resolution' },
    { value: '150K',  label: 'Monthly Duty'   },
    { value: 'Wi-Fi', label: 'Connectivity'   },
  ],
  linkLabel: 'Learn more about CWC 4055',
  linkTo: '/products/cwc-4055',
  image: '/images/4055/img1.webp',
  imageAlt: 'CWC 4055 laser printer',
};

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

function PrinterIllustration() {
  return (
    <div className="w-full max-w-[260px] mx-auto">
      <div className="bg-white dark:bg-brand-darkCard rounded-2xl p-5 border border-brand-secondary dark:border-gray-700 shadow-xl">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg border border-brand-secondary dark:border-gray-700" />
          <div className="bg-gray-900 dark:bg-gray-950 rounded-lg px-3 py-2 flex flex-col items-start gap-1">
            <span className="text-[9px] font-bold tracking-widest text-brand-accent">READY</span>
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse block" />
          </div>
        </div>
        <div className="h-[3px] bg-brand-accent rounded-full mb-3" />
        <div className="inline-flex bg-gray-100 dark:bg-gray-800 border border-brand-secondary dark:border-gray-700 rounded px-2 py-1 mb-3">
          <span className="text-[10px] font-bold tracking-wider text-gray-500 dark:text-gray-400">CWC</span>
        </div>
        <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-lg border border-brand-secondary dark:border-gray-700" />
      </div>
    </div>
  );
}

export default function ProductSpotlight() {
  const [headerRef, headerInView] = useInView(0.2);
  const [cardRef, cardInView] = useInView(0.1);
  const d = spotlightData;

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div ref={headerRef} className="mb-12">
          <p className={`text-xs font-bold uppercase tracking-[0.12em] text-brand-accent mb-3 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Product Spotlight
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-darkText leading-tight mb-4 transition-all duration-700 delay-75 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Our flagship model.
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md transition-all duration-700 delay-150 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Engineered for high-volume printing with enterprise reliability and speed.
          </p>
        </div>

        {/* Split card */}
        <div
          ref={cardRef}
          className={`rounded-[2.5rem] overflow-hidden grid grid-cols-1 lg:grid-cols-2
            border border-brand-secondary dark:border-gray-800
            bg-white dark:bg-brand-darkCard shadow-xl
            transition-all duration-700 delay-100
            ${cardInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: content */}
          <div className="p-10 md:p-14 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-brand-secondary dark:border-gray-800">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-6 w-fit">
              <Star className="w-3 h-3" />
              {d.badge}
            </div>

            <h2 className="text-5xl md:text-6xl font-bold text-brand-text dark:text-brand-darkText leading-tight mb-5">
              {d.headline.map((line, i) => <span key={i} className="block">{line}</span>)}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              {d.description}
            </p>

            {/* Stat grid */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {d.stats.map((s) => (
                <div
                  key={s.label}
                  className="bg-brand-primary dark:bg-gray-800/60 rounded-2xl px-5 py-4 border border-brand-secondary dark:border-gray-700 hover:border-brand-accent/40 transition-colors"
                >
                  <p className="text-2xl font-bold text-brand-text dark:text-brand-darkText mb-1">{s.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{s.label}</p>
                </div>
              ))}
            </div>

            <Link
              to={d.linkTo}
              className="inline-flex items-center gap-1 text-brand-accent hover:text-brand-highlight font-semibold text-sm transition-colors"
            >
              {d.linkLabel}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: image */}
          <div className="bg-brand-primary dark:bg-gray-900/40 flex items-center justify-center p-10 md:p-16 relative overflow-hidden">
            <div className="absolute w-64 h-64 bg-brand-accent opacity-5 blur-[80px] rounded-full pointer-events-none" />
            <img
              src={d.image}
              alt={d.imageAlt}
              className="relative z-10 w-full max-w-xs object-contain drop-shadow-lg transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'block';
              }}
            />
            <div style={{ display: 'none' }} className="relative z-10 w-full">
              <PrinterIllustration />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}