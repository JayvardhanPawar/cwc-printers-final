import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Flag, Rocket, Zap, Leaf, BadgeCheck } from 'lucide-react';

const pills = [
  { icon: Flag,       label: 'Make In India' },
  { icon: Rocket,     label: 'Startup India' },
  { icon: Zap,        label: 'Atmanirbhar Bharat' },
  { icon: Leaf,       label: 'Vocal for Local' },
  { icon: BadgeCheck, label: 'ZED Certified' },
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

function LionLogo() {
  return (
    <div className="flex items-center justify-center gap-3 mb-5">
      <div className="relative flex-shrink-0">
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
          <circle cx="28" cy="28" r="26" fill="#E07020" fillOpacity="0.18" />
          <circle cx="28" cy="28" r="20" stroke="#E07020" strokeWidth="1" strokeOpacity="0.4" fill="none" />
          <text x="28" y="37" textAnchor="middle" fontSize="22" fontFamily="serif">🦁</text>
        </svg>
      </div>
      <div className="text-left">
        {/* Light: dark text. Dark: white text */}
        <p className="text-brand-text dark:text-white/80 text-xs font-semibold uppercase tracking-widest leading-snug">
          Make In India
        </p>
        <p className="text-gray-500 dark:text-white/50 text-xs leading-snug">
          Official Initiative Participant
        </p>
      </div>
    </div>
  );
}

export default function MakeInIndiaBanner() {
  const [headerRef, headerInView] = useInView(0.2);
  const [bannerRef, bannerInView] = useInView(0.1);

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-accent/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section header */}
        <div ref={headerRef} className="mb-12">
          <p className={`text-xs font-bold uppercase tracking-[0.12em] text-brand-accent mb-3
            transition-all duration-700
            ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            Our Heritage
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-darkText leading-tight mb-4
            transition-all duration-700 delay-75
            ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Built for Bharat.
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md
            transition-all duration-700 delay-150
            ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Proudly participating in India's most important manufacturing and innovation initiatives.
          </p>
        </div>

        {/* Banner card — light: soft green tint on white; dark: deep forest green */}
        <div
          ref={bannerRef}
          className={`relative overflow-hidden rounded-[2.5rem] py-16 px-6 md:px-20 text-center
            border border-brand-accent/20 dark:border-brand-accent/10
            bg-green-50 dark:bg-[#0d2b1a]
            transition-all duration-700 delay-100
            ${bannerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Ambient glow blobs */}
          <div className="absolute -top-16 -left-16 w-80 h-80 rounded-full bg-brand-accent opacity-10 dark:opacity-10 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-16 w-72 h-72 rounded-full bg-brand-accent opacity-10 dark:opacity-10 blur-[100px] pointer-events-none" />

          <LionLogo />

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-4 relative z-10
            text-brand-text dark:text-white">
            Proudly{' '}
            <span className="text-brand-accent">Make in India.</span>
          </h2>

          {/* Tagline */}
          <p className="italic text-base md:text-lg mb-10 relative z-10
            text-gray-500 dark:text-white/50">
            "Desh Ki Samrudhi, Dil Se Swadeshi"
          </p>

          {/* Pills — light: bordered on white bg; dark: glassy white */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 relative z-10">
            {pills.map(({ icon: Icon, label }, i) => (
              <span
                key={label}
                style={{ transitionDelay: `${i * 60}ms` }}
                className="inline-flex items-center gap-2 rounded-full text-sm font-medium px-4 py-2
                  border border-brand-accent/30 dark:border-white/20
                  bg-white/70 dark:bg-white/5
                  text-brand-text dark:text-white/80
                  backdrop-blur-sm"
              >
                <Icon className="w-4 h-4 text-brand-accent" />
                {label}
              </span>
            ))}
          </div>

          {/* CTA — light: dark pill; dark: white pill */}
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-bold px-8 py-4 rounded-2xl
              transition-all shadow-lg hover:-translate-y-0.5 relative z-10
              bg-brand-text dark:bg-white
              text-white dark:text-brand-text
              hover:opacity-90"
          >
            Our Story
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}