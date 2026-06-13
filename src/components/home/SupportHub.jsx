import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Download, Headphones, FileText,
  MapPin, Video, ShieldCheck,
} from 'lucide-react';

const sectionMeta = {
  eyebrow: 'Service & Support',
  headline: 'Here when you need us.',
  description: 'Pan India service network, multilingual support, and comprehensive resources.',
};

const supportItems = [
  {
    icon: Download,
    iconColor: 'text-gray-500 dark:text-gray-400',
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    title: 'Drivers & Downloads',
    desc: 'Download the latest drivers for Windows, macOS, and Linux. Quick setup for all CWC models.',
    linkLabel: 'Download now',
    linkTo: '/services#drivers',
  },
  {
    icon: Headphones,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50 dark:bg-amber-950/30',
    title: 'After Sales Support',
    desc: 'Dedicated after-sales team across 14 states. Support in Hindi, Marathi, English, Gujarati, Tamil, Kannada and more.',
    linkLabel: 'Contact support',
    linkTo: '/services#support',
  },
  {
    icon: FileText,
    iconColor: 'text-gray-400 dark:text-gray-500',
    iconBg: 'bg-gray-100 dark:bg-gray-800',
    title: 'Service Policy',
    desc: 'Clear, transparent service commitments. Response time guarantees, spare parts availability.',
    linkLabel: 'Read policy',
    linkTo: '/services#policy',
  },
  {
    icon: MapPin,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50 dark:bg-red-950/30',
    title: 'Service Centres',
    desc: 'Authorized CWC service centres across 14 states — from J&K to Tamil Nadu, Maharashtra to Andaman.',
    linkLabel: 'Find nearest centre',
    linkTo: '/services#centres',
  },
  {
    icon: Video,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50 dark:bg-blue-950/30',
    title: 'Video Centre',
    desc: 'Step-by-step setup videos, toner replacement guides, network configuration tutorials and more.',
    linkLabel: 'Watch videos',
    linkTo: '/services#videos',
  },
  {
    icon: ShieldCheck,
    iconColor: 'text-purple-500',
    iconBg: 'bg-purple-50 dark:bg-purple-950/30',
    title: 'Warranty Information',
    desc: 'Register your CWC printer, check warranty status, and understand coverage terms.',
    linkLabel: 'Check warranty',
    linkTo: '/services#warranty',
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

export default function SupportHub() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-12">
          <p className={`text-xs font-bold uppercase tracking-[0.12em] text-brand-accent mb-3 transition-all duration-700 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {sectionMeta.eyebrow}
          </p>
          <h2 className={`text-4xl md:text-5xl font-bold text-brand-text dark:text-brand-darkText leading-tight mb-4 transition-all duration-700 delay-75 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {sectionMeta.headline}
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-md transition-all duration-700 delay-150 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {sectionMeta.description}
          </p>
        </div>

        {/* Card grid — FIX: added `relative` to each card so corner decoration positions correctly */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {supportItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.linkTo}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group relative flex flex-col bg-white dark:bg-brand-darkCard rounded-[1.75rem] p-8
                  border border-brand-secondary dark:border-gray-800
                  transition-all duration-500
                  hover:shadow-xl hover:-translate-y-1 hover:border-brand-accent/30 dark:hover:border-brand-accent/30
                  ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl ${item.iconBg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-brand-text dark:text-brand-darkText mb-2 group-hover:text-brand-accent transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-5 flex-1">
                  {item.desc}
                </p>

                {/* Link label */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent group-hover:gap-2 transition-all duration-300 mt-auto">
                  {item.linkLabel}
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* Corner decoration — works now because parent has `relative` */}
                <div className="absolute top-7 right-7 w-6 h-6 border-t-2 border-r-2 border-brand-secondary dark:border-gray-700 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}