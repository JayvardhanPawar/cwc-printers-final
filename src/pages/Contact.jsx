import React, { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
  Mail, Phone, MapPin, MessageSquare, Send, User, AtSign, Building2,
  Headphones, PhoneCall, Printer, Wrench, Download, Heart, Handshake,
  Briefcase, MoreHorizontal, Smartphone, Loader2, CheckCircle2, XCircle
} from 'lucide-react';
import CtaBanner from '../components/Ctabanner';

const INQUIRY_TYPES = [
  { id: 'quote', label: 'Product Quote', icon: Printer },
  { id: 'service', label: 'Service & Repair', icon: Wrench },
  { id: 'drivers', label: 'Drivers & Software', icon: Download },
  { id: 'consumables', label: 'Consumables', icon: Heart },
  { id: 'partnership', label: 'Partnership', icon: Handshake },
  { id: 'careers', label: 'Careers', icon: Briefcase },
  { id: 'other', label: 'Other', icon: MoreHorizontal },
];

const BUSINESS_HOURS = [
  { day: 'Monday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Thursday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Friday', hours: '9:00 AM – 6:00 PM' },
  { day: 'Saturday', hours: '9:00 AM – 2:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const OFFICES = [
  {
    emoji: '🏢',
    city: 'Pune',
    tag: 'HEAD OFFICE',
    lines: ['Office No. 13, Aditya Centeegra,', 'FC Road, Shivajinagar,', 'Pune – 411004, Maharashtra'],
    phone: '020 2970 1984',
  },
  {
    emoji: '🏙️',
    city: 'Mumbai',
    tag: 'REGIONAL OFFICE',
    lines: ['E-Compusell Limited,', 'Andheri East,', 'Mumbai – 400069, Maharashtra'],
    phone: '+91 98191 26955',
  },
  {
    emoji: '🌆',
    city: 'Delhi NCR',
    tag: 'NORTH INDIA OFFICE',
    lines: ['E-Compusell Limited,', 'Connaught Place,', 'New Delhi – 110001'],
    phone: '1800 212 7110 (Toll Free)',
  },
];

const LANGUAGES = [
  'Hindi', 'English', 'Marathi', 'Gujarati', 'Tamil', 'Kannada',
  'Telugu', 'Bengali', 'Malayalam', 'Punjabi', 'Odia',
];

const PRINTER_MODELS = [
  'CWC 4055', 'CWC 3820', 'CWC 2910', 'CWC ProLine X1', 'Not sure / Other',
];

const STATES = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Gujarat', 'Tamil Nadu',
  'West Bengal', 'Telangana', 'Other',
];

