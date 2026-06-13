import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Smartphone, Building2, Mail } from 'lucide-react';

const sectionMeta = {
  eyebrow: 'Nationwide Presence',
  headline: 'Service in every corner of India.',
  description:
    'Authorized CWC service centres and multilingual support teams across 14 states — delivering prompt, reliable support nationwide.',
};

const states = [
  'Jammu & Kashmir', 'Delhi', 'Gujarat', 'Maharashtra',
  'Goa', 'Rajasthan', 'Karnataka', 'Assam',
  'West Bengal', 'Odisha', 'Madhya Pradesh', 'Tamil Nadu',
  'Kerala', 'Andaman & Nicobar',
];

const contactItems = [
  {
    icon: Phone,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-300',
    label: 'TOLL FREE',
    value: '1800 212 7110',
    href: 'tel:18002127110',
  },
  {
    icon: Smartphone,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-300',
    label: 'DIRECT',
    value: '+91 98191 26955',
    href: 'tel:+919819126955',
  },
  {
    icon: Building2,
    iconBg: 'bg-red-50 dark:bg-red-950/30',
    iconColor: 'text-red-500 dark:text-red-400',
    label: 'OFFICE',
    value: '020 2970 1984',
    href: 'tel:02029701984',
  },
  {
    icon: Mail,
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    iconColor: 'text-gray-600 dark:text-gray-300',
    label: 'EMAIL',
    value: 'info@ecompusell.com',
    href: 'mailto:info@ecompusell.com',
  },
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

export default function NationwidePresence() {
  const [headerRef, headerInView] = useInView(0.2);
  const [bodyRef, bodyInView] = useInView(0.1);

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-brand-highlight/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-start lg:gap-16">

          {/* Left column */}
          <div className="flex-1 min-w-0" ref={headerRef}>
            <p className={`text-xs font-bold uppercase tracking-[0.12em] text-brand-accent mb-3 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {sectionMeta.eyebrow}
            </p>
            <h2 className={`text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-darkText leading-tight mb-5 transition-all duration-700 delay-75 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {sectionMeta.headline}
            </h2>
            <p className={`text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-lg mb-8 transition-all duration-700 delay-150 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {sectionMeta.description}
            </p>

            {/* State pills */}
            <div
              ref={bodyRef}
              className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-200 ${bodyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              {states.map((state) => (
                <span
                  key={state}
                  className="px-4 py-1.5 rounded-full border border-brand-secondary dark:border-gray-700
                    text-xs font-medium text-brand-text dark:text-brand-darkText
                    bg-white dark:bg-brand-darkCard
                    hover:border-brand-accent/50 hover:text-brand-accent
                    transition-all duration-200 cursor-default"
                >
                  {state}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className={`transition-all duration-700 delay-300 ${bodyInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              <Link
                to="/services#centres"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                  bg-brand-text dark:bg-white
                  text-white dark:text-gray-900
                  text-sm font-semibold
                  hover:opacity-90 hover:-translate-y-0.5
                  transition-all duration-300"
              >
                Find Your Centre
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right column — Contact card: fully theme-aware */}
          <div className={`mt-14 lg:mt-0 lg:w-80 xl:w-96 flex-shrink-0 transition-all duration-700 delay-200 ${headerInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="bg-white dark:bg-brand-darkCard rounded-[1.75rem] p-8 shadow-xl border border-brand-secondary dark:border-gray-800">
              <h3 className="text-lg font-bold text-brand-text dark:text-brand-darkText mb-7">Contact Us</h3>

              <div className="space-y-5">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                      <div className={`w-10 h-10 rounded-xl ${item.iconBg} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
                        <Icon className={`w-4 h-4 ${item.iconColor}`} strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-brand-accent group-hover:text-brand-accent/80 transition-colors duration-200">
                          {item.value}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="h-px bg-brand-secondary dark:bg-gray-800 my-7" />

              <Link
                to="/quote"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-full
                  bg-brand-text dark:bg-white
                  text-white dark:text-gray-900
                  text-sm font-semibold
                  hover:opacity-90 hover:-translate-y-0.5
                  transition-all duration-300"
              >
                Get a Quote
                <svg className="w-4 h-4" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}