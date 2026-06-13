import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { X, Printer, PackageOpen, LayoutGrid, Search, SlidersHorizontal, Check, ChevronDown, Loader2, ScanLine } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const CONSUMABLE_TYPES = ['Cartridge', 'Toner', 'Drum Unit'];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleLimit, setVisibleLimit] = useState(28);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // ✅ FIX 1: Only read category from the explicit URL param — never derive it from typeParam.
  // Deriving category from typeParam caused a silent category switch that double-filtered results
  // and made the wrong sidebar tab appear active.
  const currentCategory = searchParams.get('category') || 'all';

  useEffect(() => {
    if (isMobileFilterOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileFilterOpen]);

  useEffect(() => {
    let result = productsData;

    // Step 1: narrow by category
    if (currentCategory === 'printers') {
      result = result.filter(p => ['Laser', 'Inkjet', 'Barcode'].includes(p.type));
    } else if (currentCategory === 'consumables') {
      result = result.filter(p => CONSUMABLE_TYPES.includes(p.type));
    } else if (currentCategory === 'scanners') {
      result = result.filter(p => ['Flatbed', 'Document', 'Portable'].includes(p.type));
    }

    // Step 2: apply attribute filters on top of that pool
    // ✅ FIX 2: Only apply typeFilter when explicitly set in URL, not when derived from category.
    // Previously, category derivation + typeFilter both ran, causing over-filtering.
    const typeFilter     = searchParams.get('type');
    const formatFilter   = searchParams.get('format');
    const functionFilter = searchParams.get('function');
    const colorFilter    = searchParams.get('color');

    if (typeFilter)     result = result.filter(p => p.type?.toLowerCase()     === typeFilter.toLowerCase());
    if (formatFilter)   result = result.filter(p => p.format?.toLowerCase()   === formatFilter.toLowerCase());
    if (functionFilter) result = result.filter(p => p.function?.toLowerCase() === functionFilter.toLowerCase());
    if (colorFilter)    result = result.filter(p => p.color?.toLowerCase()    === colorFilter.toLowerCase());

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.type?.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
    setVisibleLimit(28);
  }, [searchParams, currentCategory, searchQuery]);

  const handleViewMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleLimit(prev => prev + 28);
      setIsLoadingMore(false);
    }, 600);
  };

  const currentProducts = filteredProducts.slice(0, visibleLimit);
  const hasMore = visibleLimit < filteredProducts.length;

  const handleCategorySwitch = (cat) => {
    // Clear all attribute filters when switching category — correct behaviour
    setSearchParams(cat === 'all' ? {} : { category: cat });
    setSearchQuery('');
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    // Toggle: remove if already active, set if not
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    // ✅ FIX 3: Always preserve the explicit category param so it isn't lost on filter toggles.
    // Previously the guard `currentCategory !== 'all'` used the derived value, which could
    // be wrong. Now currentCategory is always the URL value so this is always reliable.
    if (currentCategory !== 'all' && !newParams.has('category')) {
      newParams.set('category', currentCategory);
    }

    setSearchParams(newParams);
  };

  const FilterSection = ({ title, filterKey, options }) => (
    <div className="mb-8">
      <h3 className="font-black mb-4 text-brand-text dark:text-brand-darkText border-b border-brand-secondary dark:border-gray-800 pb-2 text-[10px] uppercase tracking-[0.2em]">
        {title}
      </h3>
      <div className="space-y-3">
        {options.map((opt) => (
          <label key={opt} className="flex items-center space-x-3 cursor-pointer group">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={searchParams.get(filterKey) === opt}
                onChange={() => handleFilterChange(filterKey, opt)}
                className="peer w-4 h-4 rounded border-brand-secondary text-brand-accent focus:ring-brand-accent dark:border-gray-700 dark:bg-gray-800 transition-all appearance-none border-2 checked:bg-brand-accent checked:border-brand-accent"
              />
              <Check className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 left-0.5 pointer-events-none" />
            </div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-brand-accent transition-colors">
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="pt-32 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8">

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 right-0 z-[70] w-full max-w-xs bg-white dark:bg-brand-darkCard p-6 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:inset-auto md:z-0 md:w-64 md:shrink-0 md:shadow-none md:border md:border-brand-secondary md:dark:border-gray-800 md:rounded-[2rem] md:h-fit md:sticky md:top-28 md:translate-x-0 ${isMobileFilterOpen ? 'translate-x-0' : 'translate-x-full'}`}>

        <div className="flex items-center justify-between md:hidden mb-8">
          <h2 className="font-black text-lg uppercase tracking-tight text-brand-text dark:text-white">Refine By</h2>
          <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 text-gray-500 bg-brand-primary dark:bg-gray-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CATEGORY TABS */}
        <div className="bg-brand-primary dark:bg-gray-800/50 p-1.5 rounded-2xl mb-8 flex flex-col gap-1.5 border border-brand-secondary dark:border-gray-800">
          <button
            onClick={() => handleCategorySwitch('all')}
            className={`py-2.5 px-4 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-3 ${currentCategory === 'all' ? 'bg-brand-text text-white shadow-lg' : 'text-gray-400 hover:text-brand-text dark:hover:text-white'}`}
          >
            <LayoutGrid className="w-4 h-4" /> All Products
          </button>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleCategorySwitch('printers')}
              className={`py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${currentCategory === 'printers' ? 'bg-brand-text text-white shadow-lg' : 'text-gray-400 hover:text-brand-text'}`}
            >
              <Printer className="w-3.5 h-3.5" /> Printers
            </button>
            <button
              onClick={() => handleCategorySwitch('scanners')}
              className={`py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${currentCategory === 'scanners' ? 'bg-brand-text text-white shadow-lg' : 'text-gray-400 hover:text-brand-text'}`}
            >
              <ScanLine className="w-3.5 h-3.5" /> Scanners 
            </button>
            <button
              onClick={() => handleCategorySwitch('consumables')}
              className={`py-2.5 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 ${currentCategory === 'consumables' ? 'bg-brand-text text-white shadow-lg' : 'text-gray-400 hover:text-brand-text'}`}
            >
              <PackageOpen className="w-3.5 h-3.5" /> Supplies
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {(currentCategory === 'printers' || currentCategory === 'all') && (
            <>
              <FilterSection title="Technology" filterKey="type" options={['Laser', 'Inkjet', 'Barcode']} />
              <FilterSection title="Color" filterKey="color" options={['Color', 'Mono']} />
              <FilterSection title="Format" filterKey="format" options={['A3', 'A4']} />
              <FilterSection title="Function" filterKey="function" options={['Print Only', 'Multifunction']} />
            </>
          )}
          {currentCategory === 'scanners' && (
            <>
              <FilterSection title="Scanner Type" filterKey="type" options={['Flatbed', 'Document', 'Portable']} />
              <FilterSection title="Max Paper Size" filterKey="format" options={['A3', 'A4', 'Legal']} />
            </>
          )}
          {currentCategory === 'consumables' && (
            <FilterSection title="Supply Type" filterKey="type" options={['Cartridge', 'Toner', 'Drum Unit']} />
          )}
        </div>
      </aside>

      {/* MAIN GRID */}
      <main className="flex-1 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-brand-secondary dark:border-gray-800">
          <div>
            <span className="text-brand-accent font-black uppercase tracking-[0.3em] text-[9px] mb-2 block">CWC Hardware Ecosystem</span>
            <h1 className="text-4xl md:text-5xl font-black text-brand-text dark:text-white tracking-tighter italic leading-none">
              {currentCategory === 'printers' ? 'Precision Printers' :
               currentCategory === 'scanners' ? 'Imaging Scanners' :
               currentCategory === 'consumables' ? 'Official Supplies' : 'Product Catalog'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-brand-accent transition-colors" />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-80 bg-white dark:bg-brand-darkCard border border-brand-secondary dark:border-gray-800 focus:border-brand-accent rounded-xl py-3 pl-11 pr-4 outline-none dark:text-white text-xs font-bold transition-all shadow-sm"
              />
            </div>
            <button onClick={() => setIsMobileFilterOpen(true)} className="md:hidden p-3 bg-brand-text text-white rounded-xl shadow-3d">
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-700">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  singleImage={CONSUMABLE_TYPES.includes(product.type)}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Showing {currentProducts.length} of {filteredProducts.length} Products
                </p>
                <button
                  onClick={handleViewMore}
                  disabled={isLoadingMore}
                  className="flex items-center gap-3 bg-brand-text dark:bg-brand-accent text-white px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 disabled:opacity-50"
                >
                  {isLoadingMore ? <Loader2 className="w-4 h-4 animate-spin" /> : <>View More <ChevronDown className="w-4 h-4" /></>}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center bg-white dark:bg-brand-darkCard rounded-[3rem] border border-dashed border-brand-secondary dark:border-gray-800">
            <div className="p-6 bg-brand-primary dark:bg-gray-800 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-brand-text dark:text-white tracking-tight">No Results Found</h3>
          </div>
        )}
      </main>
    </div>
  );
}