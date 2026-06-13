import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, Phone, User, ChevronRight, Building2, Search, X } from 'lucide-react';
import data from '../data/locations.json';

export default function ServiceNetwork() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState(data.serviceCenters[0].id);

  const filteredLocations = useMemo(() => {
    return data.serviceCenters.filter(center =>
      center.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      center.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const activeCenter = data.serviceCenters.find(c => c.id === activeTab);

  // Function to handle selection and smooth scroll on mobile
  const handleSelect = (id) => {
    setActiveTab(id);
    // Only scroll on mobile screens (width < 1024px)
    if (window.innerWidth < 1024) {
      const detailElement = document.getElementById('details-view');
      if (detailElement) {
        detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="service-network" className="py-12 md:py-20 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- COMPACT HEADER --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-black text-brand-text dark:text-white tracking-tight">
              Service <span className="text-brand-accent">Network</span>
            </h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
              Authorized Support Hubs ({data.serviceCenters.length})
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text"
              placeholder="Search city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-2xl py-3 pl-10 pr-10 outline-none focus:border-brand-accent dark:text-white text-sm font-bold shadow-sm"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* --- SIDEBAR: Always visible, scrollable list --- */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-2">Select Location</p>
            <div className="max-h-[400px] lg:max-h-[600px] overflow-y-auto pr-1 space-y-2 custom-mini-scrollbar">
              {filteredLocations.map((center) => (
                <button
                  key={center.id}
                  onClick={() => handleSelect(center.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                    activeTab === center.id 
                    ? 'bg-brand-text border-brand-text text-white shadow-lg' 
                    : 'bg-white dark:bg-brand-darkCard border-brand-secondary dark:border-gray-800 text-brand-text dark:text-gray-400 hover:border-brand-accent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Building2 className={`w-4 h-4 ${activeTab === center.id ? 'text-brand-accent' : 'text-gray-400'}`} />
                    <span className="font-bold text-xs uppercase">{center.city}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === center.id ? 'rotate-90 md:rotate-0 translate-x-1' : 'opacity-0'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* --- DETAIL PANEL: id="details-view" handles the mobile scroll target --- */}
          <div id="details-view" className="lg:col-span-8 scroll-mt-24">
            {activeCenter ? (
              <div key={activeCenter.id} className="bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-6 md:p-10 border border-brand-secondary dark:border-gray-800 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8 pb-6 border-b border-brand-secondary dark:border-gray-700">
                  <div className="space-y-1">
                    <h3 className="text-2xl md:text-3xl font-black text-brand-text dark:text-white tracking-tight italic">
                      {activeCenter.city} Hub
                    </h3>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium text-xs">
                      <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                      <span>{activeCenter.address}</span>
                    </div>
                  </div>
                  <div className="bg-brand-accent/10 text-brand-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-brand-accent/20">
                    Active Center
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeCenter.engineers.map((eng, idx) => (
                    <div key={idx} className="bg-brand-primary/40 dark:bg-gray-800/40 p-5 rounded-2xl border border-brand-secondary dark:border-gray-700 flex flex-col justify-between group">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-white dark:bg-brand-darkCard rounded-xl flex items-center justify-center text-brand-accent shadow-sm border border-brand-secondary dark:border-gray-800 group-hover:bg-brand-accent group-hover:text-white transition-all">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-brand-text dark:text-white leading-tight">{eng.name}</p>
                          <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest mt-1">{eng.role}</p>
                        </div>
                      </div>
                      
                      <a 
                        href={`tel:${eng.phone.replace(/\s/g, '')}`} 
                        className="flex items-center justify-center gap-2 w-full bg-brand-accent text-white py-3 rounded-xl text-xs font-bold shadow-3d hover:-translate-y-0.5 transition-all"
                      >
                        <Phone className="w-3 h-3" /> Call Engineer
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-40 flex items-center justify-center border-2 border-dashed border-brand-secondary rounded-[2.5rem] bg-brand-primary/10">
                <p className="text-gray-400 text-xs font-bold">Select a location above</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-mini-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-mini-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-mini-scrollbar::-webkit-scrollbar-thumb { background: #FFE8CC; border-radius: 10px; }
        .dark .custom-mini-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; }
      `}} />
    </section>
  );
}