import { useState } from "react";

// SEO content block — collapsed by default, expands on click.
// Keeps keyword-rich content on the page for crawlers without
// cluttering the visible UI for real users.
export default function SeoKeywordsBlock() {
  const [open, setOpen] = useState(false);

  const cities = [
    "Mumbai", "Delhi", "Gurgaon", "Noida", "Faridabad", "Ghaziabad", "Bengaluru",
    "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Surat", "Jaipur",
    "Lucknow", "Indore", "Bhopal", "Nagpur", "Kanpur", "Patna", "Vadodara",
    "Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Nashik", "Aurangabad",
    "Rajkot", "Vapi", "Coimbatore", "Kochi", "Thiruvananthapuram", "Visakhapatnam",
    "Vijayawada", "Bhubaneswar", "Ranchi", "Raipur", "Dehradun", "Haridwar",
    "Agra", "Varanasi", "Prayagraj", "Meerut", "Bareilly", "Gorakhpur", "Jodhpur",
    "Kota", "Udaipur", "Ajmer", "Mysore", "Mangalore", "Madurai", "Tiruchirappalli",
    "Salem", "Tiruppur", "Hubli", "Belgaum", "Guwahati", "Jammu", "Srinagar",
    "Siliguri", "Gwalior", "Jabalpur", "Ujjain", "Durg", "Bilaspur", "Panipat",
    "Karnal", "Rohtak", "Sonipat", "Mathura", "Aligarh", "Moradabad",
    "Muzaffarpur", "Cuttack", "Gaya", "Bokaro", "Dhanbad", "Kollam", "Thrissur",
  ];

  const products = [
    "Laser Printer", "Laser Printer Under ₹5,000", "A4 Multifunction Printer",
    "A4 All-in-One Printer", "ADF Multifunction Printer", "Compact Laser Printer",
    "High Quality Laser Printer", "Compact Multifunction Laser Printer",
    "Laser Photo Printer", "A3 Colour Laser Multifunction Printer", "CWC Printer",
    "CWC MFP", "CWC SFP", "CWC A4 Laser Printer", "CWC A3 Laser Printer",
    "CWC Colour Printer", "CWC Mono Printer", "CWC Printer Cartridge",
    "CWC Toners", "CWC Drums", "CWC 3336 Printer", "CWC 4055 Printer",
    "CWC P310 Printer",
  ];

  const solutions = [
    {
      title: "Offices & Businesses",
      text: "Office Laser Printer, Compact Laser Printer, A4 Multifunction Printer, A4 All-in-One Printer, ADF Multifunction Printer, High Quality Laser Printer, Compact Multifunction Laser Printer, Laser Printer Deals & Business Printing Solutions",
    },
    {
      title: "Schools & Institutions",
      text: "A4 Laser Printer, Multifunction Printer, ADF Printer, Compact Printer, Mono Laser Printer, Colour Laser Printer, High Volume Printing Solutions & Office Printers",
    },
    {
      title: "Retail Stores",
      text: "Compact Laser Printer, A4 Printer, Multifunction Printer, Laser Photo Printer, Inkjet and Laser Printer, Mono Printer, Colour Printer & Printer Consumables",
    },
    {
      title: "Corporate Offices",
      text: "A4 Multifunction Printer, A3 Colour Laser Multifunction Printer, CWC MFP, CWC SFP, CWC A3 Laser Printer, CWC A4 Laser Printer, CWC Colour Printer & CWC Mono Printer",
    },
    {
      title: "CWC Printing Solutions",
      text: "CWC Printer, CWC Printer Price, CWC 3336 Printer, CWC 4055 Printer, CWC P310 Printer, CWC MFP, CWC SFP, CWC A4 Laser Printers, CWC A3 Laser Printers & CWC A3 Colour Laser Printers",
    },
    {
      title: "CWC Printer Consumables",
      text: "CWC Printer Cartridge, CWC Printer Cartridge Price, CWC Toners, CWC Drums, CWC Colour Printer Consumables & CWC Mono Printer Consumables",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto my-4 border border-gray-200 rounded text-sm">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center gap-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50"
      >
        <span className="inline-block w-4 text-gray-400">{open ? "−" : "+"}</span>
        What Can You Buy from E-Compusell?
      </button>

      {open && (
        <div className="px-4 pb-4 pt-1 text-gray-500 leading-relaxed border-t border-gray-100 space-y-4">
          <p>{products.join(" | ")}</p>

          <p>E-Compusell is a Supplier & Printing Solutions Provider in Indian Cities</p>
          <p>{cities.join(" | ")}</p>

          <p className="text-gray-600 font-medium">E-Compusell Provides Solutions For:</p>
          {solutions.map((s) => (
            <p key={s.title}>
              <span className="text-gray-600 font-medium">{s.title}: </span>
              {s.text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}