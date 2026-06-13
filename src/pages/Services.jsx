import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Wrench, Shield, Video, Search, Download,
  CheckCircle, AlertCircle, Play, ChevronRight, Loader2, Printer, BookOpen, ClipboardList
} from 'lucide-react';

// Separate Imports
import warrantyData from '../data/warranty.js'; 
import productsData from '../data/products.json'; // 🟢 Direct import from products data
import videosData from '../data/videos.json';
import ServiceNetwork from '../components/ServiceNetwork';

export default function Services() {
  const { hash } = useLocation();

  // Warranty State
  const [serial, setSerial] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  // Driver States (Pulling from productsData)
  const [driverSearch, setDriverSearch] = useState('');
  const [selectedOS, setSelectedOS] = useState('Windows');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Manual States
  const [manualSearch, setManualSearch] = useState('');
  const [showManualSuggestions, setShowManualSuggestions] = useState(false);
  const [selectedManual, setSelectedManual] = useState(null);

  // Video State
  const [videoFilter, setVideoFilter] = useState('installation');

  // Registration State
  const emptyForm = { name: '', email: '', phone: '', model: '', serial: '', purchaseDate: '', dealer: '', city: '' };
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [hash]);

  // Warranty Logic (Array Find)
  const checkWarranty = () => {
    if (!serial.trim()) return;
    setIsChecking(true);
    setWarrantyInfo(null);
    setTimeout(() => {
      const userInput = serial.trim().toUpperCase();
      const match = warrantyData.find(item => item.serialNo.toUpperCase() === userInput);
      setWarrantyInfo(match || "not_found");
      setIsChecking(false);
    }, 600);
  };

  // 🟢 DRIVER LOGIC: Filter only products that have drivers defined in products.json
  const suggestions = productsData.filter(p =>
    p.drivers && 
    driverSearch && 
    p.name.toLowerCase().includes(driverSearch.toLowerCase())
  );

  const handleSelectDriver = (product) => {
    setSelectedDriver(product);
    setDriverSearch(product.name);
    setShowSuggestions(false);
  };

  // 🟢 MANUAL LOGIC: Filter only products that have manual defined
  const manualSuggestions = productsData.filter(p =>
    p.manual &&
    manualSearch &&
    p.name.toLowerCase().includes(manualSearch.toLowerCase())
  );

  const handleSelectManual = (product) => {
    setSelectedManual(product);
    setManualSearch(product.name);
    setShowManualSuggestions(false);
  };

  // 🟢 REGISTRATION LOGIC
  const handleRegister = () => {
    const { name, email, phone, model, serial: regSerial, purchaseDate } = registerForm;
    if (!name || !email || !phone || !model || !regSerial || !purchaseDate) {
      setRegisterError('Please fill in all required fields.');
      return;
    }
    setRegisterError('');
    setIsRegistering(true);
    setTimeout(() => {
      // 👉 Replace this with your real API call / backend POST
      console.log('Registered:', registerForm);
      setIsRegistering(false);
      setRegisterSuccess(true);
    }, 800);
  };

  return (
    <div className="pt-32 pb-20 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl font-black text-brand-text dark:text-brand-darkText mb-4 tracking-tighter text-center italic">
            Service & <span className="text-brand-accent">Support</span>
          </h1>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">
            CWC Certified Technical Resources
          </p>
        </div>

        <div className="space-y-24">

          {/* --- SECTION 1: WARRANTY --- */}
          <section id="warranty" className="scroll-mt-32">
            <div className="bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-8 md:p-12 border border-brand-secondary dark:border-gray-800 shadow-sm relative overflow-hidden">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4 text-brand-accent">
                    <Shield className="w-9 h-9" />
                    <h2 className="text-2xl font-black text-brand-text dark:text-white uppercase tracking-tight italic">Verify Coverage</h2>
                  </div>
                  <p className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                    Access your authorized service lifecycle by entering the unique serial number found on your product chassis.
                  </p>

                  <div className="flex gap-2 max-w-md">
                    <input
                      type="text"
                      placeholder="ENTER SERIAL NUMBER"
                      className="flex-1 bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-widest uppercase"
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && checkWarranty()}
                    />
                    <button
                      onClick={checkWarranty}
                      disabled={isChecking}
                      className="bg-brand-accent hover:bg-brand-highlight text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-3d transition-all active:translate-y-1 min-w-[110px] flex items-center justify-center"
                    >
                      {isChecking ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify"}
                    </button>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  {warrantyInfo === "not_found" ? (
                    <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-200 dark:border-red-900/30 flex items-center gap-5 text-red-600 dark:text-red-400 animate-in zoom-in duration-300">
                      <AlertCircle className="w-8 h-8 shrink-0" />
                      <div>
                        <p className="font-black text-xs uppercase tracking-widest">Not Recognized</p>
                        <p className="text-[10px] font-bold opacity-70 mt-1 uppercase">Verify digits on product sticker.</p>
                      </div>
                    </div>
                  ) : warrantyInfo ? (
                    <div className="bg-brand-primary dark:bg-gray-800/40 p-8 rounded-3xl border-2 border-brand-accent relative overflow-hidden animate-in zoom-in duration-500">
                      <div className="flex items-center gap-2 text-brand-accent mb-8 font-black uppercase tracking-[0.2em] text-[9px]">
                        <CheckCircle className="w-3.5 h-3.5" /> Identity Match Confirmed
                      </div>
                      <div className="grid grid-cols-2 gap-8 relative z-10">
                        <div>
                          <p className="text-[8px] text-gray-400 uppercase font-black mb-1 tracking-widest">Register Date</p>
                          <p className="text-lg font-black text-brand-text dark:text-white">{warrantyInfo.purchaseDate}</p>
                        </div>
                        <div>
                          <p className="text-[8px] text-gray-400 uppercase font-black mb-1 tracking-widest">Warranty End</p>
                          <p className="text-lg font-black text-brand-accent">{warrantyInfo.warrantyDate}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-40 border-2 border-dashed border-brand-secondary dark:border-gray-800 rounded-3xl flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 bg-brand-primary/10">
                      <Shield className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-[9px] font-black uppercase tracking-[0.3em]">Awaiting Serial</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* --- SECTION 2: WARRANTY REGISTRATION --- */}
          <section id="register" className="scroll-mt-32">
            <div className="bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-8 md:p-12 border border-brand-secondary dark:border-gray-800 shadow-sm">

              {/* Header */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <ClipboardList className="w-9 h-9 text-brand-accent" />
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-accent mb-1">
                      Register Your Printer
                    </p>
                    <h2 className="text-2xl font-black italic text-brand-text dark:text-white uppercase tracking-tight">
                      Activate your warranty today.
                    </h2>
                  </div>
                </div>
                <p className="text-[9px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] leading-relaxed max-w-lg">
                  Registration activates your full warranty and ensures faster support if you ever need it.
                </p>
              </div>

              {/* Success State */}
              {registerSuccess ? (
                <div className="py-16 flex flex-col items-center justify-center gap-4 animate-in zoom-in duration-500">
                  <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-brand-accent" />
                  </div>
                  <p className="text-xl font-black italic text-brand-text dark:text-white uppercase tracking-tight">
                    Warranty Registered!
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 text-center">
                    Confirmation details saved for <span className="text-brand-accent">{registerForm.email}</span>
                  </p>
                  <button
                    onClick={() => { setRegisterSuccess(false); setRegisterForm(emptyForm); }}
                    className="mt-4 text-[9px] font-black uppercase tracking-widest text-brand-accent hover:underline"
                  >
                    Register another product →
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Full Name</label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Email Address</label>
                      <input
                        type="email"
                        placeholder="email@example.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm(p => ({ ...p, phone: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>

                    {/* Printer Model — pulls from productsData */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Printer Model</label>
                      <select
                        value={registerForm.model}
                        onChange={(e) => setRegisterForm(p => ({ ...p, model: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[10px] uppercase cursor-pointer"
                      >
                        <option value="">Select Model</option>
                        {productsData.map(p => (
                          <option key={p.id} value={p.name}>{p.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Serial Number */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Serial Number</label>
                      <input
                        type="text"
                        placeholder="Found on back of printer"
                        value={registerForm.serial}
                        onChange={(e) => setRegisterForm(p => ({ ...p, serial: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-widest uppercase placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>

                    {/* Purchase Date */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Purchase Date</label>
                      <input
                        type="date"
                        value={registerForm.purchaseDate}
                        onChange={(e) => setRegisterForm(p => ({ ...p, purchaseDate: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider"
                      />
                    </div>

                    {/* Dealer / Store */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">Dealer / Store</label>
                      <input
                        type="text"
                        placeholder="Where you purchased"
                        value={registerForm.dealer}
                        onChange={(e) => setRegisterForm(p => ({ ...p, dealer: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>

                    {/* City / State */}
                    <div className="space-y-2">
                      <label className="text-[8px] font-black uppercase tracking-[0.25em] text-gray-400">City / State</label>
                      <input
                        type="text"
                        placeholder="Your city"
                        value={registerForm.city}
                        onChange={(e) => setRegisterForm(p => ({ ...p, city: e.target.value }))}
                        className="w-full bg-brand-primary dark:bg-gray-800 border-2 border-brand-secondary dark:border-gray-700 rounded-xl px-5 py-3 focus:border-brand-accent outline-none dark:text-white font-black text-[11px] tracking-wider placeholder:normal-case placeholder:font-bold placeholder:tracking-normal"
                      />
                    </div>
                  </div>

                  {/* Error */}
                  {registerError && (
                    <p className="mt-5 text-[9px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {registerError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="mt-8 bg-brand-text dark:bg-brand-accent text-white px-12 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-3d hover:-translate-y-1 transition-all active:translate-y-0 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isRegistering
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                      : <>Register Warranty <ChevronRight className="w-4 h-4" /></>
                    }
                  </button>
                </>
              )}
            </div>
          </section>

          {/* --- SECTION 3: DRIVERS (INTEGRATED WITH PRODUCTS.JSON) --- */}
          <section id="drivers" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-4">
              <Wrench className="w-6 h-6 text-brand-accent" />
              <h2 className="text-xl font-black text-brand-text dark:text-white uppercase tracking-tight italic">Technical Software</h2>
            </div>

            <div className="bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-6 md:p-8 border border-brand-secondary dark:border-gray-800 relative shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="relative group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-brand-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Search model (e.g. M5030DN/W)"
                    className="w-full bg-brand-primary dark:bg-gray-800 pl-12 pr-6 py-3.5 rounded-xl border-2 border-transparent focus:border-brand-accent outline-none dark:text-white font-black text-[11px] uppercase tracking-wider"
                    value={driverSearch}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setDriverSearch(e.target.value);
                      setSelectedDriver(null);
                      setShowSuggestions(true);
                    }}
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                      {suggestions.map(s => (
                        <div
                          key={s.id}
                          onClick={() => handleSelectDriver(s)}
                          className="px-5 py-3 hover:bg-brand-accent/10 cursor-pointer flex items-center justify-between group transition-colors"
                        >
                          <span className="text-brand-text dark:text-white font-black text-[10px] uppercase tracking-tight">{s.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-brand-accent opacity-0 group-hover:opacity-100 transition-all" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <select
                  className="bg-brand-primary dark:bg-gray-800 px-6 py-3.5 rounded-xl border-2 border-transparent focus:border-brand-accent outline-none dark:text-white font-black text-[10px] uppercase cursor-pointer"
                  value={selectedOS}
                  onChange={(e) => setSelectedOS(e.target.value)}
                >
                  <option value="Windows">Windows (All Versions)</option>
                  <option value="Linux">Linux 64-bit</option>
                  <option value="macOS">macOS</option>
                </select>
              </div>

              <div className="mt-8">
                {selectedDriver ? (
                  selectedDriver.drivers && selectedDriver.drivers[selectedOS] ? (
                    <div className="p-6 bg-brand-primary dark:bg-gray-800/50 rounded-2xl border-2 border-brand-accent animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col md:flex-row justify-between items-center gap-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-brand-accent/10 rounded-xl shrink-0">
                          <Printer className="w-6 h-6 text-brand-accent" />
                        </div>
                        <div>
                          <h4 className="text-lg font-black text-brand-text dark:text-white leading-none mb-1">{selectedDriver.name}</h4>
                          <p className="text-[9px] text-brand-accent font-black uppercase tracking-[0.2em]">Certified {selectedOS} Package</p>
                        </div>
                      </div>
                      <a
                        href={selectedDriver.drivers[selectedOS]}
                        download
                        className="w-full md:w-auto bg-brand-text dark:bg-brand-accent text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-3d hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" /> Download Software
                      </a>
                    </div>
                  ) : (
                    <div className="p-10 text-center border-2 border-red-100 dark:border-red-900/20 bg-red-50/30 dark:bg-red-900/5 rounded-2xl flex flex-col items-center animate-in zoom-in">
                      <AlertCircle className="w-8 h-8 text-red-500 mb-3 opacity-50" />
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Driver not available for {selectedOS}</p>
                      <p className="text-[9px] text-gray-400 font-bold uppercase mt-1">Please contact CWC Support for legacy {selectedDriver.name} files.</p>
                    </div>
                  )
                ) : (
                  <div className="py-16 text-center border-2 border-dashed border-brand-secondary dark:border-gray-800 rounded-3xl text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] bg-brand-primary/10">
                    <Search className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    Select hardware model to access downloads
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* --- SECTION 4: MANUAL DOWNLOADS --- */}
          <section id="manuals" className="scroll-mt-32 space-y-6">
            <div className="flex items-center gap-4">
              <BookOpen className="w-6 h-6 text-brand-accent" />
              <h2 className="text-xl font-black text-brand-text dark:text-white uppercase tracking-tight italic">Product Manuals</h2>
            </div>

            <div className="bg-white dark:bg-brand-darkCard rounded-[2.5rem] p-6 md:p-8 border border-brand-secondary dark:border-gray-800 relative shadow-sm">
              {/* Search */}
              <div className="relative group max-w-xl">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-brand-accent transition-colors" />
                <input
                  type="text"
                  placeholder="Search model to find manual (e.g. P5028)"
                  className="w-full bg-brand-primary dark:bg-gray-800 pl-12 pr-6 py-3.5 rounded-xl border-2 border-transparent focus:border-brand-accent outline-none dark:text-white font-black text-[11px] uppercase tracking-wider"
                  value={manualSearch}
                  onFocus={() => setShowManualSuggestions(true)}
                  onChange={(e) => {
                    setManualSearch(e.target.value);
                    setSelectedManual(null);
                    setShowManualSuggestions(true);
                  }}
                />
                {showManualSuggestions && manualSuggestions.length > 0 && (
                  <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden py-1">
                    {manualSuggestions.map(s => (
                      <div
                        key={s.id}
                        onClick={() => handleSelectManual(s)}
                        className="px-5 py-3 hover:bg-brand-accent/10 cursor-pointer flex items-center justify-between group transition-colors"
                      >
                        <div>
                          <span className="text-brand-text dark:text-white font-black text-[10px] uppercase tracking-tight">{s.name}</span>
                          <span className="ml-3 text-[9px] font-bold text-brand-accent uppercase">{s.type}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-brand-accent opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Result area */}
              <div className="mt-8">
                {selectedManual ? (
                  <div className="p-6 bg-brand-primary dark:bg-gray-800/50 rounded-2xl border-2 border-brand-accent animate-in fade-in slide-in-from-top-4 duration-500 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-brand-accent/10 rounded-xl shrink-0">
                        <BookOpen className="w-6 h-6 text-brand-accent" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-brand-text dark:text-white leading-none mb-1">{selectedManual.name}</h4>
                        <p className="text-[9px] text-brand-accent font-black uppercase tracking-[0.2em]">Official User Manual · PDF</p>
                      </div>
                    </div>
                    <a
                      href={selectedManual.manual}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      className="w-full md:w-auto bg-brand-text dark:bg-brand-accent text-white px-10 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-3d hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download Manual
                    </a>
                  </div>
                ) : (
                  <div className="py-16 text-center border-2 border-dashed border-brand-secondary dark:border-gray-800 rounded-3xl text-gray-400 font-black uppercase tracking-[0.3em] text-[10px] bg-brand-primary/10">
                    <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    Search your model to download the user manual
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* --- SECTION 5: VIDEOS --- */}
          <section id="videos" className="scroll-mt-32 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-brand-text dark:text-white">
                <Video className="w-6 h-6 text-brand-accent" />
                <h2 className="text-xl font-black italic tracking-tight uppercase">Visual Manuals</h2>
              </div>
              <div className="flex bg-brand-secondary dark:bg-gray-800 p-1.5 rounded-xl">
                {['installation', 'maintenance'].map(type => (
                  <button
                    key={type}
                    onClick={() => setVideoFilter(type)}
                    className={`px-6 py-2 rounded-lg font-black text-[9px] uppercase tracking-widest transition-all ${videoFilter === type ? 'bg-brand-accent text-white shadow-md' : 'text-gray-500 hover:text-brand-text'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videosData.filter(v => v.type === videoFilter).map((video, i) => (
                <div key={i} className="group bg-white dark:bg-brand-darkCard rounded-[2rem] overflow-hidden border border-brand-secondary dark:border-gray-800 hover:shadow-3d transition-all">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center overflow-hidden">
                    <img src={video.thumb} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-brand-text/40 group-hover:bg-brand-accent/40 transition-colors" />
                    <button className="relative z-10 w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-xl group-hover:scale-125 transition-all">
                      <Play className="w-4 h-4 fill-current ml-1" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h4 className="font-black text-brand-text dark:text-white group-hover:text-brand-accent transition-colors text-sm leading-tight italic">{video.title}</h4>
                    <div className="mt-3 inline-flex items-center gap-2 text-[8px] font-black text-brand-accent uppercase tracking-widest bg-brand-accent/5 px-2 py-0.5 rounded">
                      {video.type} Guide
                    </div>
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