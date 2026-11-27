import { useState } from 'react';
import { ArrowUpRight, Ruler } from 'lucide-react';
import {
  CATALOG_CATEGORIES,
  CATALOG_ITEMS,
  CatalogItem,
  ProductCategory,
  formatRupiah,
} from '../data/konveksiData';
import { ResilientImage } from './ResilientImage';

interface CatalogSectionProps {
  onSelectForEstimator: (estimatorTypeId: string) => void;
  onInspectProduct: (item: CatalogItem) => void;
}

export function CatalogSection({
  onSelectForEstimator,
  onInspectProduct,
}: CatalogSectionProps) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('Semua');

  const filteredItems =
    activeCategory === 'Semua'
      ? CATALOG_ITEMS
      : CATALOG_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="katalog" className="py-16 lg:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Interactive Filter Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-slate-200">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-800 mb-2">
              Katalog Produksi &amp; Jasa Jahit
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Produksi pakaian seragam hingga kebutuhan acara khusus
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Setiap pesanan dikerjakan langsung di workshop kami dengan pemilihan kain teruji, pola ukuran lengkap, serta pengerjaan bordir komputer dan sablon mandiri.
            </p>
          </div>

          {/* Functional Segmented Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter kategori produk konveksi"
            className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100 rounded-xl self-start lg:self-auto"
          >
            {CATALOG_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800 ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const isFeaturedWide = activeCategory === 'Semua' && idx === 0;
            return (
              <article
                key={item.id}
                className={`group bg-slate-50 border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between transition-colors hover:border-slate-300 ${
                  isFeaturedWide ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div>
                  <div
                    className={`relative overflow-hidden bg-slate-200 ${
                      isFeaturedWide ? 'aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3]'
                    }`}
                  >
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      fallbackLabel={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>

                  <div className="p-6">
                    {/* Clean unboxed metadata with typographic separators (no pills) */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>Min. {item.minOrder} pcs</span>
                      <span aria-hidden="true">·</span>
                      <span>{item.leadTimeDays}</span>
                    </div>

                    <h3 className="mt-2 font-display text-xl font-bold text-slate-900 tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>

                    <p className="mt-3 text-xs text-slate-500">
                      Bahan utama: {item.fabricSummary}
                    </p>
                  </div>
                </div>

                {/* Card Footer: Price + Actions */}
                <div className="px-6 py-4 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-slate-500">Estimasi mulai</span>
                    <span className="font-mono-tabular text-base font-semibold text-slate-900">
                      {formatRupiah(item.startingPrice)}
                      <span className="text-xs font-normal text-slate-500">/pcs</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectProduct(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
                    >
                      <Ruler className="w-3.5 h-3.5" aria-hidden="true" />
                      Spesifikasi
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectForEstimator(item.estimatorTypeId)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
                    >
                      Hitung Harga
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
