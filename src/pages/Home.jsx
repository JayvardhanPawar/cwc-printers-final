import { useEffect, useRef, useState } from 'react';
import HeroSlider from '../components/HeroSlider';
import TrustBar from '../components/home/TrustBar';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CTASection from '../components/CTASection';
import SupportHub from '../components/home/SupportHub';
import Certification from '../components/home/Certification';
import AboutUs from '../components/home/AboutUs';
import MakeInIndiaBanner from '../components/home/Makeinindiabanner';
import CertificationsSection from '../components/home/Certificationssection';
import ProductSpotlight from '../components/home/Productspotlight';
import ConsumablesSection from '../components/home/Consumablessection';
import NationwidePresence from '../components/home/Nationwidepresence';
import SectionDivider from '../components/SectionDivider';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);

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
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
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
     
      {/* <CTASection />   */}
      <SectionDivider />  
      <AboutUs />
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
    </div>
  );
}


// Hero Section
// Certificates
// Products
// SpotLight Product
// 24 Certificates	
// Consumables
// Service
// Make In India
// Nationwise 
// Footer
