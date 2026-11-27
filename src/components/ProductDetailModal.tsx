import { useEffect } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import {
  CatalogItem,
  STANDARD_SIZE_CHART,
  formatRupiah,
} from '../data/konveksiData';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: CatalogItem | null;
  onClose: () => void;
  onSelectForEstimator: (estimatorTypeId: string) => void;
}

export function ProductDetailModal({
  product,
  onClose,
  onSelectForEstimator,
}: ProductDetailModalProps) {
  useEffect(() => {
    if (!product) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="bg-white border border-slate-200 rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>{product.category}</span>
              <span aria-hidden="true">·</span>
              <span>Min. {product.minOrder} pcs</span>
            </div>
            <h3
              id="modal-product-title"
              className="font-display text-lg sm:text-xl font-bold text-slate-900 truncate"
            >
              {product.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup detail produk"
            className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
              <ResilientImage
                src={product.image}
                alt={product.imageAlt}
                fallbackLabel={product.title}
              />
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="py-3 border-y border-slate-200 grid grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-slate-500">Harga Mulai</span>
                  <span className="font-mono-tabular text-lg font-bold text-slate-900">
                    {formatRupiah(product.startingPrice)}
                  </span>
                </div>
                <div>
                  <span className="block text-xs text-slate-500">Estimasi Waktu</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {product.leadTimeDays}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-900 mb-2">
                  Spesifikasi Produksi
                </h4>
                <ul className="space-y-2">
                  {product.specifications.map((spec) => (
                    <li
                      key={spec}
                      className="flex items-start gap-2.5 text-sm text-slate-600"
                    >
                      <Check
                        className="w-4 h-4 text-blue-800 shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Standard Size Chart */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Panduan Standar Ukuran Dewasa (cm)
              </h4>
              <span className="text-xs text-slate-500">
                Toleransi jahitan ±1 cm · Tersedia ukuran khusus anak &amp; hingga 5XL
              </span>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <th className="py-2.5 px-4">Ukuran</th>
                    <th className="py-2.5 px-4">Lebar Dada (cm)</th>
                    <th className="py-2.5 px-4">Panjang Badan (cm)</th>
                    <th className="py-2.5 px-4">Panjang Lengan Pendek (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-mono-tabular">
                  {STANDARD_SIZE_CHART.map((row) => (
                    <tr key={row.size} className="hover:bg-slate-50/70">
                      <td className="py-2 px-4 font-semibold text-slate-900">{row.size}</td>
                      <td className="py-2 px-4 text-slate-700">{row.chestWidthCm}</td>
                      <td className="py-2 px-4 text-slate-700">{row.bodyLengthCm}</td>
                      <td className="py-2 px-4 text-slate-700">{row.sleeveLengthCm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            Cocok untuk: {product.recommendedFor.join(' · ')}
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 rounded-lg transition-colors cursor-pointer min-h-[40px]"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={() => {
                const targetId = product.estimatorTypeId;
                onClose();
                onSelectForEstimator(targetId);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              Hitung Estimasi Produk Ini
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
