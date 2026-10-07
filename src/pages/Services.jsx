import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import {
  Wrench, Shield, Video, Search, Download, MapPin, ClipboardList, HelpCircle,
  CheckCircle, AlertCircle, Play, ChevronRight, Loader2, Phone,
  MessageCircle, Mail, Building2, Star, Plus, Minus, Send, FileText
} from 'lucide-react';

import warrantyData from '../data/warranty.js';
import productsData from '../data/products.json';
import videosData from '../data/videos.json';
import manualsData from '../data/manuals.json';
import ServiceNetwork from '../components/ServiceNetwork';

/* ---------------------------------------------------------------- */
/*  Static content for the redesigned tabs                          */
/* ---------------------------------------------------------------- */

const TABS = [
  { id: 'drivers', label: 'Drivers', icon: Download },
  { id: 'manuals', label: 'Manuals', icon: FileText },
  // { id: 'videos', label: 'Video Centre', icon: Video },
  { id: 'aftersales', label: 'After Sales', icon: MessageCircle },
  { id: 'warranty', label: 'Warranty', icon: Shield },
  { id: 'centres', label: 'Service Centres', icon: MapPin },
  { id: 'policy', label: 'Service Policy', icon: ClipboardList },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
];

const SUPPORT_CHANNELS = [
  {
    icon: Phone,
    title: 'Toll Free Helpline',
    body: 'Call us free from anywhere in India. Our multilingual support team handles queries in Hindi, English, Marathi, Gujarati, Tamil, Kannada, Telugu, Bengali, Malayalam, Punjabi and Odia.',
    linkLabel: '1800 212 7110 — Call Now',
    linkHref: 'tel:18002127110',
    meta: 'Monday–Saturday · 9:00 AM–6:00 PM IST',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    body: 'Send your issue, model number and a photo via WhatsApp. Our team typically responds within 30 minutes during business hours. Share error codes, paper jam images, print samples.',
    linkLabel: '+91 98191 26955 — WhatsApp',
    linkHref: 'https://wa.me/919819126955',
    meta: 'Monday–Saturday · 9:00 AM–7:00 PM IST',
  },
  {
    icon: Mail,
    title: 'Email Support',
    body: 'For detailed technical queries, warranty claims, and escalations. Attach service reports, error logs, or photos. Our technical team responds within 5 business hours with a resolution.',
    linkLabel: 'support@ecompusell.com',
    linkHref: 'mailto:support@ecompusell.com',
    meta: 'Response within 4 business hours',
  },
  {
    icon: Building2,
    title: 'Onsite Service Request',
    body: 'Under warranty or AMC? Request an onsite engineer visit directly. Available across all 14 service states. Response time: same-day within city, next-day for districts.',
    linkLabel: 'Log a Service Request',
    linkHref: '#register',
    meta: 'Same-day response in metro cities',
  },
];

const ESCALATION_STEPS = [
  { step: 1, title: 'First Contact', body: 'Call 1800 212 7110 or WhatsApp. Most issues resolved in this step within 30 minutes.' },
  { step: 2, title: 'Onsite Engineer', body: 'Request a visit within 24 hours. Engineer arrives with spare parts. Resolves 95% of hardware issues.' },
  { step: 3, title: 'Senior Technical Team', body: 'Complex issues escalated to HQ technical team. Conference call + remote diagnosis within 4 hours.' },
  { step: 4, title: 'Management Escalation', body: 'Email escalations@ecompusell.com. Head of Service personally reviews and guarantees resolution in 48 hours.' },
];

const SUPPORT_LANGUAGES = [
  { name: 'Hindi', flag: '🇮🇳', highlighted: true },
  { name: 'English', flag: '🇬🇧', highlighted: true },
  { name: 'Marathi' }, { name: 'Gujarati' }, { name: 'Tamil' }, { name: 'Kannada' },
  { name: 'Telugu' }, { name: 'Bengali' }, { name: 'Malayalam' }, { name: 'Punjabi' }, { name: 'Odia' },
];

