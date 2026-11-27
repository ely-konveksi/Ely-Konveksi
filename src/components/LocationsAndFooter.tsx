import { useState } from 'react';
import { MapPin, Phone, Clock, Copy, Check, MessageSquare } from 'lucide-react';
import { BRANCH_LOCATIONS } from '../data/konveksiData';

export function LocationsAndFooter() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyAddress = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(null);
    }
  };

  return (
    <>
      <section
        id="lokasi"
        className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-blue-800 mb-2">
              Kunjungi Workshop &amp; Gerai Kami
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Dua cabang aktif di Bandar Lampung &amp; Pesawaran
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              Datang langsung untuk melihat contoh fisik kain, pengukuran badan jahit tailor, serta konsultasi desain seragam bersama tim kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {BRANCH_LOCATIONS.map((branch) => {
              const fullAddress = `${branch.address}, ${branch.city}`;
              const isCopied = copiedId === branch.id;

              return (
                <article
                  key={branch.id}
                  className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-medium text-blue-800">{branch.tag}</p>
                      <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
                        {branch.name}
                      </h3>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                        {branch.servicesHighlight}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3 text-sm text-slate-700">
                      <div className="flex items-start gap-3">
                        <MapPin
                          className="w-4 h-4 text-slate-400 shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="font-medium text-slate-900">{branch.address}</p>
                          <p className="text-slate-600">{branch.city}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Clock
                          className="w-4 h-4 text-slate-400 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{branch.hours}</span>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone
                          className="w-4 h-4 text-slate-400 shrink-0 mt-1"
                          aria-hidden="true"
                        />
                        <div className="font-mono-tabular text-sm">
                          <p>WhatsApp: {branch.whatsappDisplay}</p>
                          {branch.phone && (
                            <p className="text-slate-500">Telepon Kantor: {branch.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    <a
                      href={`https://wa.me/${branch.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap min-h-[40px]"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      Chat WhatsApp Cabang
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopyAddress(branch.id, fullAddress)}
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[40px]"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-blue-800" aria-hidden="true" />
                          Alamat Tersalin
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          Salin Alamat
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quiet Footer */}
      <footer className="bg-white border-t border-slate-200 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="font-display text-base font-bold text-slate-900">
              Elly Konveksi &amp; Tailor
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Konveksi Seragam, Kaos, Kemeja, Jaket, Bordir Komputer, Sablon &amp; Tailor · Bandar Lampung &amp; Pesawaran
            </p>
          </div>

          <nav
            aria-label="Navigasi Footer"
            className="flex flex-wrap items-center gap-6 text-xs font-medium text-slate-600"
          >
            <a href="#katalog" className="hover:text-slate-900 transition-colors">
              Katalog
            </a>
            <a href="#alur-produksi" className="hover:text-slate-900 transition-colors">
              Layanan
            </a>
            <a href="#testimoni" className="hover:text-slate-900 transition-colors">
              Portofolio
            </a>
            <a href="#estimasi" className="hover:text-slate-900 transition-colors">
              Kalkulator Harga
            </a>
            <a href="#lokasi" className="hover:text-slate-900 transition-colors">
              Lokasi Cabang
            </a>
          </nav>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Elly Konveksi &amp; Tailor
          </p>
        </div>
      </footer>
    </>
  );
}
