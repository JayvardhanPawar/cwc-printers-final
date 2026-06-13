import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 pb-24">
      <div className="bg-brand-text dark:bg-brand-darkCard rounded-[2.5rem] p-10 md:p-20 text-center relative overflow-hidden shadow-3d">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent opacity-10 blur-[100px]" />
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
          Ready to optimize your workflow?
        </h2>
        <p className="text-gray-400 mb-10 max-w-2xl mx-auto relative z-10 leading-relaxed">
          Consult with our specialists to find the perfect configuration for your office or industrial requirements.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
          <Link
            to="/contact"
            className="bg-brand-accent hover:bg-brand-highlight text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg"
          >
            Request a Custom Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
