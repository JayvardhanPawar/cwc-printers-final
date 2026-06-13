import React, { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, ShieldCheck, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const highlights = [
    { icon: <Cpu strokeWidth={1.5} className="w-6 h-6" />, title: "R&D Focused", desc: "Continuous investment in research to meet evolving printing needs." },
    { icon: <ShieldCheck strokeWidth={1.5} className="w-6 h-6" />, title: "Proven Reliability", desc: "A testament to the trusted heritage of E-Compusell Ltd." },
    { icon: <Lightbulb strokeWidth={1.5} className="w-6 h-6" />, title: "Expert Driven", desc: "Built by industry veterans with decades of technical knowledge." },
    { icon: <Target strokeWidth={1.5} className="w-6 h-6" />, title: "Precision Quality", desc: "Manufacturing high-quality Laser & MFP solutions for every scale." }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">
          
          {/* --- LEFT SIDE: IMAGE CONTAINER --- */}
          <div className={`flex-1 w-full relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            
            {/* 3D Decorative Slanted Background */}
            <div className="absolute top-8 right-8 bottom-[-8px] left-8 bg-white dark:bg-brand-darkCard rounded-[2.5rem] shadow-3d border border-brand-secondary/70 dark:border-gray-800 transform rotate-[6deg] z-0" />
            
            {/* 🟢 MAIN IMAGE CARD - Fixed Alignment Logic */}
            <div className="relative z-10 w-full max-w-[520px] mx-auto lg:mx-0 bg-white dark:bg-brand-darkCard rounded-[2.2rem] p-3 shadow-2xl border border-brand-secondary dark:border-gray-800 overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group">
                <img 
                  src="/images/main.jpg" 
                  alt="CWC Innovation" 
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/800x1000?text=CWC+Innovation'; }}
                />
                
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-transparent to-transparent opacity-80" />
                
                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl">
                   <div className="flex items-start gap-3">
                     <Target className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                     <p className="text-white text-xs font-semibold leading-relaxed">
                        Industry-leading expertise serving the modern Indian workplace with precision hardware.
                     </p>
                   </div>
                </div>
              </div>
            </div>

            {/* 🔶 Make In India Floating Badge */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white dark:bg-brand-darkCard p-1 rounded-full shadow-3d animate-float z-20 border border-brand-secondary dark:border-gray-700">
              <div className="bg-gradient-to-br from-brand-accent to-brand-highlight text-white p-5 md:p-7 rounded-full text-center min-w-[120px]">
                <p className="text-2xl md:text-4xl font-black leading-none">100%</p>
                <p className="text-[9px] uppercase font-bold tracking-[0.1em] mt-1">Make In India</p>
              </div>
            </div>
          </div>

          {/* --- RIGHT SIDE: CONTENT --- */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className={`space-y-4 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                 <div className="w-8 h-px bg-brand-accent rounded-full" />
                 <h4 className="text-brand-accent font-bold uppercase tracking-[0.3em] text-xs">A Trusted Startup</h4>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-text dark:text-brand-darkText leading-[1.1] tracking-tighter">
                Redefining printing<br />
                with Indian <span className="text-brand-accent">Precision</span>.
              </h2>
            </div>

            <div className={`space-y-6 text-gray-700 dark:text-gray-300 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-xl font-bold text-brand-text dark:text-white leading-snug">
                The CWC brand serves as a testament to the reliability and expertise of E-Compusell Ltd.
              </p>
              <p className="text-sm leading-relaxed font-medium">
                We specialize in designing and manufacturing high-quality <span className="text-brand-accent font-bold">Make-In-India</span> Laser & Multifunction Printers. Our expert team leverages years of industry experience to meet the evolving needs of our customers through dedicated R&D.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {highlights.map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-white dark:bg-brand-darkCard/50 border border-brand-secondary dark:border-gray-800 transition-all hover:border-brand-accent hover:shadow-md group">
                  <div className="shrink-0 w-12 h-12 bg-brand-primary dark:bg-gray-800 rounded-xl border border-brand-secondary dark:border-gray-700 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <h5 className="font-bold text-brand-text dark:text-brand-darkText text-sm">{item.title}</h5>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className={`pt-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-brand-accent hover:bg-brand-highlight text-white px-8 py-4 rounded-xl font-bold text-sm shadow-3d hover:-translate-y-1 transition-all">
                Enquire Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}