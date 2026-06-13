import { Zap, Shield, Award, Printer } from 'lucide-react';

const trustItems = [
  { icon: Zap,     label: "Ultra-Fast",  desc: "Up to 55 PPM" },
  { icon: Shield,  label: "Secure",      desc: "End-to-end Encrypt" },
  { icon: Award,   label: "Certified",   desc: "OEM Standards" },
  { icon: Printer, label: "Eco-Friendly", desc: "Low Energy Mode" },
];

export default function TrustBar() {
  return (
    <section className="py-12 border-y border-brand-secondary dark:border-gray-800 bg-white dark:bg-brand-darkCard/30">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
        {trustItems.map((item, i) => (
          <div key={i} className="flex items-center gap-4 group">
            <div className="p-3 bg-brand-primary dark:bg-gray-800 rounded-xl group-hover:bg-brand-accent transition-colors">
              <item.icon className="w-6 h-6 text-brand-accent group-hover:text-white" />
            </div>
            <div>
              <p className="font-bold text-brand-text dark:text-brand-darkText">{item.label}</p>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
