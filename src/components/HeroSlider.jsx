import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight, Printer } from 'lucide-react';

const slides = [
  {
    badge: "Enterprise Ready Hardware",
    title: "Next-Gen Printing",
    highlight: "Solutions for Business",
    description:
      "Empower your workflow with high-performance laser and inkjet technology designed for absolute precision and industrial-grade reliability.",
    primaryLabel: "Explore Catalog",
    primaryTo: "/products",
    secondaryLabel: "Contact Sales",
    secondaryTo: "/contact",
    label: "CWC SERIES 2026",
    num: "01",
    image: "/images/cwc-p5028/main.webp",
  },
  {
    badge: "Eco Smart Technology",
    title: "Sustainable Printing,",
    highlight: "Zero Compromise",
    description:
      "Industry-leading energy efficiency with toner-save modes and certified recycled materials — reduce your carbon footprint without sacrificing output quality.",
    primaryLabel: "View Eco Series",
    primaryTo: "/products/eco",
    secondaryLabel: "Get a Quote",
    secondaryTo: "/contact",
    label: "ECO LINE 2026",
    num: "02",
    image: "/images/cwc-2500s/main.webp",
  },
  {
    badge: "High-Speed Production",
    title: "Industrial Output,",
    highlight: "Unmatched Speed",
    description:
      "Push the limits of output with our production-grade series — 55 pages per minute, continuous-duty rated, built for the most demanding print environments.",
    primaryLabel: "View Pro Series",
    primaryTo: "/products/pro",
    secondaryLabel: "Request Demo",
    secondaryTo: "/contact",
    label: "PRO LINE 2026",
    num: "03",
    image: "/images/cwc-2700s/main.webp",
  },
];

const DURATION = 5000;

export default function HeroSlider({ isVisible }) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const touchStartX = useRef(null);

  const goTo = useCallback((n) => {
    setCurrent(((n % slides.length) + slides.length) % slides.length);
    setProgress(0);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        goTo(current + 1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [current, goTo]);

  return (
    // FIX 1: min-h instead of a hard h-[100svh] so content can grow instead of
    // getting clipped on short/mobile viewports. Still h-[100svh] on lg+ where
    // there's room for everything.
    // FIX 2: overflow-x-hidden (not overflow-hidden) — we still need to clip the
    // horizontal slide track, but we must NOT clip vertically or tall mobile
    // content gets cut off.
    <div
      className="relative overflow-x-hidden w-full min-h-[100svh] lg:h-[100svh] flex flex-col"
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1));
      }}
    >
      {/* Progress bar */}
      <div
        className="absolute top-0 left-0 h-[3px] z-20 rounded-r-full bg-brand-accent transition-all duration-100"
        style={{ width: `${progress}%` }}
      />

      {/* Slides track */}
      <div
        className="flex flex-1 transition-transform duration-700"
        style={{
          transform: `translateX(-${current * (100 / slides.length)}%)`,
          transitionTimingFunction: 'cubic-bezier(0.77,0,0.175,1)',
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((s, i) => (
          <div
            key={i}
            // FIX 3: smaller gap/padding on mobile so there's less vertical
            // weight to begin with; min-h instead of h-full lets it size
            // to its own content.
            className="flex flex-col lg:flex-row items-center justify-center
              gap-6 sm:gap-8 lg:gap-16
              px-5 sm:px-6 py-6 sm:py-10 lg:px-16 xl:px-24 lg:py-0
              min-h-[100svh] lg:min-h-0 lg:h-full"
            style={{ width: `${100 / slides.length}%` }}
          >
            {/* Left Content */}
            <div className="flex-1 space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left z-10 w-full">
              <div
                className={`inline-flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-brand-secondary dark:border-gray-800 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-accent" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-brand-text dark:text-brand-darkText">
                  {s.badge}
                </span>
              </div>

              {/* FIX 4: added a real mobile-first step (text-3xl) below the old
                  smallest size (text-4xl) so the heading has room to breathe
                  on narrow phones instead of wrapping awkwardly. */}
              <h1
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-brand-text dark:text-brand-darkText leading-[1.15] sm:leading-[1.1] transition-all duration-1000 delay-100 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {s.title} <br />
                <span className="text-brand-accent relative inline-block">
                  {s.highlight}
                  <span
                    className={`absolute bottom-1 sm:bottom-2 left-0 h-[4px] sm:h-[6px] bg-brand-accent/20 rounded-full transition-all duration-1000 delay-1000 ${
                      isVisible ? 'w-full' : 'w-0'
                    }`}
                  />
                </span>
              </h1>

              <p
                className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed transition-all duration-1000 delay-200 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {s.description}
              </p>

              <div
                className={`flex flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 lg:gap-5 pt-1 sm:pt-2 transition-all duration-1000 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <Link
                  to={s.primaryTo}
                  className="group flex items-center gap-2 bg-brand-text dark:bg-brand-accent hover:bg-brand-highlight text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl font-bold transition-all shadow-3d hover:-translate-y-1 text-xs sm:text-sm lg:text-base"
                >
                  {s.primaryLabel}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to={s.secondaryTo}
                  className="flex items-center gap-2 border-2 border-brand-secondary dark:border-gray-800 text-brand-text dark:text-brand-darkText hover:border-brand-accent hover:text-brand-accent px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-2xl font-bold transition-all text-xs sm:text-sm lg:text-base"
                >
                  {s.secondaryLabel}
                </Link>
              </div>

              <p className="text-[10px] sm:text-xs font-mono text-gray-400 dark:text-gray-600 tracking-widest pt-1">
                {s.num} / {String(slides.length).padStart(2, '0')}
              </p>
            </div>

            {/* Right Image */}
            <div
              className={`flex-1 w-full max-w-xs sm:max-w-md lg:max-w-none transition-all duration-1000 delay-500 z-10 ${
                isVisible ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 translate-x-12'
              }`}
            >
              <div className="relative group">
                <img
                  src={s.image}
                  alt={s.badge}
                  // FIX 5: shrunk mobile image cap (was 40vh, now 22vh) since
                  // that height was the single biggest contributor to the
                  // slide not fitting in one screen on phones.
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105 object-contain max-h-[22vh] sm:max-h-[32vh] lg:max-h-[60vh] mx-auto"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x600?text=Premium+Printer';
                  }}
                />
                <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-md text-white px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono border border-white/10">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                  {s.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Prev / Next arrows — FIX 6: hidden on phones. They previously sat
          absolutely centered over the text/image and overlapped content once
          the slide height became fluid. Swipe + dots handle nav on mobile. */}
      <button
        onClick={() => goTo(current - 1)}
        className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-brand-secondary dark:border-gray-700 bg-white/80 dark:bg-black/30 backdrop-blur-sm items-center justify-center text-brand-text dark:text-brand-darkText hover:bg-white dark:hover:bg-black/50 transition-colors shadow-md"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-brand-secondary dark:border-gray-700 bg-white/80 dark:bg-black/30 backdrop-blur-sm items-center justify-center text-brand-text dark:text-brand-darkText hover:bg-white dark:hover:bg-black/50 transition-colors shadow-md"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[6px] rounded-full transition-all duration-300 ${
              i === current
                ? 'w-[22px] bg-brand-accent'
                : 'w-[6px] bg-brand-secondary dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
    </div>
  );
}