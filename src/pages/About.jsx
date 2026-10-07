import React, { useEffect, useRef, useState } from 'react';
import {
  MapPin, Printer, Trophy, Wrench, Sprout, Zap, FileText as FileIcon, Languages, Plus
} from 'lucide-react';
import CtaBanner from '../components/Ctabanner';

/* ------------------------------------------------------------------ */
/*  Small helper: fade/slide-up on scroll                              */
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
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const heroBadges = [
  { label: 'ISO 9001:2015', sub: 'Quality Management', color: 'text-brand-darkAccent' },
  { label: 'BIS Licensed', sub: 'Bureau of Indian Standards', color: 'text-orange-400' },
  { label: 'ISO 27001:2022', sub: 'Information Security', color: 'text-sky-400' },
  { label: 'Make in India \uD83C\uDDEE\uD83C\uDDF3', sub: 'Atmanirbhar Bharat', color: 'text-brand-darkAccent' },
  { label: 'ZED Certified', sub: 'Zero Defect Zero Effect', color: 'text-orange-400' },
  { label: 'GeM Registered', sub: 'Government e-Marketplace', color: 'text-white' },
];

/* ---- FAQ DATA: change only this array on every page ---- */
// const faqs = [
//   { question: 'Who is behind the CWC printer brand?', answer: 'CWC is a brand of E-Compusell Limited, founded in 2014 and headquartered in Pune, Maharashtra.' },
//   { question: 'Are CWC printers really made in India?', answer: 'Yes. Every CWC printer is designed, engineered and assembled in India.' },
//   { question: 'Which certifications does CWC hold?', answer: 'We hold 24+ national and international certifications including ISO 9001, ISO 27001, BIS, RoHS, ZED, FCC and CE.' },
//   { question: 'Which states do you provide service in?', answer: 'We have authorised service centres across 14 states, with support in 11 languages.' },
// ];

const heroStats = [
  { value: '24+', label: 'Certifications' },
  { value: '14+', label: 'States Served' },
  { value: '16', label: 'Printer Models' },
];

const timeline = [
  {
    year: '2014', tone: 'light', title: 'Founded in Pune',
    text: "E-Compusell Limited incorporated in Pune, Maharashtra with a mission to bring world-class, Made-in-India printing solutions to Indian offices. First office at Shivajinagar."
  },
  {
    year: '2015', tone: 'dark', title: 'First CWC Printer Launched',
    text: "The first CWC-branded laser printer rolled out of our facility — designed, engineered and assembled in India. Instantly adopted by government departments across Maharashtra."
  },
  {
    year: '2017', tone: 'light', title: 'ISO 9001 Certification & Pan-India Expansion',
    text: "Achieved ISO 9001:2015 certification — the first Indian printer brand to do so at this stage. Expanded service network to 8 states including Delhi, Gujarat, and Karnataka."
  },
  {
    year: '2019', tone: 'dark', title: 'GeM Registration & Government Contracts',
    text: "Registered on Government e-Marketplace (GeM). Secured major supply contracts with central government ministries and state government departments across India."
  },
  {
    year: '2020', tone: 'light', title: 'Atmanirbhar Bharat Recognition',
    text: "Recognised under the Atmanirbhar Bharat initiative. Awarded Startup India certification by DPIIT. Expanded product range to 12 models to serve every Indian office segment."
  },
  {
    year: '2022', tone: 'dark', title: 'ZED Certification & 14-State Network',
    text: "Achieved ZED (Zero Defect Zero Effect) certification. Established authorised service centres across 14 states. Launched an 11-language support helpline — a first in Indian printing."
  },
  {
    year: '2024', tone: 'light', title: '24 Certifications. 16 Models. Growing.',
    text: "Today CWC holds 24 national and international certifications — more than any Indian printer brand. With 16 models from A4 MFP to A3 enterprise, we serve offices from J&K to Andaman."
  },
];

