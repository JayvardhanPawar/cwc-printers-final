import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';

export default function FilterSidebar() {
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ FIX: Read category from URL only — never derive it.
  const currentCategory = searchParams.get('category') || 'all';

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    // Toggle: uncheck if already active
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }

    // ✅ FIX: Preserve the category param so it isn't silently dropped on filter toggle.
    if (currentCategory !== 'all' && !newParams.has('category')) {
      newParams.set('category', currentCategory);
    }

    setSearchParams(newParams);
  };

  // ✅ FIX: "Clear All" only wipes attribute filters — it preserves the active category tab.
  const handleClearFilters = () => {
    setSearchParams(currentCategory !== 'all' ? { category: currentCategory } : {});
  };

  const FilterSection = ({ title, filterKey, options }) => (
    <div className="mb-6">
      <h3 className="font-bold mb-3 text-brand-text dark:text-brand-darkText border-b border-brand-secondary dark:border-gray-700 pb-2 text-[10px] uppercase tracking-widest">
        {title}
      </h3>
      <div className="space-y-2">
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
    <aside className="w-full md:w-64 shrink-0 bg-white dark:bg-brand-darkCard p-6 rounded-xl shadow-sm border border-brand-secondary dark:border-gray-800 h-fit sticky top-24">
      <FilterSection title="Printer Type" filterKey="type" options={['Laser', 'Inkjet', 'Barcode']} />
      <FilterSection title="Color"        filterKey="color"    options={['Color', 'Mono']} />
      <FilterSection title="Format"       filterKey="format"   options={['A3', 'A4']} />
      <FilterSection title="Function"     filterKey="function" options={['Print Only', 'Multifunction']} />

      <button
        onClick={handleClearFilters}
        className="w-full py-2 mt-4 text-sm font-medium text-brand-text bg-brand-secondary dark:bg-gray-700 dark:text-white rounded hover:bg-brand-highlight hover:text-white transition-colors"
      >
        Clear All Filters
      </button>
    </aside>
  );
}