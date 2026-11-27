import { CLIENT_TESTIMONIALS, WORKFLOW_STEPS } from '../data/konveksiData';
import { ResilientImage } from './ResilientImage';

export function WorkflowAndProofSection() {
  return (
    <section
      id="alur-produksi"
      className="py-16 lg:py-24 bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Part 1: Mechanism / Workflow with Editorial Numbering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-2">
                Proses Kerja Terukur
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Dari pemilihan bahan hingga pakaian siap pakai
              </h2>
              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                Seluruh tahap pemotongan pola, penjahitan, bordir komputer, dan sablon dikelola di dalam workshop kami sendiri sehingga ketepatan waktu dan kerapian jahitan terjaga.
              </p>
            </div>

            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-200">
              <ResilientImage
                src="/src/assets/images/katalog_bordir_sablon_1795751360392.jpg"
                alt="Proses bordir komputer presisi di workshop Elly Konveksi"
                fallbackLabel="Workshop Bordir & Produksi Elly Konveksi"
              />
            </div>
          </div>

          <div className="lg:col-span-7 divide-y divide-slate-200 border-y border-slate-200">
            {WORKFLOW_STEPS.map((step) => (
              <div key={step.number} className="py-6 first:pt-2 last:pb-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5">
                  <span className="font-mono-tabular text-sm font-semibold text-blue-800 shrink-0">
                    {step.number}
                  </span>
                  <div className="space-y-1.5">
                    <h3 className="font-display text-lg font-bold text-slate-900">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                    <p className="text-xs font-medium text-slate-500 pt-1">
                      {step.detail}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Proof / Evidence Adjacent to Capabilities */}
        <div id="testimoni" className="pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-sm font-medium text-blue-800 mb-2">
                Kepercayaan Klien Lampung &amp; Sekitarnya
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Dipercaya sekolah, instansi, dan komunitas
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              Pesanan ulang rutin tahun ajaran &amp; pengadaan seragam resmi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_TESTIMONIALS.map((item) => (
              <article
                key={item.id}
                className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {item.orderSummary}
                  </p>
                  <blockquote className="text-sm text-slate-700 leading-relaxed">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {item.role} · {item.organization}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