const mv = [
  {
    icon: '\uD83C\uDFAF', title: 'Our Mission', bar: 'from-orange-500',
    text: "To make world-class, reliable printing technology accessible to every Indian office — from a government bureau in Srinagar to a startup in Kochi — at a fair price, with service that never lets you down.",
    quote: '"Quality is not an act, it is a habit — and we\'ve built 24 certifications on that habit."'
  },
  {
    icon: '\uD83D\uDC41\uFE0F', title: 'Our Vision', bar: 'from-green-500',
    text: "To be India's most trusted printer brand — not just by sales volume, but by the depth of trust each customer places in us. A printer in every Indian office, made in India, supported by India.",
    quote: '"Desh Ki Samrudhi, Dil Se Swadeshi — the prosperity of the nation, through the heart of Swadeshi."'
  },
  {
    icon: '\uD83D\uDC8E', title: 'Our Values', bar: 'from-blue-500',
    text: "Quality without compromise. Transparency in every transaction. Respect for every customer's language and culture. Accountability when things go wrong. Continuous improvement in everything we do.",
    quote: '"We don\'t just sell printers. We build relationships that last longer than any warranty."'
  },
];

const impactStats = [
  { icon: <Printer className="w-7 h-7" />, value: '16', label: 'Printer models across A3, A4, MFP & SFP' },
  { icon: <Trophy className="w-7 h-7" />, value: '24+', label: 'National & international certifications held' },
  { icon: <MapPin className="w-7 h-7" />, value: '14', label: 'States with authorised service centres' },
  { icon: <Languages className="w-7 h-7" />, value: '11', label: 'Languages our support team speaks' },
  { icon: <FileIcon className="w-7 h-7" />, value: '55', accent: true, label: 'Max pages per minute (CWC 4055)' },
  { icon: <Zap className="w-7 h-7" />, value: '150K', label: 'Monthly duty cycle on flagship model' },
  { icon: <Wrench className="w-7 h-7" />, value: '10+', label: 'Years of manufacturing excellence in India' },
  { icon: <Sprout className="w-7 h-7" />, value: '0', label: 'Defects target — ZED certified manufacturing' },
];

const certFilters = ['All', 'ISO Standards', 'India', 'International', 'Environment'];

const certifications = [
  { title: "ISO 9001:2015", emoji: "\uD83C\uDFC5", tag: "ISO Standards", desc: "Quality Management Systems — the global gold standard for manufacturing quality." },
  { title: "ISO 14001:2015", emoji: "\uD83C\uDF3F", tag: "Environment", desc: "Environmental Management System. Committed to minimising our ecological footprint." },
  { title: "ISO 27001:2022", emoji: "\uD83D\uDD12", tag: "ISO Standards", desc: "Information Security Management — securing customer data at every level." },
  { title: "ISO 45001:2018", emoji: "\uD83E\uDDBA", tag: "ISO Standards", desc: "Occupational Health & Safety. Zero-harm workplace for all our manufacturing staff." },
  { title: "ISO 14401", emoji: "\uD83C\uDF31", tag: "ISO Standards", desc: "Environmental management standards aimed at improving sustainability practices." },
  { title: "ISO 19752", emoji: "\uD83D\uDCC4", tag: "ISO Standards", desc: "Used to measure the page yield of monochrome laser printer toner cartridges." },
  { title: "ISO 20000-1", emoji: "\uD83D\uDCBB", tag: "ISO Standards", desc: "IT Service Management standard ensuring efficient delivery of IT services." },
  { title: "ISO 20690", emoji: "\u2699\uFE0F", tag: "ISO Standards", desc: "Performance and reliability standards for imaging equipment." },
  { title: "ISO 24790", emoji: "\uD83D\uDCCA", tag: "ISO Standards", desc: "Standardized methods for measuring performance of imaging devices." },
  { title: "ISO 24734", emoji: "\u23F1\uFE0F", tag: "ISO Standards", desc: "Defines the method for measuring productivity and print speed." },
  { title: "ISO 50001", emoji: "\u26A1", tag: "ISO Standards", desc: "Helps organizations improve energy efficiency through an energy management system." },
  { title: "CWC Trademark", emoji: "\u00AE\uFE0F", tag: "India", desc: "Legally protects the CWC brand name and establishes ownership in the market." },
  { title: "Factory License", emoji: "\uD83C\uDFED", tag: "India", desc: "Issued by the government allowing legal manufacturing with worker safety compliance." },
  { title: "BEE License", emoji: "\uD83D\uDD0B", tag: "India", desc: "Bureau of Energy Efficiency certification for defined energy standards." },
  { title: "WPC – ETA", emoji: "\uD83D\uDCE1", tag: "India", desc: "Equipment Type Approval for wireless devices to legally operate in India." },
  { title: "NABL LAB", emoji: "\uD83E\uDDEA", tag: "India", desc: "Ensures labs provide accurate, reliable testing per international standards." },
  { title: "LMPC Certificate", emoji: "\u2696\uFE0F", tag: "India", desc: "Legal Metrology license governing trade of goods by weight, measure or number." },
  { title: "BIS", emoji: "\u2705", tag: "India", desc: "National Standard Body of India for standardization and quality certification." },
  { title: "MPCB", emoji: "\uD83C\uDF0D", tag: "Environment", desc: "Maharashtra Pollution Control Board license ensuring pollution compliance." },
  { title: "CPCB", emoji: "\u267B\uFE0F", tag: "Environment", desc: "Central Pollution Control Board — monitors and enforces pollution standards." },
  { title: "RoHS", emoji: "\uD83C\uDF31", tag: "Environment", desc: "Restricts hazardous substances in electronic and electrical equipment." },
  { title: "ZED", emoji: "\uD83C\uDFC6", tag: "Environment", desc: "Promotes zero defect, zero adverse environmental effect manufacturing." },
  { title: "FCC", emoji: "\uD83C\uDDFA\uD83C\uDDF8", tag: "International", desc: "Confirms devices comply with US electromagnetic interference standards." },
  { title: "CE", emoji: "\uD83C\uDDEA\uD83C\uDDFA", tag: "International", desc: "Marking that products meet EEA safety, health & environmental standards." },
  { title: "CMMI Maturity Level 3", emoji: "\uD83D\uDCC8", tag: "International", desc: "Indicates the organization follows standardized development processes." },
];