const WARRANTY_PLANS = [
  {
    icon: Shield,
    accent: 'border-t-green-500',
    iconBg: 'bg-green-500/10',
    iconColor: 'text-green-500',
    tag: 'Standard Plan',
    title: 'Standard Warranty',
    duration: '1',
    durationLabel: 'Year',
    features: [
      'Onsite repair service included',
      'Genuine CWC spare parts used',
      'Covers all manufacturing defects',
      'Covers mechanical failures',
      'Toll-free support 1800 212 7110',
      'Response within 24 hours',
    ],
    cta: 'Register Warranty',
    ctaHref: '#register',
    ctaClass: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: Star,
    accent: 'border-t-brand-accent',
    iconBg: 'bg-brand-accent/10',
    iconColor: 'text-brand-accent',
    tag: 'Extended Plan',
    title: 'CWC CareShield',
    duration: '3',
    durationLabel: 'Years',
    features: [
      'Everything in Standard, plus:',
      'Priority same-day response',
      'Dedicated support engineer',
      'Annual preventive maintenance visit',
      'Loan printer during extended repair',
      'Free firmware & software updates',
      'Priority spare parts availability',
    ],
    cta: 'Get CareShield',
    ctaHref: '#register',
    ctaClass: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: Building2,
    accent: 'border-t-sky-500',
    iconBg: 'bg-sky-500/10',
    iconColor: 'text-sky-500',
    tag: 'Enterprise Plan',
    title: 'AMC — Annual Maintenance',
    duration: '∞',
    durationLabel: 'Ongoing',
    features: [
      'Comprehensive parts & labour',
      'Quarterly preventive maintenance',
      'Emergency 4-hour response SLA',
      'Dedicated account manager',
      'Fleet management dashboard',
      'Consumables discount 15%',
      'Multi-device contracts available',
    ],
    cta: 'Get AMC Quote',
    ctaHref: '#register',
    ctaClass: 'bg-transparent border border-gray-600 hover:bg-white/5 text-white',
    outline: true,
  },
];

const SLA_ROWS = [
  { location: 'Metro Cities', sub: 'Mumbai, Delhi, Pune, Bengaluru, Chennai, Ahmedabad', standard: 'Same Day', careshield: '4 Hours', amc: '4 Hours', outOfWarranty: 'Next Day' },
  { location: 'Tier 2 Cities', sub: 'State capitals & major towns', standard: 'Next Day', careshield: 'Same Day', amc: 'Same Day', outOfWarranty: '2–3 Days' },
  { location: 'District Towns', sub: 'District HQs & large towns', standard: '2 Days', careshield: 'Next Day', amc: 'Next Day', outOfWarranty: '3–5 Days' },
  { location: 'Remote Locations', sub: 'Villages & remote areas', standard: '3–5 Days', careshield: '2–3 Days', amc: '2–3 Days', outOfWarranty: '5–7 Days' },
  { location: 'Andaman & J&K', sub: 'Island & union territories', standard: '5–7 Days', careshield: '3–5 Days', amc: '3–5 Days', outOfWarranty: '7–10 Days' },
];

