/**
 * CWCAssistant.jsx  (src/components/CWCAssistant.jsx)
 * Client-side product + support assistant.
 *  - Products: finder, specs, compare, drivers, toner/consumables (products.json)
 *  - Warranty check by serial number (src/data/warranty.js)
 *  - Service engineers by city/state (src/data/locations.json)
 *
 * Needs: npm i lucide-react, Tailwind CSS.
 * Files expected in src/data/: products.json, warranty.js, locations.json
 */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  MessageCircle, X, Send, Printer, Download,
  Search as SearchIcon, GitCompareArrows, Droplets, Wrench, ShieldCheck,
} from 'lucide-react';
import {
  extractSerial, checkWarranty, warrantyMessage,
  findServiceCenter, engineerMessage, availableCities,
} from './supportHelpers';

/* ---------------- data helpers ---------------- */

const norm = (s = '') =>
  String(s).toLowerCase().normalize('NFKD').replace(/[^\w\s./-]/g, ' ').replace(/\s+/g, ' ').trim();

const isPrinter = (p) => p.category === 'printers';
const isConsumable = (p) => p.category === 'consumables';

function flattenDetails(details = {}) {
  const out = {};
  Object.values(details).forEach((section) => {
    (section || []).forEach((row) => {
      if (row && row.title) out[row.title.toLowerCase()] = row.desc;
    });
  });
  return out;
}

