import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Download, PackageSearch, Laptop, AlertCircle, ArrowRight, ChevronDown, BookOpen } from 'lucide-react';

import productsData from '../data/products.json';

const CONSUMABLE_TYPES = ['Cartridge', 'Toner', 'Drum Unit'];

export default function ProductDetails() {
  const { id } = useParams();
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

      // Consumables: start with img1. Everything else: start with main image.
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

  if (!product) {
    return (
      <div className="pt-32 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
        <PackageSearch className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-semibold text-brand-text dark:text-brand-darkText mb-4">Product Not Found</h2>
        <Link to="/products" className="text-brand-accent hover:underline">Return to Catalog</Link>
      </div>
    );
  }

  const currentDriverLink = product.drivers ? product.drivers[selectedOS] : null;

  // Consumables: only show img1 in the gallery (no thumbnails, single image).
  // All other products: show the full gallery strip.
  const galleryKeys = isConsumable
    ? ['img1']
    : ['image', 'img1', 'img2', 'img3'];

  const getOSDisplayLabel = (osKey) => {
    if (osKey.toLowerCase().includes('win')) return 'Windows';
    if (osKey.toLowerCase().includes('mac')) return 'macOS';
    if (osKey.toLowerCase().includes('linux')) return 'Linux';
    return osKey;
  };

  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-brand-primary dark:bg-brand-darkBg min-h-screen transition-colors duration-500">
      <Link to="/products" className="inline-flex items-center text-gray-500 hover:text-brand-accent mb-8 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-brand-darkCard p-6 sm:p-10 rounded-3xl border border-brand-secondary dark:border-gray-800 shadow-sm mb-12">

        {/* IMAGE GALLERY */}
        <div className="flex flex-col md:flex-row gap-5">

          {/* Thumbnail strip — hidden for consumables (only 1 image, no strip needed) */}
          {!isConsumable && (
            <div className="order-2 md:order-1 flex md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0">
              {galleryKeys.map((key) => (
                product[key] && (
                  <div
                    key={key}
                    onClick={() => setMainImage(product[key])}
                    className={`w-20 h-20 rounded-2xl border-2 transition-all cursor-pointer p-2 shrink-0 bg-white ${
                      mainImage === product[key]
                        ? 'border-brand-accent shadow-md'
                        : 'border-brand-secondary dark:border-gray-700 hover:border-brand-accent/50'
                    }`}
                  >
                    <img
                      src={product[key]}
                      alt={`${product.name} view`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )
              ))}
            </div>
          )}

          {/* Main image */}
          <div className="order-1 md:order-2 flex-1 aspect-square bg-brand-primary/30 dark:bg-gray-900/30 rounded-3xl flex items-center justify-center border border-brand-secondary dark:border-gray-800 overflow-hidden group">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="flex flex-col justify-center">
          <div className="mb-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-accent bg-brand-accent/10 border border-brand-accent/20 px-3 py-1 rounded-full">
              {product.type}
            </span>
          </div>

          <h1 className="text-3xl font-bold text-brand-text dark:text-brand-darkText mb-6">{product.name}</h1>

          <ul className="space-y-3 mb-8">
            {product.specSummary?.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-8 border-t border-brand-secondary dark:border-gray-800 space-y-6">
            <button className="w-full bg-brand-text dark:bg-brand-accent hover:bg-brand-highlight text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs shadow-3d hover:-translate-y-1 transition-all">
              Enquire Now
            </button>

            {/* DRIVER + MANUAL SECTION */}
            {(product.drivers || product.manual) ? (
              <div className="bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-[2rem] p-5 sm:p-6 shadow-sm space-y-4">

                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                  <Laptop className="w-5 h-5 text-brand-accent" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-brand-text dark:text-white">Software &amp; Docs</h3>
                </div>

                {/* DRIVER ROW */}
                {product.drivers && (
                  <div className="space-y-3">
                    {/* OS selector */}
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Driver</p>
                      <div className="relative">
                        <select
                          value={selectedOS}
                          onChange={(e) => setSelectedOS(e.target.value)}
                          className="appearance-none bg-brand-primary/50 dark:bg-gray-800 border border-brand-secondary dark:border-gray-700 rounded-xl pl-4 pr-10 py-2 text-[10px] font-bold uppercase text-brand-accent outline-none cursor-pointer"
                        >
                          {Object.keys(product.drivers).map(osKey => (
                            <option key={osKey} value={osKey}>{getOSDisplayLabel(osKey)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-brand-accent pointer-events-none" />
                      </div>
                    </div>

                    {currentDriverLink ? (
                      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-brand-primary/30 dark:bg-gray-900/40 rounded-2xl border border-brand-secondary/50 gap-4">
                        <div className="flex items-center gap-4 self-start">
                          <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                            <Download className="w-5 h-5 text-brand-accent" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-brand-text dark:text-white uppercase">
                              {getOSDisplayLabel(selectedOS)} Driver
                            </p>
                            <p className="text-[10px] text-gray-400 font-medium">WHQL Certified</p>
                          </div>
                        </div>
                        <a
                          href={currentDriverLink}
                          className="w-full sm:w-auto bg-brand-accent hover:bg-brand-highlight text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase text-center shadow-md transition-all active:scale-95"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <div className="flex items-start gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/20">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5" />
                        <p className="text-[10px] font-bold text-red-600 uppercase">Driver currently unavailable</p>
                      </div>
                    )}
                    
                  </div>
                )}

                {/* DIVIDER — only when both driver and manual are present */}
                {product.drivers && product.manual && (
                  <div className="border-t border-brand-secondary dark:border-gray-800" />
                )}

                {/* MANUAL ROW */}
                {product.manual && (
                  <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">User Manual</p>
                    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-brand-primary/30 dark:bg-gray-900/40 rounded-2xl border border-brand-secondary/50 gap-4">
                      <div className="flex items-center gap-4 self-start">
                        <div className="w-10 h-10 rounded-xl bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm shrink-0">
                          <BookOpen className="w-5 h-5 text-brand-accent" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-brand-text dark:text-white uppercase">Product Manual</p>
                          <p className="text-[10px] text-gray-400 font-medium">PDF Format</p>
                        </div>
                      </div>
                      <a
                        href={product.manual}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto bg-brand-text dark:bg-gray-700 hover:bg-brand-highlight text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase text-center shadow-md transition-all active:scale-95"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-brand-secondary dark:border-gray-800 rounded-[2rem]">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manuals provided on request</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SPEC TABS */}
      {product.details && activeTab && (
        <div className="bg-white dark:bg-brand-darkCard rounded-3xl border border-brand-secondary dark:border-gray-800 overflow-hidden shadow-sm">
          <div className="flex overflow-x-auto bg-brand-primary/20 dark:bg-gray-800/20 border-b border-brand-secondary dark:border-gray-700">
            {Object.keys(product.details).map((key) => (
              product.details[key].length > 0 && (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`px-6 py-4 text-xs font-bold relative transition-colors whitespace-nowrap ${
                    activeTab === key ? 'text-brand-accent' : 'text-gray-500 hover:text-brand-text'
                  }`}
                >
                  {key.replace('_', ' ').toUpperCase()}
                  {activeTab === key && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent rounded-t-full" />
                  )}
                </button>
              )
            ))}
          </div>
          <div className="p-6 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            {product.details[activeTab]?.map((spec, i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 dark:border-gray-800/50">
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">{spec.title}</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm text-right">{spec.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* COMPATIBLE ACCESSORIES */}
      {compatibleItems.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold text-brand-text dark:text-brand-darkText uppercase tracking-tight mb-8">
            Compatible Supplies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {compatibleItems.map((item) => (
              <Link
                key={item.id}
                to={`/products/${item.id}`}
                className="group bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 rounded-2xl p-4 transition-all hover:shadow-lg"
              >
                <div className="aspect-square bg-brand-primary/30 dark:bg-gray-900/30 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {/* Compatible items are consumables — use img1 */}
                  <img
                    src={item.img1 || item.image}
                    alt={item.name}
                    className="w-3/4 h-3/4 object-contain transition-transform group-hover:scale-110"
                  />
                </div>
                <p className="text-[9px] font-bold text-brand-accent uppercase mb-1">{item.type}</p>
                <h3 className="font-semibold text-brand-text dark:text-white text-xs mb-4 line-clamp-1">{item.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-medium text-gray-400">View</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}