const FAQS = [
  { q: 'How do I register my CWC printer warranty?', a: 'Go to the Warranty tab, scroll to "Register Product" and fill in your name, email, phone, printer model, serial number and purchase date. You\'ll get a confirmation email once it\'s activated.' },
  { q: 'What is covered under the standard 1-year warranty?', a: 'The standard warranty covers manufacturing defects and mechanical failures, includes onsite repair with genuine CWC parts, and gives you toll-free support with a 24-hour response time.' },
  { q: 'How long does a typical service visit take?', a: 'Most onsite visits are resolved in under an hour. Complex hardware issues may need a follow-up visit if a spare part has to be ordered.' },
  { q: 'Do I have to bring my printer to a service centre?', a: 'No. For most issues our engineers visit you onsite. You only need to visit a service centre for specialised repairs that require workshop equipment.' },
  { q: 'My CWC printer shows an error code. What should I do?', a: 'Note the exact error code and call our toll-free helpline or send it to us on WhatsApp along with a photo. Our team can often resolve it remotely without a visit.' },
  { q: 'Which driver should I download for my printer?', a: 'Search your exact model in the Drivers section of our support portal and choose the operating system you use. Each card lists every OS the driver package supports.' },
  { q: 'Can I use third-party toner in my CWC printer?', a: 'We recommend genuine CWC toner cartridges. Third-party toner can affect print quality and may void the consumables portion of your warranty.' },
  { q: 'How do I connect my CWC printer to Wi-Fi?', a: 'Check the Video Centre tab for a step-by-step "Connect to Wi-Fi & Network" tutorial that covers all current models.' },
  { q: 'What is the AMC (Annual Maintenance Contract)?', a: 'AMC is an ongoing maintenance plan for printers that are out of warranty. It covers parts, labour, quarterly preventive maintenance and a dedicated account manager.' },
  { q: 'Are CWC printers available on GeM portal?', a: 'Yes, CWC printers and AMC contracts are listed on the Government e-Marketplace (GeM) for institutional and government buyers.' },
  { q: 'Where can I find the user manual for my printer?', a: 'Go to the Manuals tab and search for your model name to download the PDF manual directly.' },
];

/* ---------------------------------------------------------------- */
/*  Driver downloads — standalone zip packages. Each entry maps
    a model to its zip file. Update the `file` path if you host
    these zips somewhere other than /drivers/ in your public
    folder.                                                         */
