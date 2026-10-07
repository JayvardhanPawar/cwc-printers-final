import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async'; // FIX 1: Helmet was used but never imported
import { Plus } from 'lucide-react';
import HeroSlider from '../components/HeroSlider';
import TrustBar from '../components/home/TrustBar';
import FeaturedProducts from '../components/home/FeaturedProducts';
import SupportHub from '../components/home/SupportHub';
import Certification from '../components/home/Certification';
import AboutUs from '../components/home/AboutUs';
import MakeInIndiaBanner from '../components/home/Makeinindiabanner';
import CertificationsSection from '../components/home/Certificationssection';
import ProductSpotlight from '../components/home/Productspotlight';
import ConsumablesSection from '../components/home/Consumablessection';
import NationwidePresence from '../components/home/Nationwidepresence';
import SectionDivider from '../components/SectionDivider';
import AutoPlayVideo from '../components/AutoPlayVideo';
import SeoKeywordsBlock from '../components/SeoKeywordsBlock';

/* ---- FAQ DATA: change only this array on every page ---- */
const faqs = [
  {
    question: 'What printers does E-Compusell make?',
    answer: 'E-Compusell makes printers for home, office and business use, including A4 multifunction printers, A4 all-in-one printers, A3 printers and laser printers. E-Compusell also makes cartridges and toners for its printers.'
  },
  {
    question: 'What is an A4 multifunction printer?',
    answer: 'An A4 multifunction printer is one machine that can print, scan and copy. It is useful for homes, small offices, schools and shops. An A4 all-in-one printer refers to the same type of multifunction device.'
  },
  {
    question: 'What is an ADF multifunction printer?',
    answer: 'ADF means Auto Document Feeder. It automatically pulls pages into the printer one by one, making it easier to scan or copy multiple pages without placing each page manually.'
  },
  {
    question: 'Which printer is good if I have little space?',
    answer: 'A compact laser printer is a good choice when you have limited space. It is small, fast and produces clear text. If you also need scanning and copying, choose a compact multifunction laser printer.'
  },
  {
    question: 'Does a laser printer use ink?',
    answer: 'No. A laser printer uses toner, which is a fine powder, instead of liquid ink. If you are looking for laser printer ink, you usually need a toner cartridge that matches your printer model.'
  },
  {
    question: 'Can I print photos on a laser printer?',
    answer: 'Yes. A colour laser printer can print photos, graphics and other colour documents. However, laser printers are generally designed mainly for document printing, so check the colour support and print quality before choosing a model for photos.'
  },
  {
    question: 'Is this the official CWC printer site?',
    answer: 'Yes. E-Compusell designs and sells CWC printers directly. Prices and stock availability can change, so contact E-Compusell for the latest CWC printer price and availability.'
  },
  {
    question: 'Which CWC printer models can I buy?',
    answer: 'You can choose from CWC printer models such as the CWC 3336, CWC 4055 and CWC P310. Compare their features, printing speed and capabilities to find the model that suits your requirements.'
  },
  {
    question: 'Does E-Compusell sell CWC cartridges and toners?',
    answer: 'Yes. E-Compusell makes CWC printer cartridges and toners for its printers. Always check your printer model before ordering to ensure you select the correct cartridge or toner.'
  },
  {
    question: 'How should I choose a printer?',
    answer: 'Start by considering how many pages you print, whether you need A3 printing, whether you need colour or black-and-white printing, and whether scanning, copying or an ADF is required. You should also consider the annual toner cost, as the cheapest printer may not always be the most economical to operate.'
  }
];

/* FIX 3: FAQ schema is now generated from the same array, so it always matches the visible FAQ */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer
    }
  }))
};

/* Reusable hook: becomes true once the element scrolls into view */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

export default function Home() {
  const [heroRef, isVisible] = useInView(0.1);
  const [faqRef, faqVisible] = useInView(0.1);
  const [openFaq, setOpenFaq] = useState(-1);

  return (
    // FIX 2: two sibling root elements (Helmet + div) need a wrapper
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="bg-brand-primary dark:bg-brand-darkBg overflow-hidden">

        {/* HERO SLIDER SECTION */}
        <section
          ref={heroRef}
          className="relative pt-16 lg:pt-20 lg:pb-12 lg:px-4 xl:px-8"
        >
          {/* Ambient blobs — desktop only */}
          <div className="hidden lg:block absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-brand-accent/10 rounded-full blur-[100px]" />
          </div>

          <div className="max-w-screen-2xl mx-auto relative z-10">
            <HeroSlider isVisible={isVisible} />
          </div>
        </section>

        <SectionDivider />
        <TrustBar />

        <SectionDivider />
        <AboutUs />

        <div className="w-full">
          <AutoPlayVideo
            src="/videos/hero.mp4"
            poster="/images/hero-poster.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        <SectionDivider />
        <Certification />
        <SectionDivider />
        <FeaturedProducts />
        <SectionDivider />
        <ProductSpotlight />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ConsumablesSection />
        <SectionDivider />
        <SupportHub />
        <SectionDivider />
        <MakeInIndiaBanner />
        <SectionDivider />
        <NationwidePresence />
        <SectionDivider />

        {/* ================= FAQ ================= */}
       {/* ================= FAQ ================= */}
<section ref={faqRef} className="py-20 md:py-24 bg-gray-50 dark:bg-brand-darkBg">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Header: stacked, left-aligned */}
    <div
      className={`mb-12 md:mb-16 transition-all duration-700 ${
        faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <p className="text-green-600 dark:text-brand-darkAccent text-sm font-bold uppercase tracking-[0.2em] mb-6">
        Frequently asked questions
      </p>
      <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-[1.1] max-w-2xl">
        Quick answers to
        <br />
        common questions.
      </h2>
    </div>

    {/* Two-column pill cards, filled row by row */}
    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 items-start">
      {faqs.map((item, i) => {
        const open = openFaq === i;
        return (
          <div
            key={i}
            className={`rounded-[2rem] border bg-white dark:bg-brand-darkCard/50 transition-all duration-300 ${
              open
                ? 'border-gray-300 dark:border-gray-600 shadow-sm'
                : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
            } ${faqVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            <button
              type="button"
              onClick={() => setOpenFaq(open ? -1 : i)}
              aria-expanded={open}
              className="w-full flex items-center justify-between gap-6 text-left px-8 py-7 rounded-[2rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50"
            >
              <span className="font-medium text-gray-900 dark:text-white text-base md:text-lg leading-snug">
                {item.question}
              </span>
              <Plus
                className={`shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-300 ${
                  open ? 'rotate-45' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-8 pb-7 text-sm md:text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>

  </div>
</section>
        <SeoKeywordsBlock />
      </div>
    </>
  );
}