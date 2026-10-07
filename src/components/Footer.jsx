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
    heading: 'Shop Online',
    links: [
      // TODO: replace '#' with real product/marketplace links
      { label: 'Amazon',   to: '#' },
      { label: 'Flipkart', to: 'https://www.flipkart.com/cwc-4055-printer-1200x1200-dpi-resolution-make-india-3-years-warranty-multi-function-wifi-monochrome-laser-printer/p/itm0397115e1deb8' },
      { label: 'Moglix',   to: 'https://www.moglix.com/cwc-2010dnw-24ppm-multi-function-wifi-monochrome-laser-printer/mp/msnv5o67qm10k6' },
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
      { label: 'Company Profile', to: '/about' },
      { label: 'Certifications',  to: '/about#certifications' },
      { label: 'E-Waste Policy',  to: '/about#ewaste' },
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

// ─── SOCIAL LINKS ─────────────────────────────────────────────────────────────
const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/_ecompusell_/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/ecompusell-ltd',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/cwcprinters/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'Website',
    href: 'https://www.ecompusell.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ),
  },
];
// ──────────────────────────────────────────────────────────────────────────────

const linkClass =
  'text-sm text-gray-400 hover:text-brand-accent transition-colors duration-200';

// Shop Online links open in a new tab since they point to external marketplaces
const externalLinkClass = linkClass;

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-gray-800">

      {/* ── Main grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10">

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
              "देश की समृद्धि, दिल से स्वदेशी"
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-semibold text-gray-300">
                🇮🇳 Make in India
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-800 border border-gray-700 text-[10px] font-semibold text-gray-300">
                🚀 Startup India
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 border border-gray-700 text-gray-400 hover:text-brand-accent hover:border-brand-accent transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.heading}>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.12em] text-gray-500 mb-5">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) =>
                  col.heading === 'Shop Online' ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={externalLinkClass}
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  )
                )}
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