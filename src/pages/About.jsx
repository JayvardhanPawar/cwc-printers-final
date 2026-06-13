import React, { useEffect, useRef, useState } from 'react';
import { Target, Lightbulb, ShieldCheck, Cpu, ArrowRight, Award, CheckCircle2, FileText } from 'lucide-react';
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const highlights = [
    { icon: <Cpu strokeWidth={1.5} className="w-6 h-6" />, title: "R&D Focused", desc: "Continuous investment in research to meet evolving printing needs." },
    { icon: <ShieldCheck strokeWidth={1.5} className="w-6 h-6" />, title: "Proven Reliability", desc: "A testament to the trusted heritage of E-Compusell Ltd." },
    { icon: <Lightbulb strokeWidth={1.5} className="w-6 h-6" />, title: "Expert Driven", desc: "Built by industry veterans with decades of technical knowledge." },
    { icon: <Target strokeWidth={1.5} className="w-6 h-6" />, title: "Precision Quality", desc: "Manufacturing high-quality Laser & MFP solutions for every scale." }
  ];

  const certifications = [
    { title: "CWC Trademark", desc: "Trademark certification legally protects a brand name or logo and establishes the company's ownership and identity in the market." },
    { title: "Factory License", desc: "A Factory License is issued by the government allowing a manufacturing unit to legally operate while ensuring worker safety and compliance with factory regulations." },
    { title: "BEE License", desc: "BEE certification from the Bureau of Energy Efficiency ensures that electrical products meet defined energy efficiency standards." },
    { title: "WPC – ETA", desc: "WPC Equipment Type Approval (ETA) is issued by the Wireless Planning & Coordination Wing for wireless devices to legally operate in India." },
    { title: "NABL LAB", desc: "NABL accreditation ensures that laboratories provide accurate and reliable testing or calibration results as per international standards." },
    { title: "LMPC Certificate", desc: "License issued by the Department of Consumer Affairs under Legal Metrology (Packaged Commodity). The Act governs trade in goods sold or distributed by weight, measure, or number." },
    { title: "BIS", desc: "BIS is the National Standard Body of India responsible for standardization, marking, and quality certification." },
    { title: "ZED", desc: "ZED certification promotes quality manufacturing and environmental sustainability, encouraging zero defects and zero adverse environmental effects." },
    { title: "MPCB", desc: "MPCB License is issued by the Maharashtra Pollution Control Board to ensure businesses comply with environmental regulations and control pollution." },
    { title: "CPCB", desc: "CPCB (Central Pollution Control Board) regulates and monitors environmental issues, enforcing laws and standards to control pollution in India." },
    { title: "FCC", desc: "FCC certification confirms that electronic devices comply with electromagnetic interference standards required for products sold in the United States." },
    { title: "CE", desc: "CE marking indicates that a product meets safety, health, and environmental protection standards required for sale in the European Economic Area." },
    { title: "RoHS", desc: "RoHS certification restricts the use of hazardous substances in electronic and electrical equipment to promote environmental safety." },
    { title: "ISO 9001", desc: "ISO 9001 is an international standard that defines requirements for a quality management system to ensure consistent product quality." },
    { title: "ISO 14001", desc: "ISO 14001 specifies requirements for an environmental management system to help organizations minimize environmental impact." },
    { title: "ISO 14401", desc: "ISO 14401 relates to environmental management standards aimed at improving sustainability practices in organizations." },
    { title: "ISO 19752", desc: "ISO 19752 is an international standard used to measure the page yield of monochrome laser printer toner cartridges." },
    { title: "ISO 20000-1", desc: "ISO 20000-1 is an international standard for IT Service Management that ensures efficient delivery of IT services." },
    { title: "ISO 20690", desc: "ISO 20690 defines performance and reliability standards for imaging equipment used in professional environments." },
    { title: "ISO 24790", desc: "ISO 24790 provides standardized methods for measuring performance and reliability of imaging devices." },
    { title: "ISO 24734", desc: "ISO 24734 defines the method for measuring productivity and print speed of office printing devices." },
    { title: "ISO 27001", desc: "ISO 27001 is an international standard for establishing and maintaining an Information Security Management System (ISMS)." },
    { title: "ISO 45001", desc: "ISO 45001 specifies requirements for an occupational health and safety management system to improve workplace safety." },
    { title: "ISO 50001", desc: "ISO 50001 helps organizations improve energy efficiency through an effective energy management system." },
    { title: "CMMI Maturity Level 3", desc: "CMMI Level 3 certification indicates that an organization follows well-defined and standardized processes for development and management." }
  ];

  const mvItems = [
    {
      num: "01",
      tag: "Mission",
      icon: <Lightbulb className="w-52 h-52" strokeWidth={0.4} />,
      title: "Our Mission",
      text: "Design, manufacture & deliver top-quality printers to customers in India and worldwide — providing reliable, efficient printing solutions while contributing to the growth of India's printing industry."
    },
    {
      num: "02",
      tag: "Vision",
      icon: <Target className="w-52 h-52" strokeWidth={0.4} />,
      title: "Our Vision",
      text: "Revolutionize the printing industry in India and become a global leader in laser printer manufacturing — delivering innovative products exceeding expectations with sustainability at our core."
    }
  ];

  return (
    <div ref={sectionRef} className="bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">

      {/* --- HERO SECTION --- */}
      <section className="py-32 overflow-hidden relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-16 lg:gap-24">

            {/* IMAGE CONTAINER */}
            <div className={`flex-1 w-full relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
              <div className="absolute top-8 right-8 bottom-[-8px] left-8 bg-white dark:bg-brand-darkCard rounded-[2.5rem] shadow-3d border border-brand-secondary/70 dark:border-gray-800 transform rotate-[6deg] z-0" />
              <div className="relative z-10 w-full max-w-[520px] mx-auto lg:mx-0 bg-white dark:bg-brand-darkCard rounded-[2.2rem] p-3 shadow-2xl border border-brand-secondary dark:border-gray-800 overflow-hidden transform transition-all duration-700 hover:scale-[1.02]">
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group">
                  <img src="/images/main.jpg" alt="CWC Innovation" className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-text/90 via-transparent to-transparent opacity-80" />
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
              <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white dark:bg-brand-darkCard p-1 rounded-full shadow-3d animate-float z-20 border border-brand-secondary dark:border-gray-700">
                <div className="bg-gradient-to-br from-brand-accent to-brand-highlight text-white p-5 md:p-7 rounded-full text-center min-w-[120px]">
                  <p className="text-2xl md:text-4xl font-black leading-none">100%</p>
                  <p className="text-[9px] uppercase font-bold tracking-[0.1em] mt-1">Make In India</p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
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
            </div>
          </div>
        </div>
      </section>

     {/* --- MISSION / VISION / AIMS SECTION --- */}
{/* --- MISSION / VISION / AIMS SECTION --- */}
<section className="py-24 bg-brand-secondary/40 dark:bg-brand-darkBg transition-colors duration-500">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Header — sits on light/dark PAGE background, so uses normal text tokens */}
    <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
        <Lightbulb className="w-3 h-3" /> Who We Are
      </div>
      <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-brand-darkText tracking-tighter mb-3">
        Our <span className="text-brand-accent">Purpose</span> & Direction
      </h2>
      <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">
        Driven by innovation, guided by precision, built for India.
      </p>
    </div>

    {/* Mission + Vision Cards */}
    {/* NOTE: These cards are ALWAYS dark (brand-text = #052e16 / darkCard = #0A0A0A)       */}
    {/* So ALL text inside must use white-based or darkAccent tokens — never brand-accent    */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
      {mvItems.map((item, i) => (
        <div
          key={i}
          className={`relative bg-brand-text dark:bg-brand-darkCard rounded-[1.75rem] overflow-hidden p-9 min-h-[300px] flex flex-col justify-end transition-all duration-700 hover:scale-[1.02] hover:shadow-2xl group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          style={{ transitionDelay: `${i * 120}ms` }}
        >
          {/* Top accent bar — brand-accent is visible as a thin line regardless */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-accent via-brand-highlight to-transparent" />

          {/* Subtle bottom glow */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-accent/10 to-transparent pointer-events-none" />

          {/* Number pill — always on dark bg, so white/dim */}
          <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-white/[0.08] flex items-center justify-center text-[10px] font-black text-white/20">
            {item.num}
          </div>

          {/* Ghost background icon */}
          <div className="absolute -right-5 -top-5 text-white/[0.04] pointer-events-none">
            {item.icon}
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Tag pill: always on dark card → use darkAccent (#59FF73) always */}
            <div className="inline-flex items-center gap-1.5 bg-brand-darkAccent/15 text-brand-darkAccent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-4 border border-brand-darkAccent/20">
              {item.tag}
            </div>
            {/* Heading: always white on dark card */}
            <h3 className="text-white font-black text-xl uppercase tracking-[0.1em] mb-3">
              {item.title}
            </h3>
            {/* Body: muted white */}
            <p className="text-white/55 text-[11.5px] font-semibold leading-[1.9] tracking-[0.02em]">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>

    {/* CWC Aims — Full Width, also always dark */}
    <div
      className={`relative bg-brand-text dark:bg-brand-darkCard rounded-[1.75rem] overflow-hidden px-8 md:px-16 py-14 flex flex-col items-center text-center transition-all duration-700 hover:scale-[1.005] hover:shadow-2xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: '240ms' }}
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

      {/* Bottom ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-20 bg-brand-accent/10 blur-2xl pointer-events-none rounded-full" />

      {/* Ghost background icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.035] pointer-events-none">
        <Target className="w-80 h-80" strokeWidth={0.4} />
      </div>

      {/* Dot row — accent color for center dot */}
      <div className="flex gap-2.5 mb-6" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(j => (
          <div
            key={j}
            className={`h-1.5 rounded-full transition-all ${j === 2 ? 'w-6 bg-brand-accent' : 'w-1.5 bg-brand-accent/30'}`}
          />
        ))}
      </div>

      {/* Tag pill: always on dark card → darkAccent */}
      <div className="inline-flex items-center gap-1.5 bg-brand-darkAccent/15 text-brand-darkAccent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] mb-5 border border-brand-darkAccent/20">
        CWC Aims
      </div>

      {/* Heading */}
      <h3 className="text-white font-black text-xl uppercase tracking-[0.15em] mb-5">
        'CWC Aims'
      </h3>

      {/* Body */}
      <p className="text-white/55 text-[12px] font-semibold leading-[1.9] tracking-[0.02em] max-w-3xl">
        CWC offers top-quality, Made-in-India laser printers and multifunction devices for the Indian market,
        government e-marketplace, large corporations, and small businesses. We support the 'Make in India'
        initiative by developing and manufacturing our products locally.
      </p>
    </div>

  </div>
</section>

      {/* --- CERTIFICATIONS SECTION --- */}
      <section className="py-24 bg-white dark:bg-brand-darkCard transition-colors duration-500 border-y border-brand-secondary dark:border-gray-800 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
              <Award className="w-3 h-3" /> Quality Assured
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
              Our <span className="text-brand-accent">Certifications</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              We adhere to global standards of safety, quality, and environmental sustainability.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <div
                key={i}
                className={`p-6 rounded-3xl border border-brand-secondary dark:border-gray-800 bg-brand-primary dark:bg-brand-darkBg/50 transition-all duration-500 hover:shadow-3d hover:border-brand-accent/40 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-brand-darkCard flex items-center justify-center text-brand-accent border border-brand-secondary dark:border-gray-800 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-brand-text dark:text-white text-sm">{cert.title}</h4>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  {cert.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Contact for soft copy */}
          <div className="mt-16 p-8 rounded-[2.5rem] bg-brand-text dark:bg-brand-darkCard flex flex-col md:flex-row items-center justify-between gap-6 shadow-3d border border-brand-secondary/20 transition-all hover:scale-[1.01]">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-brand-accent rounded-2xl flex items-center justify-center text-white">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold">Need official soft copies?</h4>
                <p className="text-gray-400 text-xs">Request our complete certification portfolio via email.</p>
              </div>
            </div>
            <a href="mailto:info@ecompusell.com" className="bg-white text-brand-text px-8 py-3 rounded-xl font-black text-xs hover:bg-brand-accent hover:text-white transition-all uppercase tracking-widest">
              Request Documents
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}