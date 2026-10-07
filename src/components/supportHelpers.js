/**
 * supportHelpers.js — warranty lookup + service-engineer lookup (locations.json).
 * Pure functions, no UI. Used by CWCAssistant.jsx.
 */
import warrantyData from '../data/warranty';              // your warranty.js
import locations from '../data/locations.json';           // { serviceCenters: [...] }

/* ---------- warranty ---------- */

const parseDMY = (s) => {
  const [d, m, y] = String(s).split('/').map(Number);
  return new Date(y, m - 1, d, 23, 59, 59);
};
const fmt = (d) =>
  d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const cleanSerial = (s = '') => String(s).toUpperCase().replace(/\s+/g, '');

// Built once. If a serial appears twice, keep the one with the latest expiry.
const serialMap = new Map();
warrantyData.forEach((r) => {
  const key = cleanSerial(r.serialNo);
  const prev = serialMap.get(key);
  if (!prev || parseDMY(r.warrantyDate) > parseDMY(prev.warrantyDate)) serialMap.set(key, r);
});

// Pull a serial-looking token out of free text (has digits, 8+ chars, no spaces)
export function extractSerial(text = '') {
  const tokens = text.toUpperCase().split(/[\s,;:]+/);
  return tokens.find((t) => /\d/.test(t) && /^[A-Z0-9\-_/]{8,}$/.test(t)) || null;
}

export function checkWarranty(serialInput, today = new Date()) {
  const rec = serialMap.get(cleanSerial(serialInput));
  if (!rec) return { found: false, serial: cleanSerial(serialInput) };
  const end = parseDMY(rec.warrantyDate);
  const daysLeft = Math.ceil((end - today) / 86400000);
  return {
    found: true,
    serial: rec.serialNo,
    purchaseDate: fmt(parseDMY(rec.purchaseDate)),
    warrantyDate: fmt(end),
    active: daysLeft >= 0,
    daysLeft,
  };
}

export function warrantyMessage(r) {
  if (!r.found)
    return `I couldn't find serial number ${r.serial} in our warranty records. Please re-check the number on the printer's label, or contact support.`;
  const base = `Serial ${r.serial}\nPurchased: ${r.purchaseDate}\nWarranty ends: ${r.warrantyDate}`;
  if (r.active) {
    const note = r.daysLeft <= 30 ? ` (only ${r.daysLeft} day${r.daysLeft === 1 ? '' : 's'} left)` : ` (${r.daysLeft} days left)`;
    return `✅ In warranty${note}\n${base}`;
  }
  return `⚠️ Warranty expired ${Math.abs(r.daysLeft)} day${Math.abs(r.daysLeft) === 1 ? '' : 's'} ago\n${base}`;
}

/* ---------- engineers by location ---------- */

// Aliases → service-center id in locations.json
const ALIASES = {
  kochi: 'kochin', cochin: 'kochin', kerala: 'kochin', ernakulam: 'kochin',
  bombay: 'mumbai', thane: 'mumbai', 'navi mumbai': 'mumbai',
  vizag: 'Visakhapatnam', visakhapatnam: 'Visakhapatnam', andhra: 'Visakhapatnam',
  'port blair': 'andaman', nicobar: 'andaman',
  chennai: 'tamil-nadu', 'tamil nadu': 'tamil-nadu', tamilnadu: 'tamil-nadu', coimbatore: 'tamil-nadu', madurai: 'tamil-nadu',
  guwahati: 'assam',
  'new delhi': 'delhi', ncr: 'delhi', noida: 'delhi', gurgaon: 'delhi', gurugram: 'delhi', ghaziabad: 'delhi',
  'uttar pradesh': 'up', lucknow: 'up', kanpur: 'up', varanasi: 'up',
  patna: 'bihar',
  bengaluru: 'bangalore', karnataka: 'bangalore',
  kolkata: 'west-bengal', calcutta: 'west-bengal', 'west bengal': 'west-bengal', wb: 'west-bengal',
  dharashiv: 'osmanabad',
  nasik: 'pune', nashik: 'pune', 'pimpri chinchwad': 'pune', pcmc: 'pune',
  indore: 'bhopal', 'madhya pradesh': 'bhopal',
};

const nrm = (s = '') => String(s).toLowerCase().replace(/[^a-z\s-]/g, ' ').replace(/\s+/g, ' ').trim();

// Returns the matching service center, or null
export function findServiceCenter(text) {
  const q = ` ${nrm(text)} `;
  // 1) aliases (longest first so "navi mumbai" beats "mumbai")
  const aliasHit = Object.keys(ALIASES).sort((a, b) => b.length - a.length)
    .find((a) => q.includes(` ${a} `));
  if (aliasHit) return locations.serviceCenters.find((c) => c.id.toLowerCase() === ALIASES[aliasHit].toLowerCase()) || null;
  // 2) direct city / id match
  return (
    locations.serviceCenters.find((c) => {
      const city = nrm(c.city);
      return q.includes(` ${city} `) || q.includes(` ${nrm(c.id)} `);
    }) || null
  );
}

// All cities/states that have engineers, A–Z (internal "Factory" entry is hidden)
const HIDDEN = new Set(['factory']);
export function availableCities() {
  return locations.serviceCenters
    .filter((c) => !HIDDEN.has(c.id.toLowerCase()))
    .map((c) => c.city)
    .sort((a, b) => a.localeCompare(b));
}

export function engineerMessage(center) {
  const list = center.engineers.map((e) => `• ${e.name} — ${e.phone}`).join('\n');
  return `🔧 Service engineers in ${center.city}:\n${list}`;
}