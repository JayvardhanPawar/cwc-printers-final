import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Settings, Recycle, ChevronRight } from 'lucide-react';

const sectionMeta = {
  eyebrow: 'Genuine Consumables',
  headline: 'Keep printing. Keep saving.',
  description:
    'Genuine CWC consumables deliver the best print quality, lowest cost per page, and full warranty protection.',
};

const consumables = [
  {
    icon: Heart,
    iconColor: 'text-gray-400 dark:text-gray-500',
    title: 'Toner Cartridges',
    description:
      'Genuine CWC toner cartridges. High-yield options up to 15,000 pages. Sharp black output, consistent page after page.',
    linkLabel: 'Shop Toner Cartridges',
    linkTo: '/products?category=consumables&type=Toner',
  },
  {
    icon: Settings,
    iconColor: 'text-gray-400 dark:text-gray-500',
    title: 'Drum Unit',
    description:
      'OEM drum units for maximum print quality and printer longevity. Replace at recommended intervals for optimal output.',
    linkLabel: 'Shop Drum Units',
    linkTo: '/products?category=consumables&type=Drum+Unit',
    // featured: true,
  },
  {
    icon: Recycle,
    iconColor: 'text-brand-accent',
    title: 'Waste Toner Bin',
    description:
      'Safe, compliant waste toner collection and disposal. Part of our e-waste responsibility programme.',
    linkLabel: 'Learn More',
    linkTo: '/consumables/waste-toner',
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

export default function ConsumablesSection() {
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.1);

  return (
    <section className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-brand-accent/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange-500/10 rounded-full blur-[100px]" />
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

        {/* Cards grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {consumables.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.linkTo}
                style={{ transitionDelay: `${i * 80}ms` }}
                className={`group relative flex flex-col rounded-[1.75rem] p-8 border
                  transition-all duration-500 overflow-hidden
                  hover:-translate-y-1
                  ${item.featured
                    ? 'bg-gray-900 dark:bg-gray-900 border-brand-accent/30'
                    : 'bg-white dark:bg-brand-darkCard border-brand-secondary dark:border-gray-800 hover:border-brand-accent/30 dark:hover:border-brand-accent/30'}
                  ${gridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Glow blob — featured always on, others on hover */}
                <div className={`absolute -top-10 left-1/2 -translate-x-1/2 w-36 h-36 rounded-full bg-brand-accent blur-[60px] pointer-events-none transition-opacity duration-500 ${item.featured ? 'opacity-10' : 'opacity-0 group-hover:opacity-10'}`} />

                {/* Icon */}
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-6 relative z-10 transition-all duration-300 group-hover:scale-110
                  ${item.featured ? 'bg-gray-800' : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className={`text-base font-bold mb-2 relative z-10 group-hover:text-brand-accent transition-colors duration-300
                  ${item.featured ? 'text-white' : 'text-brand-text dark:text-brand-darkText'}`}>
                  {item.title}
                </h3>

                {/* Desc */}
                <p className={`text-xs leading-relaxed mb-5 flex-1 relative z-10
                  ${item.featured ? 'text-white/50' : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.description}
                </p>

                {/* Link label */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 group-hover:gap-2 transition-all duration-300 mt-auto relative z-10">
                  {item.linkLabel}
                  <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
                    fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth="2">
                    <path d="M2 6h8M7 3l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>

                {/* Corner decoration */}
                <div className={`absolute top-7 right-7 w-6 h-6 border-t-2 border-r-2 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500
                  ${item.featured ? 'border-brand-accent/40' : 'border-brand-secondary dark:border-gray-700'}`} />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}