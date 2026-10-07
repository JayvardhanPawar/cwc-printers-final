import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, Download, PackageSearch, Laptop, AlertCircle,
  ArrowRight, ChevronDown, BookOpen, ShieldCheck, Hash, Layers
} from 'lucide-react';

import productsData from '../data/products.json';

const CONSUMABLE_TYPES = ['Cartridge', 'Toner', 'Drum Unit'];

/* ---------------------------------------------------------------------
   DESIGN TOKENS — "equipment nameplate / parts dossier" layout,
   recolored to use the existing brand.* theme so it matches the rest
   of the site instead of a standalone palette.

   brand-primary     page background / soft tint surfaces
   brand-secondary   hairlines / borders
   brand-text        primary dark text (also used as the dark "plate" bg)
   brand-accent      copper/primary accent
   brand-highlight   accent hover state
   brand-darkBg      dark-mode page background
   brand-darkCard    dark-mode surface
   brand-darkText    dark-mode primary text
--------------------------------------------------------------------- */

function useDossierFonts() {
  useEffect(() => {
    const id = 'dossier-font-link';
    if (document.getElementById(id)) return;
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap';
    document.head.appendChild(link);
  }, []);
}

function Rivet({ className = '' }) {
  return (
    <span
      className={`absolute w-2.5 h-2.5 rounded-full ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, #cfd6e0, #6b7280 55%, #333944 100%)',
        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.6)',
      }}
    />
  );
}

export default function ProductDetails() {
  useDossierFonts();

  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === id);

  const isConsumable = CONSUMABLE_TYPES.includes(product?.type);

  const [activeTab, setActiveTab] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [selectedOS, setSelectedOS] = useState('');

  const compatibleItems = productsData.filter(item =>
    product?.compatibleIds?.includes(item.id)
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      if (product.details) {
        setActiveTab(Object.keys(product.details)[0]);
      }

      setMainImage(isConsumable ? product.img1 : product.image);

      const platform = window.navigator.platform.toLowerCase();
      const availableKeys = Object.keys(product.drivers || {});
      let detectedKey = availableKeys[0];

      if (platform.includes('mac')) {
        detectedKey = availableKeys.find(k => k.toLowerCase().includes('mac')) || detectedKey;
      } else if (platform.includes('linux')) {
        detectedKey = availableKeys.find(k => k.toLowerCase().includes('linux')) || detectedKey;
      } else {
        detectedKey = availableKeys.find(k => k.toLowerCase().includes('win')) || detectedKey;
      }

      setSelectedOS(detectedKey);
    }
  }, [product]);

  const fontDisplay = { fontFamily: "'Space Grotesk', sans-serif" };
  const fontBody = { fontFamily: "'Inter', sans-serif" };
  const fontMono = { fontFamily: "'IBM Plex Mono', monospace" };

  if (!product) {
    return (
      <div style={fontBody} className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh] bg-brand-primary dark:bg-brand-darkBg">
        <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
        <h2 style={fontDisplay} className="text-2xl font-semibold text-brand-text dark:text-brand-darkText mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand-accent hover:underline font-medium">Return to Catalog</Link>
      </div>
    );
  }

  const currentDriverLink = product.drivers ? product.drivers[selectedOS] : null;

  const galleryKeys = isConsumable
    ? ['img1']
    : ['image', 'img1', 'img2', 'img3'];

  const getOSDisplayLabel = (osKey) => {
    if (osKey.toLowerCase().includes('win')) return 'Windows';
    if (osKey.toLowerCase().includes('mac')) return 'macOS';
    if (osKey.toLowerCase().includes('linux')) return 'Linux';
    return osKey;
  };

  const hasBothServiceCards = Boolean(product.drivers) && Boolean(product.manual);

  return (
    <div style={fontBody} className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-brand-primary dark:bg-brand-darkBg min-h-screen transition-colors duration-500">

      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-brand-accent mb-6 transition-colors font-medium text-sm">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>

      {/* ============ NAMEPLATE HERO ============ */}
      <div className="relative rounded-[24px] bg-brand-text dark:bg-brand-darkCard text-white px-6 sm:px-9 py-7 mb-8 overflow-hidden">
        <Rivet className="top-3 left-3" />
        <Rivet className="top-3 right-3" />
        <Rivet className="bottom-3 left-3" />
        <Rivet className="bottom-3 right-3" />

        {/* faint etched grid, evokes engraved metal plate */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="relative flex flex-col gap-3 px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <span style={fontMono} className="text-[10px] tracking-[0.25em] uppercase text-brand-accent font-semibold">
              {product.type}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-500" />
            <span style={fontMono} className="text-[10px] tracking-[0.2em] uppercase text-gray-400 flex items-center gap-1">
              <Hash className="w-3 h-3" />{product.id}
            </span>
          </div>

          <h1 style={fontDisplay} className="text-2xl sm:text-4xl font-semibold leading-tight max-w-2xl">
            {product.name}
          </h1>

          {product.specSummary?.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 pt-4 border-t border-white/10">
              {product.specSummary.slice(0, 4).map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0" />
                  <span style={fontMono} className="text-[11px] uppercase tracking-wide text-white/70">{item}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start bg-white dark:bg-brand-darkCard p-5 sm:p-8 rounded-[24px] border border-brand-secondary dark:border-gray-800 shadow-sm mb-10">

        {/* IMAGE GALLERY */}
        <div className="flex flex-col md:flex-row gap-4 lg:sticky lg:top-24 self-start h-fit w-full">

          {!isConsumable && (
            <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {galleryKeys.map((key, idx) => (
                product[key] && (
                  <button
                    type="button"
                    key={key}
                    onClick={() => setMainImage(product[key])}
                    className={`relative w-16 h-16 rounded-xl border transition-all shrink-0 bg-brand-primary/40 dark:bg-gray-900 p-2 ${
                      mainImage === product[key]
                        ? 'border-brand-accent ring-1 ring-brand-accent'
                        : 'border-brand-secondary dark:border-gray-700 hover:border-brand-accent/50'
                    }`}
                  >
                    <img src={product[key]} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                    <span style={fontMono} className="absolute -top-1.5 -left-1.5 bg-brand-text text-[8px] text-white/80 rounded px-1 leading-tight">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </button>
                )
              ))}
            </div>
          )}

          <div className="order-1 md:order-2 flex-1 min-w-0 relative aspect-[4/3] max-h-[420px] w-full bg-brand-primary/30 dark:bg-gray-900/30 rounded-2xl flex items-center justify-center border border-brand-secondary dark:border-gray-800 overflow-hidden group">
            {/* corner crop marks — technical/spec-sheet framing */}
            {['top-2 left-2 border-t border-l', 'top-2 right-2 border-t border-r', 'bottom-2 left-2 border-b border-l', 'bottom-2 right-2 border-b border-r'].map((pos, i) => (
              <span key={i} className={`absolute w-3 h-3 border-brand-accent/50 ${pos}`} />
            ))}
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="flex flex-col">
          <div className="bg-brand-primary/40 dark:bg-gray-900/30 border border-brand-secondary/60 dark:border-gray-800 rounded-3xl p-5 sm:p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="w-4 h-4 text-brand-accent" />
              <h2 style={fontMono} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-text dark:text-white">Key Features</h2>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {product.specSummary?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 bg-white dark:bg-brand-darkCard border border-brand-secondary/60 dark:border-gray-800 rounded-2xl p-4 transition-all hover:border-brand-accent/40 hover:shadow-sm"
                >
                  <span className="w-6 h-6 rounded-full bg-brand-accent/15 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-accent" />
                  </span>
                  <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <button
              style={fontMono}
              onClick={() => navigate('/contact')}
              className="w-full bg-brand-text dark:bg-brand-accent hover:bg-brand-highlight text-white py-4 rounded-2xl font-semibold uppercase tracking-[0.2em] text-[11px] transition-all active:scale-[0.99]"
            >
              Enquire Now
            </button>
          </div>

          <div className="space-y-6">
            {(product.drivers || product.manual) ? (
              <div className={`grid grid-cols-1 gap-4 ${hasBothServiceCards ? 'sm:grid-cols-2' : ''}`}>

                {/* SERVICE / DRIVER CARD — dossier style with dog-ear */}
                {product.drivers && (
                  <div className="relative bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col overflow-hidden">
                    <span
                      className="absolute top-0 right-0 w-6 h-6"
                      style={{ background: 'linear-gradient(135deg, transparent 50%, var(--tw-gradient-dogear, #EEF0F2) 50%)' }}
                    />
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Laptop className="w-4 h-4 text-brand-accent" />
                        <h3 style={fontMono} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-text dark:text-white">Service</h3>
                      </div>
                      <div className="relative">
                        <select
                          value={selectedOS}
                          onChange={(e) => setSelectedOS(e.target.value)}
                          style={fontMono}
                          className="appearance-none bg-brand-primary/50 dark:bg-gray-800 border border-brand-secondary dark:border-gray-700 rounded-lg pl-3 pr-7 py-1.5 text-[10px] font-semibold uppercase text-brand-accent outline-none cursor-pointer"
                        >
                          {Object.keys(product.drivers).map(osKey => (
                            <option key={osKey} value={osKey}>{getOSDisplayLabel(osKey)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-accent pointer-events-none" />
                      </div>
                    </div>

                    {currentDriverLink ? (
                      <div className="flex flex-col items-stretch gap-3 p-4 bg-brand-primary/30 dark:bg-gray-900/40 rounded-xl border border-brand-secondary/50 flex-1">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                            <Download className="w-4 h-4 text-brand-accent" />
                          </div>
                          <div>
                            <p style={fontMono} className="text-[11px] font-semibold text-brand-text dark:text-white uppercase">
                              {getOSDisplayLabel(selectedOS)} Driver
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">WHQL Certified</p>
                          </div>
                        </div>
                        <a
                          href={currentDriverLink}
                          style={fontMono}
                          className="w-full bg-brand-accent hover:bg-brand-highlight text-white px-6 py-3 rounded-lg font-semibold text-[10px] uppercase tracking-wide text-center transition-all active:scale-95"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3 p-4 bg-red-500/5 rounded-xl border border-red-500/20 flex-1">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p style={fontMono} className="text-[10px] font-semibold text-red-600 uppercase tracking-wide">Driver currently unavailable</p>
                      </div>
                    )}
                  </div>
                )}

                {/* MANUAL CARD */}
                {product.manual && (
                  <div className="relative bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-4 flex flex-col overflow-hidden">
                    <span
                      className="absolute top-0 right-0 w-6 h-6"
                      style={{ background: 'linear-gradient(135deg, transparent 50%, var(--tw-gradient-dogear, #EEF0F2) 50%)' }}
                    />
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-brand-accent" />
                      <h3 style={fontMono} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-text dark:text-white">Manual</h3>
                    </div>
                    <div className="flex flex-col items-stretch gap-3 p-4 bg-brand-primary/30 dark:bg-gray-900/40 rounded-xl border border-brand-secondary/50 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                          <BookOpen className="w-4 h-4 text-brand-accent" />
                        </div>
                        <div>
                          <p style={fontMono} className="text-[11px] font-semibold text-brand-text dark:text-white uppercase">Product Manual</p>
                          <p className="text-[10px] text-gray-400 font-medium">PDF Format</p>
                        </div>
                      </div>
                      <a
                        href={product.manual}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={fontMono}
                        className="w-full bg-brand-text dark:bg-gray-700 hover:bg-brand-highlight text-white px-6 py-3 rounded-lg font-semibold text-[10px] uppercase tracking-wide text-center transition-all active:scale-95"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-brand-secondary dark:border-gray-800 rounded-2xl">
                <p style={fontMono} className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">Manuals provided on request</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ============ SPEC SHEET — folder tabs ============ */}
      {product.details && activeTab && (
        <div className="mb-10">
          <div className="flex overflow-x-auto">
            {Object.keys(product.details).map((key) => (
              product.details[key].length > 0 && (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  style={fontMono}
                  className={`px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap rounded-t-xl border-t border-x transition-colors ${
                    activeTab === key
                      ? 'bg-white dark:bg-brand-darkCard text-brand-accent border-brand-secondary dark:border-gray-800 relative z-10 -mb-px'
                      : 'bg-transparent text-gray-500 border-transparent hover:text-brand-text'
                  }`}
                >
                  {key.replace('_', ' ')}
                </button>
              )
            ))}
          </div>
          <div className="bg-white dark:bg-brand-darkCard rounded-b-3xl rounded-tr-3xl border border-brand-secondary dark:border-gray-800 overflow-hidden shadow-sm">
            <div className="p-6 lg:p-9 grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {product.details[activeTab]?.map((spec, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center gap-4 py-3 px-2 -mx-2 rounded-lg ${i % 2 === 0 ? 'bg-brand-primary/30 dark:bg-gray-900/20' : ''}`}
                >
                  <span className="text-gray-700 dark:text-gray-300 text-sm font-medium">{spec.title}</span>
                  <span style={fontMono} className="text-brand-text dark:text-gray-200 text-sm text-right">{spec.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============ COMPATIBLE ACCESSORIES — parts bin ============ */}
      {compatibleItems.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center gap-2 mb-6">
            <Layers className="w-4 h-4 text-brand-accent" />
            <h2 style={fontMono} className="text-[13px] font-semibold text-brand-text dark:text-brand-darkText uppercase tracking-[0.2em]">
              Compatible Supplies
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {compatibleItems.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group relative bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-2xl p-4 transition-all hover:shadow-lg hover:border-brand-accent/40"
              >
                {/* perforation / tear-off tag line */}
                <div className="flex items-center justify-between mb-3 pb-2 border-b border-dashed border-brand-secondary dark:border-gray-700">
                  <span style={fontMono} className="text-[9px] font-semibold text-brand-accent uppercase tracking-widest">{item.type}</span>
                  <span style={fontMono} className="text-[9px] text-gray-400">{item.id}</span>
                </div>
                <div className="aspect-square bg-brand-primary/30 dark:bg-gray-900/30 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.img1 || item.image}
                    alt={item.name}
                    className="w-3/4 h-3/4 object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <h3 className="font-semibold text-brand-text dark:text-white text-xs mb-3 line-clamp-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span style={fontMono} className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">View</span>
                  <ArrowRight className="w-3 h-3 text-gray-500 group-hover:translate-x-1 group-hover:text-brand-accent transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}