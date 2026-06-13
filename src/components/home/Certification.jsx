import React from 'react';

const certifications = [
  { label: "BIS Licensed", sub: "Bureau of Indian Standards" },
  { label: "RoHS", sub: "Compliant" },
  { label: "FCC", sub: "Certified" },
  { label: "CE Mark", sub: "European" },
  { label: "ETA-WPC", sub: "Wireless" },
  { label: "ZED", sub: "Zero Defect" },
  { label: "Startup India", sub: "DPIIT" },
  { label: "NSIC", sub: "Certified" },
  { label: "Make In India", sub: "🇮🇳" },
  { label: "ISO 9001:2015", sub: "Quality" },
  { label: "ISO 14001", sub: "Environment" },


  
];

const scrollList = [...certifications, ...certifications];

export default function Certification() {
  return (
    <section className="bg-brand-primary dark:bg-brand-darkBg overflow-hidden">
      <div className="relative flex items-center py-3">

        <div className="absolute inset-y-0 left-0 w-24 z-20 pointer-events-none bg-gradient-to-r from-brand-primary dark:from-brand-darkBg to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-20 pointer-events-none bg-gradient-to-l from-brand-primary dark:from-brand-darkBg to-transparent" />

        <div className="flex w-max animate-infinite-scroll hover:[animation-play-state:paused]">
          {scrollList.map((cert, index) => (
            <React.Fragment key={index}>
              <span
                aria-hidden="true"
                className="flex-shrink-0 inline-block rounded-sm"
                style={{ width: '3px', height: '16px', backgroundColor: '#e5000a', margin: '0 18px' }}
              />
              <div className="flex items-baseline gap-1.5 flex-shrink-0" style={{ whiteSpace: 'nowrap' }}>
                <span
                  className="text-brand-text dark:text-brand-darkText uppercase tracking-widest"
                  style={{ fontSize: '14px', fontWeight: '700' }}
                >
                  {cert.label}
                </span>
                <span
                  className="text-brand-text/60 dark:text-brand-darkText/50"
                  style={{ fontSize: '14px', fontWeight: '400', letterSpacing: '0.02em' }}
                >
                  {cert.sub}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

      </div>
    </section>
  );
}