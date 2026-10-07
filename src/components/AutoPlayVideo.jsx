// src/components/AutoPlayVideo.jsx
import React, { useRef, useEffect, useState } from 'react';
import { PlayCircle, ArrowRight, Gauge, Printer, Layers, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AutoPlayVideo({
  src = '/videos/product-intro.mp4',
  poster = '/images/product-poster.jpg',
  loop = true,
  muted = true,
  controls = false,
}) {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isVisible) return;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Autoplay was blocked:', err);
      });
    }
  }, [isVisible]);

  // Key specs from CWC 4500S — kept minimal, just the headline numbers
  const stats = [
    { icon: <Gauge className="w-5 h-5" />, label: 'Print Speed', value: '45–49 ppm' },
    { icon: <Timer className="w-5 h-5" />, label: 'First Print', value: '< 5.95 sec' },
    { icon: <Layers className="w-5 h-5" />, label: 'Duty Cycle', value: '1,50,000 pages/mo' },
    { icon: <Printer className="w-5 h-5" />, label: 'Function', value: 'Print · Copy · Scan' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        {/* Heading */}
        <div className={`space-y-3 mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 justify-center">
            <div className="w-8 h-px bg-brand-accent rounded-full" />
            <h4 className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs">Product Video</h4>
            <div className="w-8 h-px bg-brand-accent rounded-full" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-brand-text dark:text-brand-darkText tracking-tight">
            CWC 4500S <span className="text-brand-accent">in Action</span>
          </h2>
        </div>

        {/* Video Card — 16:9, 1280x720 native */}
        <div className={`transition-all duration-1000 delay-150 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="relative w-full max-w-[1280px] mx-auto bg-white dark:bg-brand-darkCard rounded-3xl p-2 shadow-3d border border-brand-secondary dark:border-gray-800">
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={src}
                poster={poster}
                width={1280}
                height={720}
                muted={muted}
                loop={loop}
                controls={controls}
                playsInline
                autoPlay
              />
            </div>
          </div>
        </div>

        {/* Key Spec Strip — minimal, 4 stats only */}
        <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto transition-all duration-1000 delay-250 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-white dark:bg-brand-darkCard/50 border border-brand-secondary dark:border-gray-800"
            >
              <div className="text-brand-accent">{stat.icon}</div>
              <p className="text-sm font-extrabold text-brand-text dark:text-brand-darkText">{stat.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Minimal caption + CTA */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
            <PlayCircle className="w-4 h-4 text-brand-accent" />
            Made in India · Laser Multifunction Printer
          </p>
          <Link
            to="/products/cwc-4500s"
            className="group inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-highlight text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-3d hover:-translate-y-0.5 transition-all"
          >
            View Full Specs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}