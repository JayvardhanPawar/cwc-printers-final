import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    Menu, X, ChevronDown, Printer, Search, 
    Globe, ScanLine, LayoutGrid 
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileMenu, setActiveMobileMenu] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    const toggleMobileMenu = (menu) => {
        setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
    };

    const dropdownLinkClass = "block px-6 py-2.5 text-sm text-gray-600 dark:text-gray-300 hover:text-brand-accent hover:bg-brand-accent/5 transition-all duration-200";

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 border-b border-transparent ${isScrolled ? 'backdrop-blur-md bg-brand-primary/90 dark:bg-brand-darkBg/90 shadow-sm border-brand-secondary dark:border-gray-800' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0 group">
    <img 
        src="/images/new_cwc_logo.png" 
        alt="CWC Logo" 
        className="h-10 w-auto dark:invert"
    />
</Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {/* Products */}
                        <div className="group relative">
                            <button onClick={() => navigate("/products?category=all")} className="flex items-center gap-1 font-medium hover:text-brand-accent px-4 py-8 text-brand-text dark:text-brand-darkText transition-colors">
                                Products <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 w-64 bg-white dark:bg-brand-darkCard rounded-xl shadow-2xl border border-brand-secondary dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 py-4">
                                <Link to="/products?category=printers" className={dropdownLinkClass}>Printers</Link>
                                <Link to="/products?category=scanners" className={dropdownLinkClass}>Scanners</Link>
                                <div className="border-t border-brand-secondary dark:border-gray-700 mt-2 pt-2">
                                    <Link to="/products?category=all" className={`${dropdownLinkClass} font-bold`}>View Full Catalog</Link>
                                </div>
                            </div>
                        </div>

                        {/* Consumables */}
                        <div className="group relative">
                            <button onClick={() => navigate("/products?category=consumables")} className="flex items-center gap-1 font-medium hover:text-brand-accent px-4 py-8 text-brand-text dark:text-brand-darkText transition-colors">
                                Consumables <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 w-64 bg-white dark:bg-brand-darkCard rounded-xl shadow-2xl border border-brand-secondary dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 py-4">
                                <Link to="/products?type=Cartridge" className={dropdownLinkClass}>Cartridges</Link>
                                <Link to="/products?type=Toner Cartridge" className={dropdownLinkClass}>Toner</Link>
                                <Link to="/products?type=Drum Unit" className={dropdownLinkClass}>Drum Units</Link>
                                <div className="border-t border-brand-secondary dark:border-gray-700 mt-2 pt-2">
                                    <Link to="/products?category=consumables" className={`${dropdownLinkClass} font-bold`}>View All Supplies</Link>
                                </div>
                            </div>
                        </div>

                        {/* Support */}
                        <div className="group relative">
                            <button onClick={() => navigate("/services")} className="flex items-center gap-1 font-medium hover:text-brand-accent px-4 py-8 text-brand-text dark:text-brand-darkText transition-colors">
                                Support <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-0 w-72 bg-white dark:bg-brand-darkCard rounded-xl shadow-2xl border border-brand-secondary dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 py-4">
                                
                                 <Link to="/services#warranty" className={dropdownLinkClass}>Warranty</Link>
                                 <Link to="/services#drivers" className={dropdownLinkClass}>Driver / File Download</Link>
                                <Link to="/services#manuals" className={dropdownLinkClass}>Manual Download</Link>
                                <Link to="/services#videos" className={dropdownLinkClass}>Operational Videos</Link>
                                <Link to="/services#service-network" className={dropdownLinkClass}>Service Center</Link>
                            </div>
                        </div>

                        <Link to="/about" className="font-medium hover:text-brand-accent px-4 py-8 text-brand-text dark:text-brand-darkText">About</Link>
                        <Link to="/contact" className="font-medium hover:text-brand-accent px-4 py-8 text-brand-text dark:text-brand-darkText">Contact</Link>
                    </div>

                    {/* Right Icons */}
                    <div className="hidden lg:flex items-center space-x-5 border-l border-brand-secondary dark:border-gray-700 pl-5">
                        <Link to="/worldwide" className="flex items-center gap-2 text-sm font-bold text-brand-text dark:text-brand-darkText hover:text-brand-accent transition-all group">
                            <Globe className="w-4 h-4 group-hover:rotate-[360deg] transition-transform duration-[2000ms]" />
                            <span className="tracking-tight uppercase text-[10px]">Our Presence</span>
                        </Link>
                        <ThemeToggle />
                    </div> 

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <ThemeToggle />
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-brand-text dark:text-brand-darkText p-2 z-50">
                            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`lg:hidden fixed inset-0 z-40 bg-white dark:bg-brand-darkBg transition-transform duration-500 ease-in-out transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="pt-24 px-6 h-full overflow-y-auto pb-20">
                    <div className="flex flex-col space-y-2">
                        
                        {/* Products Accordion */}
                        <div>
                            <button onClick={() => toggleMobileMenu('products')} className="flex justify-between items-center w-full py-4 text-xl font-bold text-brand-text dark:text-white border-b border-brand-secondary dark:border-gray-800">
                                Products <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileMenu === 'products' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeMobileMenu === 'products' ? 'max-h-64 py-2' : 'max-h-0'}`}>
                                <Link to="/products?category=printers" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Printers</Link>
                                <Link to="/products?category=scanners" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Scanners</Link>
                                <Link to="/products?category=all" onClick={() => setMobileMenuOpen(false)} className="block py-3 font-bold text-brand-accent pl-4">View All Catalog</Link>
                            </div>
                        </div>

                        {/* Consumables Accordion */}
                        <div>
                            <button onClick={() => toggleMobileMenu('consumables')} className="flex justify-between items-center w-full py-4 text-xl font-bold text-brand-text dark:text-white border-b border-brand-secondary dark:border-gray-800">
                                Consumables <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileMenu === 'consumables' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeMobileMenu === 'consumables' ? 'max-h-64 py-2' : 'max-h-0'}`}>
                                <Link to="/products?type=Cartridge" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Cartridges</Link>
                                <Link to="/products?type=Toner Cartridge" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Toner</Link>
                                <Link to="/products?type=Drum Unit" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Drum Units</Link>
                            </div>
                        </div>

                        {/* Support Accordion */}
                        <div>
                            <button onClick={() => toggleMobileMenu('support')} className="flex justify-between items-center w-full py-4 text-xl font-bold text-brand-text dark:text-white border-b border-brand-secondary dark:border-gray-800">
                                Support <ChevronDown className={`w-5 h-5 transition-transform ${activeMobileMenu === 'support' ? 'rotate-180' : ''}`} />
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${activeMobileMenu === 'support' ? 'max-h-64 py-2' : 'max-h-0'}`}>
                                <Link to="/services#drivers" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Drivers</Link>
                                <Link to="/services#manuals" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Manual Download</Link>
                                <Link to="/services#warranty" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Warranty</Link>
                                <Link to="/services#service-network" onClick={() => setMobileMenuOpen(false)} className="block py-3 text-gray-600 dark:text-gray-400 pl-4">Service Center</Link>
                            </div>
                        </div>

                        {/* Direct Links */}
                        <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-xl font-bold text-brand-text dark:text-white border-b border-brand-secondary dark:border-gray-800">About</Link>
                        <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-xl font-bold text-brand-text dark:text-white border-b border-brand-secondary dark:border-gray-800">Contact</Link>
                        <Link to="/worldwide" onClick={() => setMobileMenuOpen(false)} className="block py-4 text-xl font-bold text-brand-accent">Our Presence</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}