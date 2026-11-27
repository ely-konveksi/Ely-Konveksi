import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { CatalogItem, HERO_IMAGE } from './data/konveksiData';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { CatalogSection } from './components/CatalogSection';
import { WorkflowAndProofSection } from './components/WorkflowAndProofSection';
import { OrderEstimatorSection } from './components/OrderEstimatorSection';
import { LocationsAndFooter } from './components/LocationsAndFooter';
import { ProductDetailModal } from './components/ProductDetailModal';

const HERO_METRICS = [
  {
    value: '12+ Tahun',
    label: 'Pengalaman Produksi Konveksi & Tailor di Lampung',
  },
  {
    value: '2 Cabang',
    label: 'Workshop Gunung Terang & Gerai Raya Kemiling',
  },
  {
    value: '12–24 Pcs',
    label: 'Minimal Order Fleksibel untuk Kemeja, Kaos & Jaket',
  },
  {
    value: 'In-House',
    label: 'Jahit, Bordir Komputer & Sablon dalam Satu Atap',
  },
];

export default function App() {
  const [selectedEstimatorTypeId, setSelectedEstimatorTypeId] = useState<string>('kemeja');
  const [inspectedProduct, setInspectedProduct] = useState<CatalogItem | null>(null);

  const scrollToEstimator = (typeId?: string) => {
    if (typeId) {
      setSelectedEstimatorTypeId(typeId);
    }
    const el = document.getElementById('estimasi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header onOrderClick={() => scrollToEstimator()} />

      <main className="flex-1">
        {/* Hero Section: Proposition + Dominant Visual Anchor */}
        <section className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-16 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
              {/* Left Copy Column */}
              <div className="lg:col-span-6 flex flex-col justify-center py-2">
                <p className="text-sm font-medium text-blue-800 mb-3">
                  Elly Konveksi &amp; Tailor · Bandar Lampung &amp; Pesawaran
                </p>
                <h1 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] font-bold tracking-tight leading-[1.12] text-slate-900 max-w-xl">
                  Produksi seragam, kaos, dan bordir komputer presisi
                </h1>
                <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  Melayani pembuatan seragam kantor PDH/PDL, seragam sekolah, kaos acara dan partai, kemeja, jaket, training, topi, tas seminar, hingga jahit tailor dan kebaya custom dengan kontrol kualitas langsung dari workshop kami.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToEstimator()}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-800"
                  >
                    Hitung Estimasi Pesanan
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href="#katalog"
                    className="inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-slate-700 hover:text-slate-900 underline underline-offset-8 decoration-slate-300 transition-colors whitespace-nowrap shrink-0 min-h-[44px]"
                  >
                    Lihat Katalog Produk
                  </a>
                </div>
              </div>

              {/* Right Image Column */}
              <div className="lg:col-span-6">
                <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[280px] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                  <ResilientImage
                    src={HERO_IMAGE}
                    alt="Suasana workshop produksi Elly Konveksi dan Tailor dengan mesin jahit industri dan rak seragam siap kirim"
                    fallbackLabel="Workshop Elly Konveksi & Tailor"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Capacity Strip Below Hero Split */}
            <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {HERO_METRICS.map((metric) => (
                <div key={metric.value}>
                  <p className="font-mono-tabular text-xl sm:text-2xl font-bold text-slate-900">
                    {metric.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-snug">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog & Services Section */}
        <CatalogSection
          onSelectForEstimator={(typeId) => scrollToEstimator(typeId)}
          onInspectProduct={(item) => setInspectedProduct(item)}
        />

        {/* Workflow & Client Proof */}
        <WorkflowAndProofSection />

        {/* Interactive Cost Estimator & Inquiry Form */}
        <OrderEstimatorSection
          selectedProductTypeId={selectedEstimatorTypeId}
          onProductTypeChange={setSelectedEstimatorTypeId}
        />
      </main>

      {/* Branch Locations & Quiet Footer */}
      <LocationsAndFooter />

      {/* Product Specifications & Size Chart Modal */}
      <ProductDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onSelectForEstimator={(typeId) => scrollToEstimator(typeId)}
      />
    </div>
  );
}