// ---- EmailJS config: replace with your own values from dashboard.emailjs.com ----
const EMAILJS_SERVICE_ID = 'service_44zp4pi';
const EMAILJS_TEMPLATE_ID = 'template_hcmfobg';
const EMAILJS_PUBLIC_KEY = 'Nin9QfadL1f1rfayg';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  state: '',
  printer_model: '',
  message: '',
};

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [inquiryType, setInquiryType] = useState('quote');
  const [form, setForm] = useState(initialFormState);
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const inquiryLabel = INQUIRY_TYPES.find((t) => t.id === inquiryType)?.label || inquiryType;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          inquiry_type: inquiryLabel,
          first_name: form.first_name,
          last_name: form.last_name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          state: form.state,
          printer_model: form.printer_model,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus('success');
      setForm(initialFormState);
      setInquiryType('quote');
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
    }
  };

  return (
    <div className="pt-32 pb-20 bg-brand-primary dark:bg-brand-darkBg transition-colors duration-500 overflow-hidden relative">

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* --- RIGHT (visually left on wide screens): THE PREMIUM CONTACT FORM --- */}
          <div className={`lg:col-span-7 lg:order-1 bg-white dark:bg-brand-darkCard p-10 md:p-14 rounded-[3.5rem] border border-brand-secondary dark:border-gray-800 shadow-2xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-brand-text dark:text-white mb-2">Send us a Message</h3>
              <p className="text-gray-500 font-medium">We typically respond within 2 business hours.</p>
            </div>

            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* Inquiry Type Selector */}
              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">I'm Enquiring About</p>
                <div className="flex flex-wrap gap-2">
                  {INQUIRY_TYPES.map(({ id, label, icon: Icon }) => {
                    const active = inquiryType === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setInquiryType(id)}
                        className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold border transition-all ${
                          active
                            ? 'bg-brand-text text-white border-brand-text dark:bg-white dark:text-brand-text dark:border-white'
                            : 'bg-transparent text-gray-500 border-brand-secondary dark:border-gray-700 hover:border-brand-accent hover:text-brand-accent'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">First Name</p>
                  <div className="relative">
                    <User className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="text"
                      name="first_name"
                      value={form.first_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium"
                      placeholder="Rahul"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Last Name</p>
                  <div className="relative">
                    <User className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="text"
                      name="last_name"
                      value={form.last_name}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium"
                      placeholder="Sharma"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email</p>
                  <div className="relative">
                    <AtSign className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium"
                      placeholder="rahul@company.com"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phone</p>
                  <div className="relative">
                    <Phone className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Company / Organisation</p>
                  <div className="relative">
                    <Building2 className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleChange}
                      className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all font-medium"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                <div className="relative group">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">State</p>
                  <select
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 outline-none focus:border-brand-accent dark:text-white dark:bg-brand-darkCard transition-all font-medium appearance-none cursor-pointer"
                  >
                    <option value="" className="text-gray-400">Select your state</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* <div className="relative group">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Printer Model (if applicable)</p>
                <select
                  name="printer_model"
                  value={form.printer_model}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 outline-none focus:border-brand-accent dark:text-white dark:bg-brand-darkCard transition-all font-medium appearance-none cursor-pointer"
                >
                  <option value="" className="text-gray-400">Select a model</option>
                  {PRINTER_MODELS.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div> */}

              <div className="relative group">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message</p>
                <div className="relative">
                  <MessageSquare className="absolute left-0 top-4 w-5 h-5 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    required
                    className="w-full bg-transparent border-b-2 border-brand-secondary dark:border-gray-700 py-4 pl-8 outline-none focus:border-brand-accent dark:text-white transition-all resize-none font-medium"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group w-full bg-brand-accent text-white py-5 rounded-2xl font-bold text-lg shadow-3d hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>

              {status === 'success' && (
                <div className="flex items-center gap-2 justify-center text-green-600 dark:text-green-400 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Message sent! We'll get back to you within 2 business hours.</span>
                </div>
              )}
              {status === 'error' && (
                <div className="flex items-center gap-2 justify-center text-red-600 dark:text-red-400 font-bold text-sm">
                  <XCircle className="w-4 h-4" />
                  <span>Something went wrong. Please try again or call us directly.</span>
                </div>
              )}

              <p className="text-center text-xs text-gray-400 font-medium">
                By submitting, you agree to our Privacy Policy. We never share your data with third parties.
              </p>
            </form>
          </div>

          {/* --- LEFT (visually right on wide screens): INFORMATION SIDEBAR --- */}
          <div className="lg:col-span-5 lg:order-2 flex flex-col gap-6">

            {/* Toll Free Helpline Card */}
            <div className={`bg-brand-text text-white p-10 rounded-[3rem] shadow-2xl transition-all duration-1000 delay-100 relative overflow-hidden group ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <div className="absolute -top-16 -right-16 w-56 h-56 bg-brand-accent/20 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Toll Free Helpline</p>
                <p className="text-4xl md:text-5xl font-black tracking-tight">
                  <span className="text-brand-accent">1800</span> 212 7110
                </p>
                <p className="text-sm text-gray-400 font-medium">Mon – Sat &middot; 9:00 AM – 6:00 PM IST</p>
                <a
                  href="tel:18002127110"
                  className="inline-flex items-center justify-center gap-2 w-full bg-brand-accent text-white py-4 rounded-2xl font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <PhoneCall className="w-4 h-4" />
                  Call Now — Free
                </a>
              </div>
            </div>

            {/* Direct Contact List */}
            <div className={`bg-white dark:bg-brand-darkCard p-8 rounded-[2.5rem] border border-brand-secondary dark:border-gray-800 shadow-sm transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Direct Contact</p>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/60 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4.5 h-4.5 text-brand-text dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Mobile</p>
                    <a href="tel:+919819126955" className="text-base font-bold text-brand-accent hover:underline">+91 98191 26955</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/60 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-brand-text dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Office</p>
                    <a href="tel:02029701984" className="text-base font-bold text-brand-accent hover:underline">020 2970 1984</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/60 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-brand-text dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email</p>
                    <a href="mailto:info@ecompusell.com" className="text-base font-bold text-brand-accent hover:underline">info@ecompusell.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-secondary/60 dark:bg-gray-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-brand-text dark:text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Head Office</p>
                    <p className="text-sm font-bold text-brand-text dark:text-white leading-snug">
                      Office No. 13, Aditya Centeegra,<br />Shivajinagar, Pune – 411004
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className={`bg-white dark:bg-brand-darkCard p-8 rounded-[2.5rem] border border-brand-secondary dark:border-gray-800 shadow-sm transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Business Hours</p>
              <div className="divide-y divide-brand-secondary dark:divide-gray-800">
                {BUSINESS_HOURS.map(({ day, hours }) => (
                  <div key={day} className="flex items-center justify-between py-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{day}</span>
                    <span className={`text-sm font-bold ${hours === 'Closed' ? 'text-gray-400' : 'text-brand-text dark:text-white'}`}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- MAP SECTION --- */}
        <div className={`mt-8 h-[420px] relative rounded-[3rem] overflow-hidden border-4 border-white dark:border-brand-darkCard shadow-2xl transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
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

        {/* --- OFFICES ACROSS INDIA --- */}
        <div className="mt-24">
          <p className="text-[11px] font-bold text-brand-accent uppercase tracking-widest mb-3">Our Offices</p>
          <h2 className="text-4xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter mb-10">
            Find us across India.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {OFFICES.map(({ emoji, city, tag, lines, phone }) => (
              <div
                key={city}
                className="bg-white dark:bg-brand-darkCard p-8 rounded-[2.5rem] border border-brand-secondary dark:border-gray-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-secondary/60 dark:bg-gray-800 flex items-center justify-center text-2xl mb-6">
                  {emoji}
                </div>
                <h3 className="text-xl font-bold text-brand-text dark:text-white">{city}</h3>
                <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-4">{tag}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-4">
                  {lines.map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < lines.length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </p>
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-sm font-bold text-brand-accent hover:underline">
                  {phone}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* --- MULTILINGUAL SUPPORT --- */}
        <div className="mt-24 bg-brand-secondary/40 dark:bg-gray-800/40 backdrop-blur-md p-10 md:p-14 rounded-[3rem] border border-brand-secondary dark:border-gray-800">
          <p className="text-[11px] font-bold text-brand-accent uppercase tracking-widest mb-3">Multilingual Support</p>
          <h2 className="text-3xl md:text-4xl font-black text-brand-text dark:text-white tracking-tighter mb-4">
            We speak your language.
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 max-w-2xl">
            Our support team is fluent in 11 languages — so you always speak to someone who truly understands you.
          </p>
          <div className="flex flex-wrap gap-3">
            {LANGUAGES.map((lang) => (
              <span
                key={lang}
                className="inline-flex items-center gap-2 bg-white dark:bg-brand-darkCard px-5 py-2.5 rounded-full text-sm font-bold text-brand-text dark:text-white border border-brand-secondary dark:border-gray-700 shadow-sm"
              >
                🇮🇳 {lang}
              </span>
            ))}
          </div>
        </div>
        <CtaBanner />

      </div>
    </div>

  );

}