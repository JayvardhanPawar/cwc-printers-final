import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Small helper: fade/slide-up on scroll (matches About.jsx pattern)  */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => ref.current && obs.unobserve(ref.current);
  }, []);
  return [ref, visible];
}

/* ------------------------------------------------------------------ */
/*  CTA Banner                                                         */
/* ------------------------------------------------------------------ */
export default function CtaBanner() {
  const [ref, visible] = useReveal();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white dark:bg-black transition-colors duration-500"
    >
      {/* ambient glow, dark mode only */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-darkAccent/0 dark:bg-brand-darkAccent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10 text-center">
        <div
          className={`transition-all duration-1000 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">
            <span className="text-brand-text dark:text-white">Ready to choose </span>
            <span className="text-brand-darkAccent">India's best?</span>
          </h2>

          <p className="text-gray-500 dark:text-white/50 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto mb-10">
            Join thousands of offices across India who trust CWC.
            <br className="hidden sm:block" />
            Explore our range or speak to our team today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/products?category=printers"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand-text text-white dark:bg-white dark:text-brand-text font-bold text-sm transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Explore All Printers
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>

            <a
              href="/contact"
              className="px-7 py-3.5 rounded-full border border-gray-200 bg-gray-50 text-brand-text dark:border-white/10 dark:bg-white/5 dark:text-white font-bold text-sm transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
            >
              Talk to Our Team
            </a>

            <a
              href="/products/cwc-4055"
              className="px-7 py-3.5 rounded-full border border-gray-200 bg-gray-50 text-brand-text dark:border-white/10 dark:bg-white/5 dark:text-white font-bold text-sm transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
            >
              See CWC 4055
            </a>
          </div>
        </div>
      </div>

      {/* tricolor accent bar */}
      <div className="flex h-[3px] w-full">
        <div className="flex-1 bg-orange-500" />
        <div className="flex-1 bg-gray-200 dark:bg-white" />
        <div className="flex-1 bg-brand-darkAccent" />
      </div>
    </section>
  );
}