const manufacturingBadges = [
  '\uD83C\uDDEE\uD83C\uDDF3 Make in India', '\u26A1 Atmanirbhar Bharat', '\uD83D\uDE80 Vocal for Local', '\uD83C\uDFED ZED Manufacturing', '\u267B\uFE0F RoHS Compliant'
];

const manufacturingStats = [
  { value: '100%', label: 'Assembled in India' },
  { value: '0', label: 'Defect Target (ZED)' },
  { value: '10+', label: 'Years Manufacturing' },
  { value: '16', label: 'Models Produced' },
];

const partners = [
  { emoji: '\uD83C\uDFDB\uFE0F', label: 'Central Government Ministries' },
  { emoji: '\uD83C\uDFE2', label: 'State Government Departments' },
  { emoji: '\uD83C\uDFE6', label: 'Nationalised Banks' },
  { emoji: '\uD83C\uDF93', label: 'Universities & IITs' },
  { emoji: '\uD83C\uDFE5', label: 'Government Hospitals' },
  { emoji: '\u2696\uFE0F', label: 'District Courts' },
  { emoji: '\uD83D\uDE82', label: 'Indian Railways' },
  { emoji: '\uD83D\uDEE1\uFE0F', label: 'Defence Establishments' },
  { emoji: '\uD83C\uDFE2', label: 'SMEs & Startups' },
  { emoji: '\uD83C\uDFED', label: 'Manufacturing Industries' },
  { emoji: '\uD83D\uDCEE', label: 'India Post' },
  { emoji: '\uD83C\uDF10', label: 'IT Companies' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export default function About() {
  const [heroRef, heroVisible] = useReveal();
  const [journeyRef, journeyVisible] = useReveal();
  const [mvRef, mvVisible] = useReveal();
  const [impactRef, impactVisible] = useReveal();
  const [certRef, certVisible] = useReveal();
  const [mfgRef, mfgVisible] = useReveal();
  const [partnersRef, partnersVisible] = useReveal();
  const [faqRef, faqVisible] = useReveal();        // FAQ reveal
  const [openFaq, setOpenFaq] = useState(0);       // FAQ open item (-1 = all closed)

  const [activeFilter, setActiveFilter] = useState('All');
  const filteredCerts = activeFilter === 'All'
    ? certifications
    : certifications.filter(c => c.tag === activeFilter);

  return (
    <div className="bg-white dark:bg-brand-darkBg transition-colors duration-500">

      {/* ================= HERO ================= */}
      <section ref={heroRef} className="relative overflow-hidden bg-brand-text dark:bg-black py-24 md:py-32">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-brand-darkAccent/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className={`transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.25em] mb-6">
                E-Compusell Limited · Founded 2014 · Pune, India
              </p>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6">
                India's Most<br />
                <span className="text-brand-darkAccent italic font-serif font-bold">Certified</span><br />
                Printer Brand.
              </h1>
              <p className="text-white/50 text-base leading-relaxed max-w-md mb-10 font-medium">
                We didn't just build printers. We built trust — across 14 states, in 11 languages, with 24 certifications that no other Indian printer brand holds.
              </p>
              <div className="grid grid-cols-3 divide-x divide-white/10 border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                {heroStats.map((s, i) => (
                  <div key={i} className="px-4 py-6 text-center">
                    <p className="text-2xl md:text-3xl font-black text-white">
                      {s.value.includes('+') ? (
                        <>{s.value.replace('+', '')}<span className="text-orange-400">+</span></>
                      ) : s.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative min-h-[420px] hidden lg:block transition-all duration-1000 delay-200 ${heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              {[
                { top: '2%', left: '18%' }, { top: '20%', left: '68%' },
                { top: '38%', left: '2%' }, { top: '52%', left: '58%' },
                { top: '68%', left: '20%' }, { top: '80%', left: '58%' },
              ].map((pos, i) => (
                <div
                  key={i}
                  style={{ ...pos, transitionDelay: `${i * 90}ms` }}
                  className={`absolute bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-2xl px-5 py-3 transition-all duration-700 hover:bg-white/[0.08] ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                >
                  <p className={`text-sm font-black ${heroBadges[i].color}`}>{heroBadges[i].label}</p>
                  <p className="text-white/40 text-[11px] font-medium">{heroBadges[i].sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= JOURNEY ================= */}
      <section ref={journeyRef} className="py-24 bg-white dark:bg-brand-darkBg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 ${journeyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brand-darkAccent text-[11px] font-black uppercase tracking-[0.25em] mb-3">Our Journey</p>
            <h2 className="text-4xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
              A decade of printing<br />India's future.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl">
              From a single office in Pune to a pan-India network — every step driven by one idea: India deserves world-class printers, made right here.
            </p>
          </div>

          <div className="relative mt-16 pl-8 md:pl-10">
            <div className="absolute left-8 md:left-10 top-2 bottom-2 w-px bg-gray-200 dark:bg-gray-800" />
            <div className="space-y-6">
              {timeline.map((item, i) => (
                <div
                  key={i}
                  className={`relative transition-all duration-700 ${journeyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <span className={`absolute -left-8 md:-left-10 top-8 w-2.5 h-2.5 rounded-full -translate-x-1/2 ${item.tone === 'dark' ? 'bg-orange-400' : 'bg-brand-darkAccent'} ring-4 ring-white dark:ring-brand-darkBg`} />
                  <div className={`rounded-[1.75rem] p-8 md:p-10 ${item.tone === 'dark' ? 'bg-brand-text dark:bg-brand-darkCard' : 'bg-gray-50 dark:bg-white/[0.03] border border-gray-100 dark:border-gray-800'}`}>
                    <p className={`text-xs font-black mb-2 ${item.tone === 'dark' ? 'text-orange-400' : 'text-brand-darkAccent'}`}>{item.year}</p>
                    <h3 className={`font-black text-xl md:text-2xl mb-3 ${item.tone === 'dark' ? 'text-white' : 'text-brand-text dark:text-white'}`}>{item.title}</h3>
                    <p className={`text-sm leading-relaxed font-medium ${item.tone === 'dark' ? 'text-white/55' : 'text-gray-500 dark:text-gray-400'}`}>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION / VISION / VALUES ================= */}
      <section ref={mvRef} className="py-24 bg-brand-text dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${mvVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-orange-400 text-[11px] font-black uppercase tracking-[0.25em] mb-3">Who We Are</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
              Purpose-driven<br />from day one.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-x-10 gap-y-10">
            {mv.map((item, i) => (
              <div
                key={i}
                className={`border-t-2 ${i === 0 ? 'border-orange-500' : i === 1 ? 'border-green-500' : 'border-blue-500'} pt-8 transition-all duration-700`}
                style={{ transitionDelay: `${i * 100}ms`, opacity: mvVisible ? 1 : 0, transform: mvVisible ? 'translateY(0)' : 'translateY(20px)' }}
              >
                <div className="text-4xl mb-5">{item.icon}</div>
                <h3 className="text-white font-black text-2xl mb-4">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed font-medium mb-6">{item.text}</p>
                <p className="text-white/70 italic text-sm font-medium border-t border-white/10 pt-5 leading-relaxed">{item.quote}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= IMPACT NUMBERS ================= */}
      <section ref={impactRef} className="py-24 bg-gray-50 dark:bg-brand-darkCard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-16 transition-all duration-700 ${impactVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brand-darkAccent text-[11px] font-black uppercase tracking-[0.25em] mb-3">By The Numbers</p>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter">
              Impact that speaks<br />for itself.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden bg-white dark:bg-brand-darkBg/40">
            {impactStats.map((s, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col items-center text-center gap-3 border-gray-200 dark:border-gray-800 ${i % 4 !== 3 ? 'md:border-r' : ''} ${i % 2 === 0 ? 'border-r' : ''} ${i < 4 ? 'border-b' : ''} transition-all duration-700`}
                style={{ transitionDelay: `${i * 60}ms`, opacity: impactVisible ? 1 : 0, transform: impactVisible ? 'translateY(0)' : 'translateY(16px)' }}
              >
                <div className="text-gray-400 dark:text-gray-500">{s.icon}</div>
                <p className={`text-3xl md:text-4xl font-black ${s.accent ? 'text-orange-500' : 'text-brand-text dark:text-white'}`}>{s.value}</p>
                <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-snug max-w-[140px]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATIONS ================= */}
      <section ref={certRef} className="py-24 bg-white dark:bg-brand-darkBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-2xl mb-10 transition-all duration-700 ${certVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brand-darkAccent text-[11px] font-black uppercase tracking-[0.25em] mb-3">Certifications & Compliance</p>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
              24 reasons to<br />trust CWC.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              More certifications than any Indian competitor. Every certification is a promise kept — to our customers, to the government, and to the planet.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 border-b border-gray-200 dark:border-gray-800 mb-10">
            {certFilters.map((f) => {
              const count = f === 'All' ? certifications.length : certifications.filter(c => c.tag === f).length;
              const active = activeFilter === f;
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`pb-3 text-sm font-bold transition-colors border-b-2 -mb-px ${
                    active
                      ? 'text-brand-text dark:text-white border-brand-text dark:border-white'
                      : 'text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300'
                  }`}
                >
                  {f}{f === 'All' ? ` (${count})` : ''}
                </button>
              );
            })}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredCerts.map((cert) => (
              <div
                key={cert.title}
                className="p-6 rounded-2xl bg-gray-50 dark:bg-brand-darkCard/50 border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md hover:border-brand-darkAccent/40"
              >
                <div className="text-2xl mb-3">{cert.emoji}</div>
                <h4 className="font-black text-brand-text dark:text-white text-sm mb-2">{cert.title}</h4>
                <p className="text-[12px] text-gray-500 dark:text-gray-400 leading-relaxed font-medium mb-4">{cert.desc}</p>
                <span className="inline-block text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-brand-darkAccent/10 text-green-700 dark:text-brand-darkAccent">
                  {cert.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MANUFACTURING ================= */}
      <section ref={mfgRef} className="py-24 bg-brand-text dark:bg-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className={`transition-all duration-700 ${mfgVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-orange-400 text-[11px] font-black uppercase tracking-[0.25em] mb-3">Manufacturing</p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-5">
                Made in India.<br />For India.
              </h2>
              <p className="text-white/50 font-medium leading-relaxed mb-8 max-w-md">
                Every CWC printer is designed, engineered, and assembled in India. Not assembled from imported kits — genuinely made here, with Indian hands and Indian expertise.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                {manufacturingBadges.map((b, i) => (
                  <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-bold">{b}</span>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
                {manufacturingStats.map((s, i) => (
                  <div key={i} className="bg-white/[0.03] p-6">
                    <p className="text-3xl font-black text-white">{s.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 font-bold mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative h-[420px] transition-all duration-1000 delay-150 ${mfgVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="absolute inset-0 bg-brand-darkAccent/5 rounded-[3rem] blur-2xl" />
              <div className="relative w-full h-full rounded-[2.5rem] border border-white/10 bg-white/[0.02] overflow-hidden">
                {[
                  { top: '22%', left: '46%', label: 'Delhi', type: 'region' },
                  { top: '48%', left: '38%', label: 'Mumbai', type: 'region' },
                  { top: '54%', left: '52%', label: 'Pune HQ', type: 'hq' },
                  { top: '12%', left: '30%', type: 'centre' }, { top: '20%', left: '60%', type: 'centre' },
                  { top: '32%', left: '20%', type: 'centre' }, { top: '38%', left: '68%', type: 'centre' },
                  { top: '62%', left: '22%', type: 'centre' }, { top: '68%', left: '46%', type: 'centre' },
                  { top: '76%', left: '58%', type: 'centre' },
                ].map((pt, i) => (
                  <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2" style={{ top: pt.top, left: pt.left }}>
                    <span className={`block rounded-full ${
                      pt.type === 'hq' ? 'w-3 h-3 bg-orange-400' : pt.type === 'region' ? 'w-2.5 h-2.5 bg-brand-darkAccent' : 'w-1.5 h-1.5 bg-sky-400/70'
                    }`} />
                    {pt.label && <span className="text-white/70 text-xs font-bold whitespace-nowrap">{pt.label}</span>}
                  </div>
                ))}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur border border-white/10 rounded-xl px-4 py-3 space-y-1.5">
                <p className="text-[11px] text-white/70 font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400" />Head Office (Pune)</p>
                <p className="text-[11px] text-white/70 font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-brand-darkAccent" />Regional Offices</p>
                <p className="text-[11px] text-white/70 font-semibold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400" />Service Centres (14)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section ref={partnersRef} className="py-24 bg-gray-50 dark:bg-brand-darkCard">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`max-w-2xl mb-14 transition-all duration-700 ${partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <p className="text-brand-darkAccent text-[11px] font-black uppercase tracking-[0.25em] mb-3">Partners & Recognitions</p>
            <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
              Trusted by institutions<br />that matter.
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium">
              From central ministries to top enterprises — CWC printers power the offices of India's most demanding institutions.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {partners.map((p, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-brand-darkBg/40 transition-all duration-500 hover:border-brand-darkAccent/40 hover:shadow-sm ${partnersVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="text-lg">{p.emoji}</span>
                <span className="font-bold text-brand-text dark:text-white text-sm whitespace-nowrap">{p.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* 
      {/* ================= FAQ ================= */}
      {/* <section ref={faqRef} className="py-24 bg-white dark:bg-brand-darkBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] gap-12 lg:gap-20">

            <div className={`lg:sticky lg:top-28 self-start transition-all duration-700 ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-brand-darkAccent text-[11px] font-black uppercase tracking-[0.25em] mb-3">FAQ</p>
              <h2 className="text-3xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
                Frequently asked<br />questions.
              </h2>
              <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm">
                Quick answers to the questions we hear most often.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((item, i) => {
                const open = openFaq === i;
                return (
                  <div
                    key={i}
                    className={`rounded-2xl border bg-gray-50 dark:bg-brand-darkCard/50 transition-all duration-500 ${
                      open ? 'border-brand-darkAccent/40 shadow-md' : 'border-gray-200 dark:border-gray-800 hover:border-brand-darkAccent/30'
                    } ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? -1 : i)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between gap-6 text-left px-6 md:px-8 py-5 md:py-6"
                    >
                      <span className="font-black text-brand-text dark:text-white text-sm md:text-base leading-snug">{item.question}</span>
                      <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                        open ? 'bg-brand-darkAccent text-black border-brand-darkAccent rotate-45' : 'border-gray-200 dark:border-gray-700 text-gray-400'
                      }`}>
                        <Plus className="w-4 h-4" />
                      </span>
                    </button>
                    <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 md:px-8 pb-6 text-sm leading-relaxed font-medium text-gray-500 dark:text-gray-400">{item.answer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </section>  */}

      <CtaBanner />
    </div>
  );
}