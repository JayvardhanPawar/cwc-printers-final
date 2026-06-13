import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Wrench, Shield, Video, Search, Download,
  CheckCircle, AlertCircle, Play, ChevronRight, Loader2, Printer, BookOpen, ClipboardList
} from 'lucide-react';

import warrantyData from '../data/warranty.js'; 
import productsData from '../data/products.json';
import videosData from '../data/videos.json';
import ServiceNetwork from '../components/ServiceNetwork';

export default function Services() {
  const { hash } = useLocation();

  const [serial, setSerial] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const [driverSearch, setDriverSearch] = useState('');
  const [selectedOS, setSelectedOS] = useState('Windows');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [manualSearch, setManualSearch] = useState('');
  const [showManualSuggestions, setShowManualSuggestions] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);

  const [videoFilter, setVideoFilter] = useState('installation');

  const emptyForm = { name: '', email: '', phone: '', model: '', serial: '', purchaseDate: '', dealer: '', city: '' };
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  const checkWarranty = () => {
    if (!serial.trim()) return;
    setIsChecking(true);
    setWarrantyInfo(null);
    setTimeout(() => {
      const match = warrantyData.find(item => item.serialNo.toUpperCase() === serial.trim().toUpperCase());
      setWarrantyInfo(match || 'not_found');
      setIsChecking(false);
    }, 600);
  };

  const suggestions = productsData.filter(p =>
    p.drivers && driverSearch && p.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  const handleSelectDriver = (product) => {
    setSelectedDriver(product);
    setDriverSearch(product.name);
    setShowSuggestions(false);
  };

  const manualSuggestions = productsData.filter(p =>
    p.manual && manualSearch && p.name.toLowerCase().includes(manualSearch.toLowerCase())
  );

  const handleSelectManual = (product) => {
    setSelectedManual(product);
    setManualSearch(product.name);
    setShowManualSuggestions(false);
  };

  const handleRegister = () => {
    const { name, email, phone, model, serial: regSerial, purchaseDate } = registerForm;
    if (!name || !email || !phone || !model || !regSerial || !purchaseDate) {
      setRegisterError('Please fill in all required fields.');
      return;
    }
    setRegisterError('');
    setIsRegistering(true);
    setTimeout(() => {
      console.log('Registered:', registerForm);
      setIsRegistering(false);
      setRegisterSuccess(true);
    }, 800);
  };

  const inputClass = "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition placeholder:text-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide";
  const sectionHeadingClass = "text-2xl font-bold text-gray-900 dark:text-white";

  return (
    <div className="pt-28 pb-20 bg-gray-50 dark:bg-brand-darkBg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Support Centre</p>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Service & Support</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
            Technical resources, warranty verification, drivers, manuals, and service locations — all in one place.
          </p>
        </div>

        <div className="space-y-16">

          {/* --- WARRANTY VERIFY --- */}
          <section id="warranty" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-brand-accent" />
              <h2 className={sectionHeadingClass}>Verify Warranty</h2>
            </div>
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Enter the serial number printed on your product to check its warranty status.
              </p>
              <div className="flex gap-3 max-w-md">
                <input
                  type="text"
                  placeholder="e.g. CWC-12345678"
                  className={inputClass}
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && checkWarranty()}
                />
                <button
                  onClick={checkWarranty}
                  disabled={isChecking}
                  className="shrink-0 bg-brand-accent hover:bg-brand-highlight text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
                >
                  {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
                </button>
              </div>

              <div className="mt-6">
                {warrantyInfo === 'not_found' ? (
                  <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold">Serial number not found</p>
                      <p className="text-xs mt-0.5 opacity-70">Please double-check the number printed on your product.</p>
                    </div>
                  </div>
                ) : warrantyInfo ? (
                  <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-4 text-xs font-semibold">
                      <CheckCircle className="w-4 h-4" /> Warranty confirmed
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Purchase Date</p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">{warrantyInfo.purchaseDate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Warranty Expires</p>
                        <p className="text-base font-semibold text-brand-accent">{warrantyInfo.warrantyDate}</p>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          {/* --- WARRANTY REGISTRATION --- */}
          <section id="register" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <ClipboardList className="w-5 h-5 text-brand-accent" />
              <h2 className={sectionHeadingClass}>Register Product</h2>
            </div>
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md">
                Register your product to activate your full warranty and receive priority support.
              </p>

              {registerSuccess ? (
                <div className="py-12 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">Registration Successful</p>
                  <p className="text-sm text-gray-500">Confirmation sent to <span className="text-brand-accent">{registerForm.email}</span></p>
                  <button
                    onClick={() => { setRegisterSuccess(false); setRegisterForm(emptyForm); }}
                    className="mt-2 text-sm text-brand-accent hover:underline font-medium"
                  >
                    Register another product
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>Full Name</label>
                      <input type="text" placeholder="Your full name" value={registerForm.name}
                        onChange={(e) => setRegisterForm(p => ({ ...p, name: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address</label>
                      <input type="email" placeholder="email@example.com" value={registerForm.email}
                        onChange={(e) => setRegisterForm(p => ({ ...p, email: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Phone Number</label>
                      <input type="tel" placeholder="+91 98765 43210" value={registerForm.phone}
                        onChange={(e) => setRegisterForm(p => ({ ...p, phone: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Printer Model</label>
                      <select value={registerForm.model}
                        onChange={(e) => setRegisterForm(p => ({ ...p, model: e.target.value }))}
                        className={inputClass}
                      >
                        <option value="">Select model</option>
                        {productsData.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Serial Number</label>
                      <input type="text" placeholder="Found on back of device" value={registerForm.serial}
                        onChange={(e) => setRegisterForm(p => ({ ...p, serial: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Purchase Date</label>
                      <input type="date" value={registerForm.purchaseDate}
                        onChange={(e) => setRegisterForm(p => ({ ...p, purchaseDate: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Dealer / Store</label>
                      <input type="text" placeholder="Where you purchased" value={registerForm.dealer}
                        onChange={(e) => setRegisterForm(p => ({ ...p, dealer: e.target.value }))} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>City / State</label>
                      <input type="text" placeholder="Your city" value={registerForm.city}
                        onChange={(e) => setRegisterForm(p => ({ ...p, city: e.target.value }))} className={inputClass} />
                    </div>
                  </div>

                  {registerError && (
                    <p className="mt-4 text-sm text-red-500 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" /> {registerError}
                    </p>
                  )}

                  <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="mt-7 bg-brand-accent hover:bg-brand-highlight text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
                  >
                    {isRegistering
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                      : <>Register Warranty <ChevronRight className="w-4 h-4" /></>}
                  </button>
                </>
              )}
            </div>
          </section>

          {/* --- DRIVERS --- */}
          <section id="drivers" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-5 h-5 text-brand-accent" />
              <h2 className={sectionHeadingClass}>Driver Downloads</h2>
            </div>
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Search your printer model to download the appropriate software package.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search model name..."
                    className={`${inputClass} pl-10`}
                    value={driverSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => { setDriverSearch(e.target.value); setSelectedDriver(null); setShowSuggestions(true); }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white dark:bg-brand-darkCard border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                      {suggestions.map(s => (
                        <div key={s.id} onClick={() => handleSelectDriver(s)}
                          className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between text-sm text-gray-800 dark:text-gray-200 transition-colors">
                          {s.name}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <select
                  className={inputClass}
                  value={selectedOS}
                  onChange={(e) => setSelectedOS(e.target.value)}
                >
                  <option value="Windows">Windows (All Versions)</option>
                  <option value="Linux">Linux 64-bit</option>
                  <option value="macOS">macOS</option>
                </select>
              </div>

              <div className="mt-6">
                {selectedDriver ? (
                  selectedDriver.drivers?.[selectedOS] ? (
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-brand-accent/10 rounded-lg">
                          <Printer className="w-5 h-5 text-brand-accent" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedDriver.name}</p>
                          <p className="text-xs text-gray-500 mt-0.5">{selectedOS} driver package</p>
                        </div>
                      </div>
                      <a href={selectedDriver.drivers[selectedOS]} download
                        className="w-full md:w-auto bg-brand-accent hover:bg-brand-highlight text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download
                      </a>
                    </div>
                  ) : (
                    <div className="p-5 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold">No driver available for {selectedOS}</p>
                        <p className="text-xs mt-0.5 opacity-70">Please contact CWC Support for assistance.</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                    Search for a model to see available downloads
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* --- MANUALS --- */}
          <section id="manuals" className="scroll-mt-28">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-brand-accent" />
              <h2 className={sectionHeadingClass}>Product Manuals</h2>
            </div>
            <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                Download the official user manual for your device.
              </p>
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search model name..."
                  className={`${inputClass} pl-10`}
                  value={manualSearch}
                  onFocus={() => setShowManualSuggestions(true)}
                  onChange={(e) => { setManualSearch(e.target.value); setSelectedManual(null); setShowManualSuggestions(true); }}
                />
                {showManualSuggestions && manualSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-white dark:bg-brand-darkCard border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-50 overflow-hidden">
                    {manualSuggestions.map(s => (
                      <div key={s.id} onClick={() => handleSelectManual(s)}
                        className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer flex items-center justify-between text-sm text-gray-800 dark:text-gray-200 transition-colors">
                        <span>{s.name} <span className="text-brand-accent text-xs ml-2">{s.type}</span></span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-6">
                {selectedManual ? (
                  <div className="flex flex-col md:flex-row justify-between items-center gap-4 p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-brand-accent/10 rounded-lg">
                        <BookOpen className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{selectedManual.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">Official User Manual · PDF</p>
                      </div>
                    </div>
                    <a href={selectedManual.manual} target="_blank" rel="noopener noreferrer" download
                      className="w-full md:w-auto bg-brand-accent hover:bg-brand-highlight text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download
                    </a>
                  </div>
                ) : (
                  <div className="py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                    Search for a model to download its manual
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* --- VIDEOS --- */}
          <section id="videos" className="scroll-mt-28">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Video className="w-5 h-5 text-brand-accent" />
                <h2 className={sectionHeadingClass}>How-To Videos</h2>
              </div>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
                {['installation', 'maintenance'].map(type => (
                  <button
                    key={type}
                    onClick={() => setVideoFilter(type)}
                    className={`px-5 py-1.5 rounded-md text-xs font-semibold capitalize transition-all ${
                      videoFilter === type
                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {videosData.filter(v => v.type === videoFilter).map((video, i) => (
                <div key={i} className="group bg-white dark:bg-brand-darkCard rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-brand-accent transition-all">
                  <div className="aspect-video bg-gray-100 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                    <img src={video.thumb} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <button className="relative z-10 w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-brand-accent capitalize mb-1">{video.type}</p>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{video.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <ServiceNetwork />
        </div>
      </div>
    </div>
  );
}