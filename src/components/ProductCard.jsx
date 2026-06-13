import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronRight } from 'lucide-react';

export default function ProductCard({ product, singleImage = false }) {
  // Consumables (Cartridge, Toner, Drum Unit) only have one image uploaded.
  // When singleImage=true, use img1 directly instead of the main hero image.
  const displayImage = singleImage ? product.img1 : product.image;

  return (
    <div className="bg-white dark:bg-brand-darkCard rounded-[2rem] overflow-hidden transition-all duration-500 border border-brand-secondary dark:border-gray-800 hover:shadow-3d hover:-translate-y-2 group flex flex-col h-full relative">
      
      {/* Invisible overlay link covers the entire card */}
      <Link 
        to={`/products/${product.id}`} 
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`View details for ${product.name}`}
      />

      {/* IMAGE CONTAINER */}
      <div className="relative w-full aspect-square bg-brand-primary/30 dark:bg-gray-800/50 flex items-center justify-center p-8 overflow-hidden border-b border-brand-secondary dark:border-gray-800">
        <img 
          src={displayImage} 
          alt={product.name} 
          className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=CWC+Printer'; }}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-white/90 dark:bg-brand-darkBg/90 backdrop-blur-md text-brand-text dark:text-brand-darkText shadow-sm text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.15em] border border-brand-secondary dark:border-gray-700 z-10">
          {product.type}
        </div>

        {/* Hover Indicator Icon */}
        <div className="absolute top-4 right-4 p-2 bg-brand-accent text-white rounded-full opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 shadow-lg z-10">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>
      
      {/* CONTENT AREA */}
      <div className="p-6 flex flex-col flex-grow relative z-10">
        <h3 className="font-extrabold text-xl mb-3 text-brand-text dark:text-brand-darkText line-clamp-2 min-h-[3.5rem] leading-tight group-hover:text-brand-accent transition-colors">
          {product.name}
        </h3>
        
        {/* Quick Specs summary */}
        <div className="flex flex-col gap-2 mb-6">
          {product.specSummary?.slice(0, 2).map((spec, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-brand-accent rounded-full shrink-0 group-hover:scale-150 transition-transform"></div>
              <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide truncate">
                {spec}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-5 border-t border-brand-secondary dark:border-gray-800 flex items-center justify-between">
          <span className="text-xs font-black text-brand-accent uppercase tracking-[0.2em] group-hover:tracking-[0.25em] transition-all">
            View Details
          </span>
          <div className="w-8 h-8 rounded-lg bg-brand-primary dark:bg-gray-800 flex items-center justify-center text-brand-text dark:text-gray-400 group-hover:bg-brand-accent group-hover:text-white transition-all">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}