/* ---------------------------------------------------------------- */
const QUICK_DRIVERS = [
  // CWC 4500s
  { model: '4500s Linux', file: '/drivers/CWC_4500s_Linux.zip' },
  { model: '4500s Mac', file: '/drivers/CWC_4500s_Mac.zip' },
  { model: '4500s Windows', file: '/drivers/CWC_4500s_Windows.zip' },

  // CWC 4055
  { model: '4055 Linux', file: '/drivers/CWC_4055_Linux.zip' },
  { model: '4055 Mac', file: '/drivers/CWC_4055_Mac.zip' },
  { model: '4055 Windows', file: '/drivers/CWC_4055_Windows.zip' },

  // CWC 1020
  { model: '1020 Linux', file: '/drivers/CWC_1020_LINUX.zip' },
  { model: '1020 Windows', file: '/drivers/CWC_1020_WINDOWS.zip' },

  // CWC 10205
  { model: '10205 Linux', file: '/drivers/CWC_10205_LINUX.zip' },
  { model: '10205 Windows', file: '/drivers/CWC_10205_WINDOWS.zip' },

  // CWC M1005
  { model: 'M1005 Linux', file: '/drivers/CWC_M1005_LINUX.zip' },
  { model: 'M1005 Windows', file: '/drivers/CWC_M1005_WINDOWS.zip' },

  // CWC M2010
  { model: 'M2010 Linux', file: '/drivers/CWC_M2010_LINUX.zip' },
  { model: 'M2010 Windows', file: '/drivers/CWC_M2010_WINDOWS.zip' },

  // CWC M5030
  { model: 'M5030 Linux', file: '/drivers/CWC_M5030_LINUX.zip' },
  { model: 'M5030 Windows', file: '/drivers/CWC_M5030_WINDOWS.zip' },

  // CWC M5040
  { model: 'M5040 Linux', file: '/drivers/CWC_M5040_LINUX.zip' },
  { model: 'M5040 Windows', file: '/drivers/CWC_M5040_WINDOWS.zip' },

  // CWC MB5020
  { model: 'MB5020 Linux', file: '/drivers/CWC_MB5020_LINUX.zip' },
  { model: 'MB5020 Windows', file: '/drivers/CWC_MB5020_WINDOWS.zip' },

  // CWC P5010
  { model: 'P5010 Linux', file: '/drivers/CWC_P5010_LINUX.zip' },
  { model: 'P5010 Windows', file: '/drivers/CWC_P5010_WINDOWS.zip' },

  // CWC P5030
  { model: 'P5030 Linux', file: '/drivers/CWC_P5030_LINUX.zip' },
  { model: 'P5030 Windows', file: '/drivers/CWC_P5030_WINDOWS.zip' },

  // CWC P5040
  { model: 'P5040 Linux', file: '/drivers/CWC_P5040_LINUX.zip' },
  { model: 'P5040 Windows', file: '/drivers/CWC_P5040_WINDOWS.zip' },

  // CWC PB5020
  { model: 'PB5020 Linux', file: '/drivers/CWC_PB5020_LINUX.zip' },
  { model: 'PB5020 Windows', file: '/drivers/CWC_PB5020_WINDOWS.zip' },

  // Other Drivers
  { model: 'CWC P5036', file: '/drivers/CWC_P5036.zip' },
  { model: '320', file: '/drivers/320.zip' },
  { model: '3336', file: '/drivers/3336.zip' },
  { model: '4843', file: '/drivers/4843.zip' },
  { model: '7180', file: '/drivers/7180.zip' },
  { model: '10205', file: '/drivers/10205.zip' },
  { model: 'C121', file: '/drivers/C121.zip' },
  { model: 'CWC462', file: '/drivers/CWC462.zip' },
  { model: 'CWC510', file: '/drivers/CWC510.zip' },
  { model: 'CWC710', file: '/drivers/CWC710.zip' },
  { model: 'CWC2010', file: '/drivers/CWC2010.zip' },
  { model: 'CWCM', file: '/drivers/CWCM.zip' },
  { model: 'CWCM315', file: '/drivers/CWCM315.zip' },
  { model: 'CWCP', file: '/drivers/CWCP.zip' },
  { model: 'P211', file: '/drivers/P211.zip' },
  { model: 'P310', file: '/drivers/P310.zip' },
  { model: 'R311', file: '/drivers/R311.zip' },
  { model: 'R6430', file: '/drivers/R6430.zip' },
  { model: 'RB320', file: '/drivers/RB320.zip' },
  { model: 'RC311', file: '/drivers/RC311.zip' },
  { model: 'S3820', file: '/drivers/S3820.zip' },
  { model: 'X2305', file: '/drivers/X2305.zip' },
  { model: 'X2305L', file: '/drivers/X2305L.zip' },
  { model: 'X3105', file: '/drivers/X3105.zip' },
  { model: 'XC315', file: '/drivers/XC315.zip' },
];

/* ---------------------------------------------------------------- */
/*  EmailJS config — replace with your own values from
    dashboard.emailjs.com (reuse the same Service ID / Public Key
    you already used in Contact.jsx; this uses a different template
    since the fields are different).                                */
/* ---------------------------------------------------------------- */
const EMAILJS_SERVICE_ID = 'service_44zp4pi';
const EMAILJS_WARRANTY_TEMPLATE_ID = 'template_p06sxdi';
const EMAILJS_PUBLIC_KEY = 'Nin9QfadL1f1rfayg';



