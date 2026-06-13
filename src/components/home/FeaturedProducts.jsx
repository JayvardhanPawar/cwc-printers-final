import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../ProductCard';
import productsData from "../../data/products.json";

const tabs = [
  { id: 'multifunction', label: 'Multifunction',  filter: p => p.function === 'Multifunction' && p.format === 'A4' },
  { id: 'single',        label: 'Single Function', filter: p => p.function === 'Print Only' },
  { id: 'a3',            label: 'A3 Printers',     filter: p => p.format === 'A3' },
];

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('multifunction');

  const currentFilter = tabs.find(t => t.id === activeTab)?.filter ?? (() => true);
  const filtered = productsData
    .filter(p => p.category === 'printers' && currentFilter(p))
    .slice(0, 3);

  return (
    <section
      style={{
        paddingTop: '120px',
        paddingBottom: '96px',
        paddingLeft: '32px',
        paddingRight: '32px',
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '24px' }}>
        <div>
          <h2 className="text-4xl font-bold text-brand-text dark:text-brand-darkText mb-3">
            Flagship Models
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            Our most popular solutions for small business and industrial scaling.
          </p>
        </div>
        <Link
          to="/products"
          className="group flex items-center gap-2 text-brand-accent font-bold hover:text-brand-highlight px-6 py-3 bg-brand-accent/5 rounded-xl transition-all"
        >
          Browse All Hardware{' '}
          <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '40px',
          position: 'relative',
          zIndex: 30,
        }}
      >
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '10px 28px',
              borderRadius: '999px',
              fontSize: '14px',
              fontWeight: '700',
              letterSpacing: '0.03em',
              cursor: 'pointer',
              outline: 'none',
              transition: 'all 0.2s ease',
              border: '2px solid #16A34A',
              backgroundColor: activeTab === tab.id ? '#16A34A' : 'transparent',
              color: activeTab === tab.id ? '#ffffff' : '#16A34A',
              boxShadow: activeTab === tab.id ? '0 4px 14px rgba(22,163,74,0.35)' : 'none',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p style={{ textAlign: 'center', padding: '64px 0', color: '#6b7280' }}>
          No products found in this category.
        </p>
      )}
    </section>
  );
}