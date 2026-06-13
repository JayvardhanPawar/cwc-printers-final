import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Send, User, AtSign, Building2, Headphones } from 'lucide-react';
export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="pt-32 pb-20 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden">
      
      {/* Background Decorative Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-highlight/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* --- HEADER SECTION --- */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 bg-brand-accent/10 text-brand-accent px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest mb-4 border border-brand-accent/20">
            <Headphones className="w-3.5 h-3.5" />
            <span>24/7 Support Channel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-brand-text dark:text-brand-darkText mb-6 tracking-tighter leading-[0.9]">
            Connect With <span className="text-brand-accent">CWC.</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
            Reach out to E-Compusell Ltd for specialized printing solutions, technical support, or enterprise partnerships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* --- LEFT: INFORMATION SIDEBAR --- */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Primary Address & Map Integration Link */}
            <div className={`bg-brand-text text-white p-10 rounded-[3rem] shadow-2xl transition-all duration-1000 delay-100 flex flex-col h-full relative overflow-hidden group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <Building2 className="absolute -top-10 -right-10 w-40 h-40 opacity-5 group-hover:rotate-12 transition-transform duration-700" />
              
              <div className="relative z-10 space-y-8">
                <div className="w-14 h-14 bg-brand-accent rounded-2xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 tracking-tight">Our Headquarters</h3>
                  <p className="text-gray-300 leading-relaxed font-medium text-lg">
                    Aditya Centeegra, Fergusson College Rd,<br/>
                    Shivajinagar, Pune, Maharashtra 411004
                  </p>
                </div>
                
                <div className="pt-8 border-t border-white/10 space-y-4">
                   <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Office Hours</span>
                      <span className="text-sm font-bold">Mon - Sat: 10AM - 7PM</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-brand-darkCard p-6 rounded-[2rem] border border-brand-secondary dark:border-gray-800 shadow-sm">
                <Mail className="w-6 h-6 text-brand-accent mb-4" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Business</p>
                <a href="mailto:info@ecompusell.com" className="text-sm font-bold text-brand-text dark:text-white hover:text-brand-accent transition-colors">info@ecompusell.com</a>
              </div>
              <div className="bg-white dark:bg-brand-darkCard p-6 rounded-[2rem] border border-brand-secondary dark:border-gray-800 shadow-sm">
                <Mail className="w-6 h-6 text-brand-accent mb-4" />
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Support</p>
                <a href="mailto:service@ecompusell.com" className="text-sm font-bold text-brand-text dark:text-white hover:text-brand-accent transition-colors">service@ecompusell.com</a>
              </div>
            </div>
          </div>

          {/* --- RIGHT: THE PREMIUM CONTACT FORM --- */}
          <div className={`lg:col-span-7 bg-white dark:bg-brand-darkCard p-10 md:p-14 rounded-[3.5rem] border border-brand-secondary dark:border-gray-800 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-10">
              <h3 className="text-3xl font-bold text-brand-text dark:text-white mb-2">Send us a Message</h3>
              <p className="text-gray-500 font-medium">Fill out the form below and we’ll get back to you within 24 hours.</p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <User className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                  <input type="text" className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium" placeholder="Full Name" />
                </div>
                <div className="relative group">
                  <AtSign className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                  <input type="email" className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium" placeholder="Work Email" />
                </div>
              </div>

              <div className="relative group">
                <Phone className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                <input type="tel" className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium" placeholder="Contact Number" />
              </div>

              <div className="relative group">
                <MessageSquare className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                <textarea rows="4" className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all resize-none font-medium" placeholder="Briefly describe your inquiry..."></textarea>
              </div>

              <button type="submit" className="group w-full bg-brand-accent text-white py-5 rounded-2xl font-bold text-lg shadow-3d hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3">
                <span>Dispatch Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>

        {/* --- DYNAMIC PHONE & MAP SECTION --- */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Specialized Phone Contacts */}
            <div className={`lg:col-span-4 bg-brand-secondary/40 dark:bg-gray-800/40 backdrop-blur-md p-10 rounded-[3rem] border border-brand-secondary dark:border-gray-800 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <h4 className="text-lg font-bold text-brand-text dark:text-white mb-8 border-b border-brand-secondary dark:border-gray-700 pb-4">Direct Lines</h4>
                <div className="space-y-6">
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Toll Free</span>
                        <a href="tel:18002127110" className="text-lg font-bold text-brand-text dark:text-white hover:text-brand-accent transition-colors">1800 212 7110</a>
                    </div>
                    <div className="flex justify-between items-center group">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Direct</span>
                        <a href="tel:02029701984" className="text-lg font-bold text-brand-text dark:text-white hover:text-brand-accent transition-colors">020 2970 1984</a>
                    </div>
                    <div className="flex justify-between pt-4 border-t border-brand-secondary dark:border-gray-700">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mobile</span>
                        <div className="text-right space-y-1">
                            <p className="font-bold text-brand-text dark:text-white">+91 98191 26955</p>
                            <p className="font-bold text-brand-text dark:text-white">+91 97656 07868</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Premium Integrated Map Card */}
            <div className={`lg:col-span-8 h-[450px] relative rounded-[3rem] overflow-hidden border-4 border-white dark:border-brand-darkCard shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.996160166299!2d73.84534727598642!3d18.528994768918235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae668819a293061%3A0x6fa32328cf2dc5f8!2sE-Compusell%20Limited!5e0!3m2!1sen!2sin!4v1712465322941!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1)' }} 
                    allowFullScreen="" 
                    loading="lazy"
                />
                <div className="absolute top-6 left-6 bg-white/90 dark:bg-brand-darkCard/90 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold shadow-lg border border-brand-secondary dark:border-gray-800">
                   <span className="text-brand-accent">Live Facility:</span> Pune, Maharashtra
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}