export default function Services() {
  const { hash } = useLocation();
  const navigate = useNavigate();

  const validTabIds = TABS.map(t => t.id);
  const initialTab = validTabIds.includes(hash.replace('#', '')) ? hash.replace('#', '') : 'drivers';
  const [activeTab, setActiveTab] = useState(initialTab);

  const [serial, setSerial] = useState('');
  const [warrantyInfo, setWarrantyInfo] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const [driverSearch, setDriverSearch] = useState('');

  const [manualSearch, setManualSearch] = useState('');

  const [videoFilter, setVideoFilter] = useState('installation');

  const [openFaq, setOpenFaq] = useState(null);

  const emptyForm = { name: '', email: '', phone: '', model: '', serial: '', purchaseDate: '', dealer: '', city: '' };
  const [registerForm, setRegisterForm] = useState(emptyForm);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState('');

  useEffect(() => {
    const id = hash.replace('#', '');
    if (validTabIds.includes(id)) {
      setActiveTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]); // eslint-disable-line react-hooks/exhaustive-deps

  const goToTab = (id) => {
    setActiveTab(id);
    navigate(`#${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  const handleRegister = async () => {
    const { name, email, phone, model, serial: regSerial, purchaseDate } = registerForm;
    if (!name || !email || !phone || !model || !regSerial || !purchaseDate) {
      setRegisterError('Please fill in all required fields.');
      return;
    }
    setRegisterError('');
    setIsRegistering(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_WARRANTY_TEMPLATE_ID,
        {
          name: registerForm.name,
          email: registerForm.email,
          phone: registerForm.phone,
          model: registerForm.model,
          serial: registerForm.serial,
          purchaseDate: registerForm.purchaseDate,
          dealer: registerForm.dealer,
          city: registerForm.city,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setIsRegistering(false);
      setRegisterSuccess(true);
    } catch (err) {
      console.error('EmailJS error:', err);
      setIsRegistering(false);
      setRegisterError('Something went wrong while submitting. Please try again.');
    }
  };

  const inputClass = "w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 text-sm text-gray-800 dark:text-gray-100 focus:border-brand-accent focus:ring-1 focus:ring-brand-accent outline-none transition placeholder:text-gray-400";
  const labelClass = "block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wide";

  /* --------------------------------------------------------------
     Printer Model options for the Warranty registration form —
     de-duplicated, since products.json has some repeated/duplicate
     ids (e.g. "cwc-p211", "cwc-t4846") which otherwise throw React
     "duplicate key" warnings and can cause the select to render
     options oddly.
  ----------------------------------------------------------------*/
  const registerModelOptions = useMemo(() => {
    const seen = new Set();
    return productsData.filter(p => {
      const key = p.id ?? p.name.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  /* --------------------------------------------------------------
     Manual search — sourced from the standalone manuals.json file,
     de-duplicated by model name in case of duplicate entries.
  ----------------------------------------------------------------*/
  const filteredManuals = useMemo(() => {
    const term = manualSearch.trim().toLowerCase();

    const filtered = manualsData.filter(m =>
      m.file && (!term || m.model.toLowerCase().includes(term))
    );

    const seen = new Set();
    return filtered.filter(m => {
      const key = m.model.trim().toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [manualSearch]);

  /* --------------------------------------------------------------
     Driver search — ignores case, spaces, dashes and a leading
     "CWC", so "4055", "cwc 4055" and "4055 win" all work.
  ----------------------------------------------------------------*/
  const filteredDrivers = useMemo(() => {
    const normalize = (s) => s.toLowerCase().replace(/[\s\-_]/g, '');
    const term = normalize(driverSearch).replace(/^cwc/, '');
    if (!term) return QUICK_DRIVERS;
    return QUICK_DRIVERS.filter(d => normalize(d.model).includes(term));
  }, [driverSearch]);

  const VIDEO_GRADIENTS = [
    'from-green-950 to-black',
    'from-indigo-950 to-black',
    'from-orange-950 to-black',
    'from-teal-950 to-black',
    'from-purple-950 to-black',
    'from-blue-950 to-black',
  ];

  return (
    <div className="pt-20 pb-20 bg-gray-50 dark:bg-brand-darkBg min-h-screen">

      {/* --- SUB NAVIGATION --- */}
      <div className="sticky top-16 z-30 bg-white dark:bg-brand-darkCard border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-1 shrink-0">
            {TABS.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => goToTab(tab.id)}
                  className={`flex items-center gap-1.5 px-4 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
          <a href="tel:18002127110" className="shrink-0 ml-4 hidden sm:flex items-center gap-2 bg-gray-900 dark:bg-black text-white px-4 py-2 rounded-full text-xs font-semibold">
            <Phone className="w-3.5 h-3.5" /> 1800 212 7110
          </a>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">

        {/* ============================================================ */}
        {/* DRIVERS TAB                                                   */}
        {/* ============================================================ */}
        {activeTab === 'drivers' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Downloads</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Drivers & Software</h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Always download the latest certified drivers for your CWC model. Compatible with Windows, macOS, and major Linux distributions.
            </p>

            <div className="flex flex-wrap gap-2 mt-5">
              {['Windows', 'macOS', 'Linux'].map(os => (
                <span key={os} className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-accent/10 text-brand-accent">
                  {os}
                </span>
              ))}
            </div>

            {/* --- DRIVER SEARCH --- */}
            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search drivers by model e.g. 4055, M5030, P5040..."
                className={`${inputClass} pl-10`}
                value={driverSearch}
                onChange={(e) => setDriverSearch(e.target.value)}
              />
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {driverSearch.trim()
                ? `${filteredDrivers.length} of ${QUICK_DRIVERS.length} driver packages found`
                : `${QUICK_DRIVERS.length} driver packages available. Click a model to download instantly.`}
            </p>

            {/* --- DRIVERS GRID --- */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredDrivers.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                  No drivers match your search
                </div>
              )}
              {filteredDrivers.map(d => (
                <a
                  key={d.file}
                  href={d.file}
                  download
                  className="group bg-white dark:bg-brand-darkCard border border-gray-200 dark:border-gray-800 hover:border-brand-accent rounded-xl px-4 py-4 flex items-center justify-between gap-2 transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{d.model}</span>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-brand-accent shrink-0" />
                </a>
              ))}
            </div>

            {/* --- HELP CALLOUT --- */}
            <div className="mt-10 bg-gray-900 dark:bg-black rounded-2xl p-7 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div>
                <h3 className="text-lg font-bold text-white">Can't find your exact model?</h3>
                <p className="text-sm text-gray-400 mt-1.5 max-w-md">
                  Call our toll-free helpline or check the Manuals tab for setup guides that list supported drivers per model.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <a href="tel:18002127110" className="bg-white text-gray-900 px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                  <Phone className="w-4 h-4" /> 1800 212 7110
                </a>
                <button onClick={() => goToTab('manuals')} className="bg-white/10 text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 whitespace-nowrap">
                  <FileText className="w-4 h-4" /> Manuals
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* MANUALS TAB                                                   */}
        {/* ============================================================ */}
        {activeTab === 'manuals' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">User Manuals</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Product Manuals</h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Download the full user manual (PDF) for your CWC printer model, including setup, maintenance and troubleshooting.
            </p>

            <div className="mt-8 relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by model name e.g. CWC 4055..."
                className={`${inputClass} pl-10`}
                value={manualSearch}
                onChange={(e) => setManualSearch(e.target.value)}
              />
            </div>

            <p className="mt-4 text-xs text-gray-400">
              {filteredManuals.length} manual{filteredManuals.length === 1 ? '' : 's'} found
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredManuals.length === 0 && (
                <div className="col-span-full py-12 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl text-gray-400 text-sm">
                  No manuals match your search
                </div>
              )}
              {filteredManuals.map(m => (
                <div key={m.model} className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{m.model}</h3>
                    <FileText className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">User Manual · PDF</p>
                  <a
                    href={m.file}
                    download
                    className="mt-5 bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" /> Download Manual
                  </a>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* VIDEO CENTRE TAB                                              */}
        {/* ============================================================ */}
        {activeTab === 'videos' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Video Centre</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Step-by-step tutorials<br />for every task.
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              From unboxing to advanced network setup — our video library covers everything. Available in Hindi and English.
            </p>

            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit mt-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {videosData.filter(v => v.type === videoFilter).map((video, i) => (
                <div key={i} className="group bg-white dark:bg-brand-darkCard rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-brand-accent transition-all">
                  <div className={`aspect-video relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${VIDEO_GRADIENTS[i % VIDEO_GRADIENTS.length]}`}>
                    {video.thumb && (
                      <img src={video.thumb} alt={video.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <button className="relative z-10 w-11 h-11 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-medium text-brand-accent uppercase tracking-wide mb-1">{video.category || video.type}</p>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">{video.title}</h4>
                    {video.duration && (
                      <p className="text-xs text-gray-400 mt-2">⏱ {video.duration} · Hindi &amp; English</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* AFTER SALES TAB                                               */}
        {/* ============================================================ */}
        {activeTab === 'aftersales' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">After Sales Support</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              We're here after<br />every purchase.
            </h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              14 states. 11 languages. One dedicated team making sure your CWC printer never lets you down.
            </p>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SUPPORT_CHANNELS.map(channel => {
                  const Icon = channel.icon;
                  return (
                    <div key={channel.title} className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-6">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
                      </div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-white">{channel.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">{channel.body}</p>
                      <a href={channel.linkHref} className="inline-block text-sm font-semibold text-brand-accent hover:underline mt-3">
                        {channel.linkLabel} ›
                      </a>
                      <p className="text-xs text-gray-400 mt-1">{channel.meta}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col gap-5">
                <div className="bg-gray-900 dark:bg-black rounded-2xl p-7 text-white">
                  <h3 className="text-lg font-bold">Escalation Matrix</h3>
                  <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                    If your issue isn't resolved, escalate through our structured matrix for guaranteed resolution.
                  </p>
                  <div className="mt-6 space-y-5">
                    {ESCALATION_STEPS.map((s, idx) => (
                      <div key={s.step} className={`flex gap-4 ${idx !== ESCALATION_STEPS.length - 1 ? 'pb-5 border-b border-white/10' : ''}`}>
                        <div className="shrink-0 w-7 h-7 rounded-full bg-brand-accent/20 text-brand-accent text-xs font-bold flex items-center justify-center">
                          {s.step}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{s.title}</p>
                          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{s.body}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-7">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">Support Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {SUPPORT_LANGUAGES.map(lang => (
                      <span
                        key={lang.name}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
                          lang.highlighted
                            ? 'bg-brand-accent/10 border-brand-accent text-brand-accent'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300'
                        }`}
                      >
                        {lang.flag ? `${lang.flag} ` : ''}{lang.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* WARRANTY TAB                                                  */}
        {/* ============================================================ */}
        {activeTab === 'warranty' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Warranty</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">Protected from<br />day one.</h1>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 max-w-xl">
              Every CWC printer comes with comprehensive warranty coverage. Onsite service, genuine parts, no hidden charges.
            </p>

            <div className="space-y-10 mt-10">

              {/* Verify warranty */}
              <div id="warranty-verify" className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-5 h-5 text-brand-accent" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verify Warranty</h2>
                </div>
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

              {/* Register */}
              <div id="register" className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-sm scroll-mt-28">
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-2">Register Your Printer</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Activate your warranty today.</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 mb-8 max-w-md">
                  Registration activates your full warranty and ensures faster support if you ever need it.
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
                          {registerModelOptions.map(p => (
                            <option key={p.id ?? p.name} value={p.name}>{p.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Serial Number</label>
                        <input type="text" placeholder="Found on back of printer" value={registerForm.serial}
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
                      className="mt-7 bg-gray-900 dark:bg-white dark:text-gray-900 hover:opacity-90 text-white px-8 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 disabled:opacity-60"
                    >
                      {isRegistering
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Registering...</>
                        : <>Register Warranty <ChevronRight className="w-4 h-4" /></>}
                    </button>
                  </>
                )}
              </div>

              {/* Warranty plan cards — unchanged, now shown after Verify/Register */}
              <div className="bg-gray-900 dark:bg-black rounded-3xl px-6 sm:px-10 py-14 -mx-4 sm:mx-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {WARRANTY_PLANS.map(plan => {
                    const Icon = plan.icon;
                    return (
                      <div key={plan.title} className={`bg-white/5 border-t-4 ${plan.accent} border-x border-b border-white/10 rounded-2xl p-7 flex flex-col`}>
                        <div className={`w-11 h-11 rounded-xl ${plan.iconBg} flex items-center justify-center mb-5`}>
                          <Icon className={`w-5 h-5 ${plan.iconColor}`} />
                        </div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">{plan.tag}</p>
                        <h3 className="text-xl font-bold text-white mt-1">{plan.title}</h3>
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-3xl font-bold text-orange-400">{plan.duration}</span>
                          <span className="text-sm text-gray-400">{plan.durationLabel}</span>
                        </div>
                        <ul className="mt-6 space-y-2.5 flex-1">
                          {plan.features.map(f => (
                            <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                              {f}
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => goToTab('warranty')}
                          className={`mt-7 w-full px-5 py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 ${plan.ctaClass}`}
                        >
                          {plan.cta} <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SERVICE CENTRES TAB                                           */}
        {/* ============================================================ */}
        {activeTab === 'centres' && (
          <section className="scroll-mt-28 space-y-12">
            <ServiceNetwork />

            <div className="rounded-3xl overflow-hidden bg-gradient-to-b from-green-950 via-green-950/70 to-transparent px-6 py-16 text-center">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                📟 India's Most Trusted Printer Support
              </p>
              <p className="text-5xl sm:text-6xl font-extrabold tracking-tight">
                <span className="text-brand-accent">1800</span>{' '}
                <span className="text-white">212 7110</span>
              </p>
              <p className="text-sm text-gray-400 mt-4">Toll Free · Monday–Saturday · 9:00 AM – 6:00 PM IST</p>
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                <a href="tel:18002127110" className="bg-white text-gray-900 px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Call Now — It's Free
                </a>
                <a href="mailto:support@ecompusell.com" className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                  <Send className="w-4 h-4" /> Send a Message
                </a>
                <button onClick={() => goToTab('centres')} className="bg-white/10 text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Find Service Centre
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* SERVICE POLICY TAB                                            */}
        {/* ============================================================ */}
        {activeTab === 'policy' && (
          <section className="scroll-mt-28">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Service Level Agreement (SLA)</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Response and resolution commitments by warranty type and location.
            </p>

            <div className="mt-8 bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-800/50 text-left">
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Location Type</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Standard Warranty</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">CareShield (3yr)</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">AMC</th>
                      <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">Out of Warranty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SLA_ROWS.map((row, i) => (
                      <tr key={row.location} className={i !== SLA_ROWS.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}>
                        <td className="px-6 py-5">
                          <p className="font-bold text-gray-900 dark:text-white">{row.location}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{row.sub}</p>
                        </td>
                        <td className="px-6 py-5 font-semibold text-gray-800 dark:text-gray-200">{row.standard}</td>
                        <td className="px-6 py-5 font-semibold text-gray-800 dark:text-gray-200">{row.careshield}</td>
                        <td className="px-6 py-5 font-semibold text-gray-800 dark:text-gray-200">{row.amc}</td>
                        <td className="px-6 py-5 font-semibold text-gray-800 dark:text-gray-200">{row.outOfWarranty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ============================================================ */}
        {/* FAQ TAB                                                       */}
        {/* ============================================================ */}
        {activeTab === 'faq' && (
          <section className="scroll-mt-28">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-accent mb-3">Frequently Asked Questions</p>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white leading-tight">
              Quick answers to<br />common questions.
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
              {FAQS.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={item.q} className="bg-white dark:bg-brand-darkCard rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden h-fit">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.q}</span>
                      {isOpen ? <Minus className="w-4 h-4 text-gray-400 shrink-0" /> : <Plus className="w-4 h-4 text-gray-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <p className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}