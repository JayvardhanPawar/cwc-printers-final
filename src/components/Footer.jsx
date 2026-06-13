import { Link } from 'react-router-dom';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const footerLinks = [
  {
    heading: 'Products',
    links: [
      { label: 'A3 Printers',   to: '/products?category=all&format=A3' },
      { label: 'A4 Printers',   to: '/products?category=all&format=A4' },
      { label: 'MFP Series',    to: '/products?category=all&format=A4&function=Multifunction' },
      { label: 'SFP Series',    to: '/products?category=all&format=A4&function=Print+Only' },
      { label: 'Consumables',   to: '/products?category=consumables' },
    ],
  },
  {
    heading: 'Service & Support',
    links: [
      { label: 'Drivers',         to: '/services#drivers' },
      { label: 'After Sales',     to: '/services#support' },
      { label: 'Service Policy',  to: '/services#policy' },
      { label: 'Service Centres', to: '/services#centres' },
      { label: 'Warranty',        to: '/services#warranty' },
    ],
  },
  {
    heading: 'About Us',
    links: [
      { label: 'Company Profile',      to: '/about' },
      { label: 'Certifications',       to: '/about#certifications' },
      { label: 'E-Waste Policy',       to: '/about#ewaste' },
    ],
  },
  {
    heading: 'Contact Us',
    links: [
      { label: 'Enquiries',            to: '/contact' },
      { label: 'Careers',              to: '/careers' },
      { label: 'Business Partnership', to: '/contact#partnership' },
      { label: 'Feedback',             to: '/contact#feedback' },
    ],
  },
];
// ──────────────────────────────────────────────────────────────────────────────

const linkClass =
  'text-sm text-gray-400 hover:text-brand-accent transition-colors duration-200';

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-gray-800">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <Link to="/" className="inline-block mb-4">
              <img
                src="/images/new_cwc_logo.png"
                alt="CWC Logo"
                className="h-9 w-auto invert"
              />
            </Link>

            {/* Company name */}
            <p className="text-sm font-semibold text-white mb-3">
              E-Compusell Limited
            </p>

            {/* Tagline */}
            <p className="text-xs text-gray-500 italic leading-relaxed mb-5">
              "Desh Ki Samrudhi,<br />
              Dil Se Swadeshi"
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-semibold text-gray-300">
                🇮🇳 Make in India
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-semibold text-gray-300">
                🚀 Startup India
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
          flex flex-col sm:flex-row justify-between items-center gap-3">

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} E-Compusell Limited. All rights reserved.
          </p>

          <p className="text-xs text-gray-500 text-center sm:text-right">
            Office No. 13, Aditya Centeegra, Shivajinagar, Pune – 411004
            &nbsp;|&nbsp;
            Toll Free:&nbsp;
            <a href="tel:18002127110" className="text-gray-400 hover:text-brand-accent transition-colors">
              1800 212 7110
            </a>
          </p>

        </div>
      </div>

    </footer>
  );
}