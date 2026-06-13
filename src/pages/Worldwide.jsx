import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import * as L from "leaflet";
import { Globe, MapPin, Building2, ChevronRight, Search, Navigation, Phone, Mail, ArrowUpRight, Maximize } from 'lucide-react';
// import 'leaflet/dist/leaflet.css';
import branches from '../data/branches.json';

// --- CUSTOM ICON ---
const customIcon = new L.DivIcon({
  html: `<div class="relative flex items-center justify-center">
            <div class="absolute w-8 h-8 bg-brand-accent/20 rounded-full animate-ping"></div>
            <div class="relative bg-brand-accent p-2 rounded-xl shadow-3d border border-white/50">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
         </div>`,
  className: 'custom-map-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

// Helper: Center map on coords/zoom changes only
function SetViewOnClick({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.2 });
  }, [center[0], center[1], zoom]); // only re-run when coords or zoom actually change

  return null;
}

export default function Worldwide() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBranch, setActiveBranch] = useState(null);
  const [mapConfig, setMapConfig] = useState({ center: [20.5937, 78.9629], zoom: 5 });

  const filteredBranches = useMemo(() =>
    branches.filter(b =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const handleSelect = (branch) => {
    setActiveBranch(branch);
    setMapConfig({ center: branch.coords, zoom: 12 });
  };

  const resetView = () => {
    setActiveBranch(null);
    setMapConfig({ center: [20.5937, 78.9629], zoom: 5 });
  };

  return (
    <div className="pt-32 pb-16 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-accent">
              <Globe className="w-4 h-4" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em]">Global Infrastructure</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter italic leading-none">
              Network <span className="text-brand-accent">Presence.</span>
            </h1>
          </div>

          <div className="relative w-full md:w-72 group">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
            <input
              type="text"
              placeholder="Filter branches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 focus:border-brand-accent rounded-xl py-2.5 pl-10 pr-4 outline-none dark:text-white text-[11px] font-bold shadow-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[600px]">

          {/* SIDEBAR */}
          <div className="lg:col-span-3 flex flex-col gap-3">
            <div className="flex items-center justify-between px-1 text-[9px] font-black text-gray-400 uppercase tracking-widest">
              <span>Branch Directory</span>
              <span className="text-brand-accent">{filteredBranches.length} Total</span>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 space-y-2 custom-mini-scrollbar">
              {filteredBranches.map((branch, index) => (
                <button
                  key={`sidebar-${branch.id}-${index}`}
                  onClick={() => handleSelect(branch)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 group ${
                    activeBranch?.id === branch.id
                    ? 'bg-brand-text border-brand-text text-white shadow-3d scale-[1.02]'
                    : 'bg-white dark:bg-brand-darkCard border-brand-secondary dark:border-gray-800 text-brand-text dark:text-gray-400 hover:border-brand-accent'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Building2 className={`w-4 h-4 ${activeBranch?.id === branch.id ? 'text-brand-accent' : 'text-gray-400'}`} />
                      <div>
                        <p className="font-black text-xs uppercase tracking-tight leading-none">{branch.name}</p>
                        <p className={`text-[9px] mt-1 opacity-70 truncate w-32 font-medium ${activeBranch?.id === branch.id ? 'text-gray-300' : ''}`}>
                          {branch.address}
                        </p>
                      </div>
                    </div>
                    <ArrowUpRight className={`w-3 h-3 ${activeBranch?.id === branch.id ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* MAP */}
          <div className="lg:col-span-9 flex flex-col gap-4 relative">
            <div className="flex-grow rounded-[2.5rem] overflow-hidden border border-brand-secondary dark:border-gray-800 shadow-xl relative z-0">
              {/* key="main-map" is intentionally stable so MapContainer never remounts */}
              <MapContainer
                key="main-map"
                center={mapConfig.center}
                zoom={mapConfig.zoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
              >
                <SetViewOnClick center={mapConfig.center} zoom={mapConfig.zoom} />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" className="map-tiles" />
                {branches.map((branch, index) => (
                  <Marker
                    key={`marker-${branch.id}-${index}`}
                    position={branch.coords}
                    icon={customIcon}
                    eventHandlers={{ click: () => handleSelect(branch) }}
                  />
                ))}
              </MapContainer>

              {/* FLOATING ACTION BUTTONS */}
              <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
                <button
                  onClick={resetView}
                  className="bg-white dark:bg-brand-darkCard p-2.5 rounded-xl shadow-3d border border-brand-secondary dark:border-gray-800 text-brand-accent hover:scale-110 transition-all"
                  title="Fit all branches"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>

              {/* BRANCH DETAIL POP-OVER */}
              {activeBranch && (
                <div className="absolute bottom-6 left-6 right-6 md:left-auto md:w-80 z-[1000] bg-white/90 dark:bg-brand-darkCard/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 dark:border-gray-700 shadow-2xl animate-in slide-in-from-bottom-4">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="text-[8px] font-black text-brand-accent uppercase tracking-widest bg-brand-accent/10 px-2 py-0.5 rounded">Active Hub</span>
                      <h3 className="font-black text-lg text-brand-text dark:text-white mt-1 leading-none">{activeBranch.name}</h3>
                    </div>
                    <div className="flex gap-1">
                      <a href={`mailto:${activeBranch.email}`} className="p-2 bg-brand-primary dark:bg-gray-800 rounded-lg text-gray-500 hover:text-brand-accent">
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium mb-6">
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                    <span>{activeBranch.address}</span>
                  </div>
                  <button className="w-full bg-brand-text dark:bg-brand-accent text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-3d hover:-translate-y-1 transition-all">
                    Request Branch Info
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}