function matchProducts(products, text) {
  const q = norm(text);
  if (!q) return [];
  const tokens = q.split(' ').filter((t) => t.length > 1);
  return products
    .map((p) => {
      const hay = norm(`${p.id} ${p.name}`);
      let score = 0;
      if (hay.includes(q)) score += 5;
      tokens.forEach((t) => { if (hay.includes(t)) score += 1; });
      return { p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.p);
}

function filterProducts(products, filters) {
  return products.filter((p) => {
    if (!isPrinter(p)) return false;
    if (filters.format && p.format && norm(p.format) !== norm(filters.format)) return false;
    if (filters.color && p.color && norm(p.color) !== norm(filters.color)) return false;
    if (filters.type && p.type && norm(p.type) !== norm(filters.type)) return false;
    if (filters.function) {
      const fn = norm(p.function || '');
      if (filters.function === 'multifunction' && !fn.includes('multifunction') && !fn.includes('scan') && !fn.includes('copy')) return false;
      if (filters.function === 'print only' && !(fn.includes('print only') || fn === 'print')) return false;
    }
    return true;
  });
}

function detectFiltersFromText(text) {
  const q = norm(text);
  const f = {};
  if (q.includes('a4')) f.format = 'A4';
  if (q.includes('a3')) f.format = 'A3';
  if (q.includes('mono') || q.includes('black and white') || q.includes('black & white')) f.color = 'Mono';
  if (q.includes('colour') || q.includes('color')) f.color = 'Color';
  if (q.includes('laser')) f.type = 'Laser';
  if (q.includes('inkjet') || q.includes('ink tank')) f.type = 'Ink Tank';
  if (q.includes('multifunction') || q.includes('mfp') || q.includes('all in one') || q.includes('all-in-one')) f.function = 'multifunction';
  if (q.includes('single function') || q.includes('print only') || q.includes('printer only')) f.function = 'print only';
  return f;
}

// ---- consumables lookup (tolerant of different products.json shapes) ----
const COMPAT_FIELDS = ['compatiblePrinters', 'compatible', 'compatibleWith', 'compatiblePrinter', 'printers', 'supportedPrinters', 'models'];

const looksLikeConsumable = (p) => {
  const cat = norm(`${p.category || ''} ${p.type || ''} ${p.subcategory || ''}`);
  return /consum|toner|drum|cartridge|ink|developer|kit/.test(cat) || COMPAT_FIELDS.some((f) => p[f]);
};

// model tokens that contain a digit, e.g. "CWC 4500S Multifunction..." -> ["4500s"]
const modelTokens = (printer) =>
  norm(`${printer.id} ${printer.name}`).split(' ').filter((t) => /\d/.test(t) && t.length >= 3);

const compatList = (p) => {
  const out = [];
  COMPAT_FIELDS.forEach((f) => {
    const v = p[f];
    if (!v) return;
    (Array.isArray(v) ? v : String(v).split(/[,;|]/)).forEach((x) => {
      out.push(typeof x === 'object' && x ? norm(`${x.id || ''} ${x.name || ''} ${x.model || ''}`) : norm(x));
    });
  });
  return out.filter(Boolean);
};

function findConsumablesFor(products, printer) {
  const tokens = modelTokens(printer);
  const id = norm(printer.id);
  const name = norm(printer.name);

  const hits = products.filter((p) => {
    if (p.id === printer.id || !looksLikeConsumable(p)) return false;
    // 1) explicit compatibility list (id, name, or model number)
    const list = compatList(p);
    if (list.some((e) => e === id || e === name || (e.length >= 3 && (name.includes(e) || tokens.some((t) => e.includes(t) || t.includes(e)))))) return true;
    // 2) fallback: consumable's own name/description mentions the model number
    const text = norm(`${p.name || ''} ${p.description || ''} ${p.model || ''}`);
    return tokens.some((t) => text.includes(t));
  });

  if (hits.length === 0 && typeof console !== 'undefined') {
    const cons = products.filter(looksLikeConsumable);
    console.warn(
      `[CWCAssistant] No consumables matched "${printer.name}" (id: ${printer.id}). ` +
        `${cons.length} consumable-like products found. Sample entry:`,
      cons[0] || '(none — check that consumables are in the products array and have a category)'
    );
  }
  return hits;
}

const SPEC_KEYWORDS = [
  { keys: ['wifi', 'wi-fi', 'wireless'], labels: ['wi-fi', 'wireless channels', 'interface'] },
  { keys: ['ram', 'memory'], labels: ['ram', 'memory'] },
  { keys: ['fax'], labels: ['fax'] },
  { keys: ['duplex', 'double sided', 'double-sided', 'two sided'], labels: ['duplex printing', 'auto duplex print'] },
  { keys: ['speed', 'ppm', 'fast'], labels: ['print speed'] },
  { keys: ['resolution', 'dpi'], labels: ['print resolution'] },
  { keys: ['warranty'], labels: ['warranty'] },
  { keys: ['weight'], labels: ['weight', 'product weight'] },
  { keys: ['dimension', 'size'], labels: ['dimension', 'dimensions'] },
  { keys: ['noise', 'loud', 'quiet'], labels: ['noise'] },
  { keys: ['power', 'watt', 'consumption'], labels: ['power consumption'] },
  { keys: ['scan'], labels: ['scan speed', 'scanner type'] },
  { keys: ['copy'], labels: ['copy speed'] },
  { keys: ['os', 'operating system', 'windows', 'mac', 'linux'], labels: ['windows', 'mac os', 'linux', 'operating system compatibility'] },
];

function answerSpecQuestion(product, text) {
  const q = norm(text);
  const flat = flattenDetails(product.details);
  for (const group of SPEC_KEYWORDS) {
    if (group.keys.some((k) => q.includes(k))) {
      for (const label of group.labels) {
        const hit = Object.keys(flat).find((k) => k.includes(label));
        if (hit) return { label: hit, value: flat[hit] };
      }
    }
  }
  return null;
}

/* ---------------- intent detection ---------------- */

function detectIntent(text) {
  const q = norm(text);
  if (/warranty|serial|expire|in warranty/.test(q)) return 'WARRANTY_CHECK';
  if (/engineer|technician|service (center|centre|person)|repair|visit|support (in|at|near)|contact.*\b(in|at)\b|all cities|which cities|city ?wise|locations?\b/.test(q))
    return 'ENGINEER_REQUEST';
  if (/\bcompare\b|\bvs\b|versus/.test(q)) return 'COMPARISON';
  if (/\bdriver|download\b/.test(q)) return 'DRIVER_REQUEST';
  if (/\btoner|drum|cartridge|ink\b|consumable/.test(q)) return 'CONSUMABLE_REQUEST';
  if (/\brecommend|suggest|need a printer|looking for a printer|help me choose|which printer/.test(q)) return 'RECOMMENDATION';
  if (/\bshow me|find|list|search|printers?\b.*\b(a4|a3|mono|colou?r|laser|multifunction)\b/.test(q)) return 'PRODUCT_SEARCH';
  if (/\btell me about|details|specs? (of|for)|info(rmation)? (on|about)/.test(q)) return 'PRODUCT_INFO';
  if (/\bhi\b|\bhello\b|\bhey\b/.test(q)) return 'GREETING';
  if (/does .* support|what is|how (much|many)|speed|wifi|ram|fax|resolution/.test(q)) return 'SPEC_QUESTION';
  return 'UNKNOWN';
}

/* ---------------- UI pieces ---------------- */

// Renders **bold** segments
function RichText({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : <React.Fragment key={i}>{p}</React.Fragment>
  );
}

function ProductCard({ product, onAction }) {
  return (
    <div className="w-64 shrink-0 rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="h-28 bg-slate-50 flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain p-2"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <Printer className="h-10 w-10 text-slate-300" />
        )}
      </div>
      <div className="p-3">
        <p className="text-sm font-semibold text-slate-800 leading-snug">{product.name}</p>
        <p className="mt-1 text-xs text-slate-500">
          {[product.format, product.color, product.speed].filter(Boolean).join(' · ')}
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onAction('info', product)}
            className="flex-1 rounded-lg bg-emerald-600 px-2 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 transition-colors"
          >
            View details
          </button>
          {isPrinter(product) && (
            <button
              onClick={() => onAction('driver', product)}
              className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
              title="Get driver"
            >
              <Download className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCardRow({ products, onAction }) {
  if (!products.length) return null;
  return (
    <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
      {products.slice(0, 8).map((p) => (
        <ProductCard key={p.id} product={p} onAction={onAction} />
      ))}
    </div>
  );
}

function QuickReplies({ options, onPick }) {
  if (!options?.length) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onPick(opt)}
          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SpecTable({ rows }) {
  return (
    <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
      <table className="w-full text-xs">
        <tbody>
          {rows.map(([label, value]) => (
            <tr key={label} className="border-b border-slate-100 last:border-0">
              <td className="w-1/3 bg-slate-50 px-2 py-1.5 font-medium text-slate-600 align-top">{label}</td>
              <td className="px-2 py-1.5 text-slate-700 align-top">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompareTable({ a, b }) {
  const flatA = flattenDetails(a.details);
  const flatB = flattenDetails(b.details);
  const rows = [
    ['Speed', a.speed, b.speed],
    ['Colour', a.color, b.color],
    ['Format', a.format, b.format],
    ['Function', a.function, b.function],
  ];
  ['ram', 'memory', 'print resolution', 'duplex printing', 'auto duplex print', 'warranty'].forEach((k) => {
    const va = flatA[k];
    const vb = flatB[k];
    if (va || vb) rows.push([k.replace(/\b\w/g, (c) => c.toUpperCase()), va || '—', vb || '—']);
  });
  return (
    <div className="mt-2 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-2 py-1.5 text-left font-medium text-slate-500">Spec</th>
            <th className="px-2 py-1.5 text-left font-medium text-slate-700">{a.name}</th>
            <th className="px-2 py-1.5 text-left font-medium text-slate-700">{b.name}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([label, va, vb]) => (
            <tr key={label} className="border-t border-slate-100">
              <td className="px-2 py-1.5 font-medium text-slate-500">{label}</td>
              <td className="px-2 py-1.5 text-slate-700">{va || '—'}</td>
              <td className="px-2 py-1.5 text-slate-700">{vb || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ShortcutButton({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-1 flex-col items-center gap-0.5 rounded-lg py-1.5 text-[10px] text-slate-500 hover:bg-slate-50 hover:text-emerald-600 transition-colors"
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

/* ---------------- main component ---------------- */

const TOP_LEVEL_QUICK_ACTIONS = [
  'Find a printer',
  'Download a driver',
  'Compare printers',
  'Product information',
  'Check warranty',
  'Find service engineer',
];

let msgId = 0;
const nextId = () => `m${++msgId}`;

// Tailwind can't see dynamically built class names, so map them explicitly.
const ACCENTS = {
  indigo: { solid: 'bg-indigo-600', hover: 'hover:bg-indigo-700' },
  blue: { solid: 'bg-blue-600', hover: 'hover:bg-blue-700' },
  emerald: { solid: 'bg-emerald-600', hover: 'hover:bg-emerald-700' },
  rose: { solid: 'bg-rose-600', hover: 'hover:bg-rose-700' },
  slate: { solid: 'bg-slate-800', hover: 'hover:bg-slate-900' },
};

export default function CWCAssistant({
  products,
  brandName = 'CWC',
  accent = 'emerald',
  position = 'right',     // 'right' | 'left'
  bottomOffset = 120,     // px from bottom — keeps it clear of the "Raise a complaint" button
}) {
  const ac = ACCENTS[accent] || ACCENTS.indigo;
  const catalog = useMemo(() => products || [], [products]);
  const printers = useMemo(() => catalog.filter(isPrinter), [catalog]);

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: nextId(),
      role: 'bot',
      text: `👋 Hi! I'm the ${brandName} Assistant. I can help you find a printer, get drivers, compare models, check warranty, or find a service engineer near you.`,
      quickReplies: TOP_LEVEL_QUICK_ACTIONS,
    },
  ]);
  const [pending, setPending] = useState(null);
  const scrollRef = useRef(null);
  const [teaser, setTeaser] = useState(false);

  // gentle "Need help?" nudge a few seconds after load (once)
  useEffect(() => {
    const t = setTimeout(() => setTeaser(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, open]);

  const pushBot = (partial) => setMessages((m) => [...m, { id: nextId(), role: 'bot', ...partial }]);
  const pushUser = (text) => setMessages((m) => [...m, { id: nextId(), role: 'user', text }]);

  /* ---- warranty ---- */
  function askSerial() {
    pushBot({ text: "Please enter your printer's serial number (printed on the label at the back of the printer)." });
    setPending({ type: 'AWAIT_SERIAL' });
  }
  function runWarranty(serial) {
    const r = checkWarranty(serial);
    pushBot({
      text: warrantyMessage(r),
      quickReplies: r.found && !r.active ? ['Find service engineer'] : undefined,
    });
  }

  /* ---- engineers ---- */
  function askCity() {
    pushBot({ text: 'Select your city to see the service engineers there:', quickReplies: availableCities() });
    setPending({ type: 'AWAIT_CITY' });
  }
  function runEngineer(text) {
    const center = findServiceCenter(text);
    if (center) {
      setPending(null);
      pushBot({ text: engineerMessage(center) });
    } else {
      pushBot({
        text: "I don't have an engineer listed for that location. Please pick one of these, or type another city:",
        quickReplies: availableCities(),
      });
      setPending({ type: 'AWAIT_CITY' });
    }
  }

  /* ---- drivers ---- */
  function startDriverFlow(product) {
    const available = Object.entries(product.drivers || {}).filter(([, path]) => path);
    if (available.length === 0) {
      pushBot({
        text: `Sorry — a driver download isn't currently available for **${product.name}**.`,
        quickReplies: ['Contact support', 'Search another printer'],
      });
      setPending(null);
      return;
    }
    if (available.length === 1) {
      const [os, path] = available[0];
      pushBot({
        text: `Here's the ${os} driver for **${product.name}**:`,
        download: { label: `${product.name} — ${os} Driver`, path },
      });
      setPending(null);
      return;
    }
    pushBot({ text: `Sure! Which operating system for **${product.name}**?`, quickReplies: available.map(([os]) => os) });
    setPending({ type: 'AWAIT_OS', productId: product.id });
  }

  function resolveDriverOS(product, osLabel) {
    const match = Object.entries(product.drivers || {}).find(([os]) => norm(os) === norm(osLabel));
    if (!match || !match[1]) {
      pushBot({ text: `I don't have a ${osLabel} driver for ${product.name}. Try another OS or contact support.` });
      return;
    }
    pushBot({
      text: `${product.name} — ${match[0]} driver:`,
      download: { label: `${product.name} ${match[0]} Driver`, path: match[1] },
    });
  }

  /* ---- compare ---- */
  function tryCompare(text) {
    const parts = text.split(/\bvs\.?\b|\bversus\b|\band\b|,/i).map((s) => s.trim()).filter(Boolean);
    const found = parts.map((part) => matchProducts(printers, part)[0]).filter(Boolean);
    if (found.length >= 2) {
      const [a, b] = found;
      pushBot({ text: `Comparing **${a.name}** and **${b.name}**:`, compare: { a, b } });
    } else {
      pushBot({ text: 'Tell me the two printers you\'d like to compare, e.g. "compare 4500S and 4055".' });
    }
  }

  /* ---- recommendation wizard (user message is pushed by handleUserText) ---- */
  function startRecommendation() {
    pushBot({ text: 'What type of printing do you need?', quickReplies: ['Mono', 'Colour'] });
    setPending({ type: 'REC_COLOR', filters: {} });
  }

  function advanceRecommendation(choice) {
    const step = pending;
    if (step.type === 'REC_COLOR') {
      const color = norm(choice).startsWith('colo') ? 'Color' : 'Mono';
      pushBot({ text: 'What size?', quickReplies: ['A4', 'A3'] });
      setPending({ type: 'REC_FORMAT', filters: { ...step.filters, color } });
      return;
    }
    if (step.type === 'REC_FORMAT') {
      pushBot({ text: 'Do you need scanning and copying?', quickReplies: ['Yes', 'No'] });
      setPending({ type: 'REC_FUNCTION', filters: { ...step.filters, format: choice.toUpperCase() } });
      return;
    }
    if (step.type === 'REC_FUNCTION') {
      const filters = { ...step.filters, function: norm(choice) === 'yes' ? 'multifunction' : 'print only' };
      const results = filterProducts(printers, filters);
      if (results.length === 0) {
        const relaxed = filterProducts(printers, { color: filters.color, format: filters.format });
        pushBot({ text: "I couldn't find an exact match — here are close options:", products: relaxed.slice(0, 6) });
      } else {
        pushBot({ text: 'Here are printers matching your needs:', products: results.slice(0, 6) });
      }
      setPending(null);
    }
  }

  /* ---- product info ---- */
  function showProductInfo(product) {
    const flat = flattenDetails(product.details);
    const rows = [
      ['Type', product.type],
      ['Colour', product.color],
      ['Format', product.format],
      ['Function', product.function],
      ['Speed', product.speed],
      ['Warranty', flat['warranty']],
      ['Connectivity', flat['interface'] || flat['interface type']],
    ].filter(([, v]) => v);
    pushBot({
      text: `**${product.name}**`,
      products: [product],
      specRows: rows,
      quickReplies: ['Download driver', 'Show toner info', 'Compare with another'],
    });
    setPending({ type: 'CONTEXT', productId: product.id });
  }

  function showConsumableInfo(product) {
    const items = findConsumablesFor(catalog, product);
    if (items.length === 0) {
      pushBot({
        text: `I couldn't find toner/drum details for ${product.name}. Our team can confirm the right consumable for you.`,
        quickReplies: ['Find service engineer'],
      });
      return;
    }
    const rows = items.map((c) => [
      c.name,
      c.yield == null ? '' : typeof c.yield === 'object' ? JSON.stringify(c.yield) : String(c.yield),
    ]);
    pushBot({ text: `Consumables for **${product.name}**:`, specRows: rows, products: items });
  }

  /* ---- master dispatcher ---- */
  function handleUserText(raw) {
    const text = raw.trim();
    if (!text) return;
    pushUser(text);

    // multi-step flows first
    if (pending?.type === 'AWAIT_OS') {
      const product = catalog.find((p) => p.id === pending.productId);
      setPending(null);
      if (product) resolveDriverOS(product, text);
      return;
    }
    if (pending?.type?.startsWith('REC_')) {
      advanceRecommendation(text);
      return;
    }
    if (pending?.type === 'AWAIT_SERIAL') {
      setPending(null);
      runWarranty(extractSerial(text) || text);
      return;
    }
    if (pending?.type === 'AWAIT_CITY') {
      runEngineer(text);
      return;
    }

    switch (detectIntent(text)) {
      case 'GREETING':
        pushBot({ text: 'Hello! What can I help you with?', quickReplies: TOP_LEVEL_QUICK_ACTIONS });
        return;

      case 'WARRANTY_CHECK': {
        const serial = extractSerial(text);
        if (serial) { runWarranty(serial); return; }
        // "what is the warranty of 4500S" -> product spec, otherwise ask for a serial
        const prod = matchProducts(printers, text)[0];
        const ans = prod && answerSpecQuestion(prod, text);
        if (ans) pushBot({ text: `**${prod.name}** — ${ans.label}: ${ans.value}` });
        else askSerial();
        return;
      }

      case 'ENGINEER_REQUEST': {
        if (findServiceCenter(text)) runEngineer(text);
        else askCity();
        return;
      }

      case 'DRIVER_REQUEST': {
        const found = matchProducts(printers, text);
        if (found[0]) startDriverFlow(found[0]);
        else pushBot({ text: 'Which printer do you need a driver for? (e.g. "driver for 4500S")' });
        return;
      }
      case 'COMPARISON':
        tryCompare(text);
        return;
      case 'CONSUMABLE_REQUEST': {
        const found = matchProducts(printers, text)[0];
        if (found) showConsumableInfo(found);
        else pushBot({ text: "Which printer's toner/drum would you like to know about?" });
        return;
      }
      case 'RECOMMENDATION':
        startRecommendation();
        return;
      case 'PRODUCT_SEARCH': {
        const results = filterProducts(printers, detectFiltersFromText(text));
        if (results.length) {
          pushBot({ text: `I found ${results.length} matching printer${results.length > 1 ? 's' : ''}:`, products: results.slice(0, 8) });
        } else {
          pushBot({ text: "I couldn't find a match — try mentioning size (A4/A3), colour (mono/colour) or function (multifunction/print only)." });
        }
        return;
      }
      case 'PRODUCT_INFO': {
        const found = matchProducts(printers, text)[0];
        if (found) showProductInfo(found);
        else pushBot({ text: 'Which product would you like details on?' });
        return;
      }
      case 'SPEC_QUESTION': {
        const found =
          matchProducts(printers, text)[0] ||
          (pending?.productId && catalog.find((p) => p.id === pending.productId));
        if (found) {
          const answer = answerSpecQuestion(found, text);
          if (answer) pushBot({ text: `**${found.name}** — ${answer.label}: ${answer.value}` });
          else {
            pushBot({ text: `I don't have that specific spec on file for ${found.name}. Want the full spec sheet?`, quickReplies: ['Show full specs'] });
            setPending({ type: 'CONTEXT', productId: found.id });
          }
        } else {
          pushBot({ text: 'Which product is this question about?' });
        }
        return;
      }
      default: {
        const found = matchProducts(catalog, text)[0];
        if (found && isPrinter(found)) showProductInfo(found);
        else if (found && isConsumable(found)) pushBot({ text: found.name, products: [found] });
        else
          pushBot({
            text: "I'm not sure I follow — I can search printers, pull specs, fetch drivers, compare models, check warranty, or find a service engineer.",
            quickReplies: TOP_LEVEL_QUICK_ACTIONS,
          });
      }
    }
  }

  function handleQuickReply(label) {
    const ctxProduct = () => (pending?.productId ? catalog.find((p) => p.id === pending.productId) : null);
    switch (label) {
      case 'Find a printer':
        pushUser(label);
        pushBot({
          text: 'Great — tell me what you need (e.g. "A4 mono multifunction") or I can ask a few quick questions.',
          quickReplies: ['Ask me questions', "I'll type it myself"],
        });
        return;
      case 'Ask me questions':
        pushUser(label);
        startRecommendation();
        return;
      case "I'll type it myself":
        pushUser(label);
        pushBot({ text: 'Go ahead — describe the printer you need.' });
        return;
      case 'Download a driver':
        pushUser(label);
        pushBot({ text: 'Which printer do you need a driver for?' });
        return;
      case 'Compare printers':
        pushUser(label);
        pushBot({ text: 'Which two printers should I compare? e.g. "4500S and 4055"' });
        return;
      case 'Product information':
        pushUser(label);
        pushBot({ text: 'Which product would you like to know about?' });
        return;
      case 'Check warranty':
        pushUser(label);
        askSerial();
        return;
      case 'Find service engineer':
      case 'Contact support':
        pushUser(label);
        askCity();
        return;
      case 'Show full specs':
      case 'Show toner info': {
        const product = ctxProduct();
        if (!product) return handleUserText(label);
        pushUser(label);
        if (label === 'Show toner info') showConsumableInfo(product);
        else pushBot({ text: `Full specs — ${product.name}:`, specRows: Object.entries(flattenDetails(product.details)).slice(0, 14) });
        return;
      }
      case 'Search another printer':
        pushUser(label);
        pushBot({ text: 'Sure — what are you looking for?' });
        return;
      case 'Download driver': {
        pushUser(label);
        const product = ctxProduct();
        if (product) startDriverFlow(product);
        else pushBot({ text: 'Which printer do you need a driver for?' });
        return;
      }
      case 'Compare with another':
        pushUser(label);
        pushBot({ text: 'Which other printer should I compare it with?' });
        return;
      default:
        handleUserText(label);
    }
  }

  function handleCardAction(action, product) {
    if (action === 'info') showProductInfo(product);
    if (action === 'driver') startDriverFlow(product);
  }

  function onSubmit(e) {
    e.preventDefault();
    handleUserText(input);
    setInput('');
  }

  return (
    <div
      className={`fixed z-[60] flex flex-col font-sans ${position === 'left' ? 'left-5 items-start' : 'right-5 items-end'}`}
      style={{ bottom: bottomOffset }}
    >
      {open && (
        <div className="mb-3 flex h-[min(560px,calc(100vh-200px))] w-[360px] max-w-[92vw] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-gradient-to-r from-emerald-700 to-emerald-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Printer className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold leading-none">{brandName} Assistant</p>
                <p className="mt-0.5 text-[11px] text-white/80">Online</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="rounded p-1 hover:bg-white/10" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-slate-50 px-3 py-3">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                  {m.text && (
                    <div
                      className={`rounded-2xl px-3 py-2 text-sm leading-snug whitespace-pre-wrap ${
                        m.role === 'user'
                          ? `${ac.solid} text-white rounded-br-sm`
                          : 'bg-white text-slate-700 border border-slate-200 rounded-bl-sm'
                      }`}
                    >
                      <RichText text={m.text} />
                    </div>
                  )}
                  {m.products && <ProductCardRow products={m.products} onAction={handleCardAction} />}
                  {m.specRows && <SpecTable rows={m.specRows} />}
                  {m.compare && <CompareTable a={m.compare.a} b={m.compare.b} />}
                  {m.download && (
                    <a
                      href={m.download.path}
                      download
                      className={`inline-flex items-center gap-1.5 rounded-lg ${ac.solid} ${ac.hover} px-3 py-1.5 text-xs font-medium text-white`}
                    >
                      <Download className="h-3.5 w-3.5" /> {m.download.label}
                    </a>
                  )}
                  {m.quickReplies && <QuickReplies options={m.quickReplies} onPick={handleQuickReply} />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-1.5 border-t border-slate-100 bg-white px-2 py-1.5">
            <ShortcutButton icon={SearchIcon} label="Search" onClick={() => handleQuickReply('Find a printer')} />
            <ShortcutButton icon={Download} label="Drivers" onClick={() => handleQuickReply('Download a driver')} />
            <ShortcutButton icon={GitCompareArrows} label="Compare" onClick={() => handleQuickReply('Compare printers')} />
            <ShortcutButton icon={Droplets} label="Toner" onClick={() => handleUserText('what toner does my printer use')} />
            <ShortcutButton icon={ShieldCheck} label="Warranty" onClick={() => handleQuickReply('Check warranty')} />
            <ShortcutButton icon={Wrench} label="Support" onClick={() => handleQuickReply('Find service engineer')} />
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-slate-200 bg-white p-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
            />
            <button
              type="submit"
              className={`flex h-9 w-9 items-center justify-center rounded-full ${ac.solid} ${ac.hover} text-white disabled:opacity-40`}
              disabled={!input.trim()}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {teaser && !open && (
        <div className="relative mb-3 max-w-[230px] rounded-2xl rounded-br-md border border-emerald-100 bg-white py-2.5 pl-3 pr-8 text-xs leading-snug text-slate-700 shadow-lg">
          <span className="font-semibold text-emerald-700">Need help? 👋</span>
          <br />
          Find a printer, drivers, warranty or a service engineer.
          <button
            onClick={() => setTeaser(false)}
            className="absolute right-1.5 top-1.5 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            aria-label="Dismiss"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      <button
        onClick={() => { setOpen((o) => !o); setTeaser(false); }}
        className={`group relative flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 pl-3 pr-5 text-white shadow-xl shadow-emerald-900/30 ring-4 ring-white/80 transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95`}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
      >
        {!open && <span className="pointer-events-none absolute inset-0 rounded-full bg-emerald-500/40 animate-ping" />}
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
          {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
          {!open && <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-emerald-600 bg-lime-300" />}
        </span>
        <span className="relative text-sm font-semibold tracking-wide">{open ? 'Close' : `Ask ${brandName}`}</span>
      </button>
    </div>
  );
}