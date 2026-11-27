import { useEffect, useMemo, useState, FormEvent } from 'react';
import { CheckCircle2, Copy, Check, MessageSquare } from 'lucide-react';
import {
  BRANCH_LOCATIONS,
  ESTIMATOR_PRODUCT_TYPES,
  formatRupiah,
} from '../data/konveksiData';

interface OrderEstimatorSectionProps {
  selectedProductTypeId: string;
  onProductTypeChange: (typeId: string) => void;
}

interface SubmittedOrder {
  referenceCode: string;
  customerName: string;
  whatsappNumber: string;
  branchId: string;
  productName: string;
  materialLabel: string;
  finishingLabel: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  discountPercent: number;
  estimatedDays: number;
  notes: string;
}

export function OrderEstimatorSection({
  selectedProductTypeId,
  onProductTypeChange,
}: OrderEstimatorSectionProps) {
  const activeProduct = useMemo(
    () =>
      ESTIMATOR_PRODUCT_TYPES.find((p) => p.id === selectedProductTypeId) ??
      ESTIMATOR_PRODUCT_TYPES[0],
    [selectedProductTypeId]
  );

  const [materialId, setMaterialId] = useState<string>(activeProduct.materials[0].id);
  const [finishingId, setFinishingId] = useState<string>(activeProduct.finishings[0].id);
  const [quantity, setQuantity] = useState<number>(Math.max(30, activeProduct.minOrder));

  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [branchId, setBranchId] = useState(BRANCH_LOCATIONS[0].id);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedOrder, setSubmittedOrder] = useState<SubmittedOrder | null>(null);
  const [copied, setCopied] = useState(false);

  // Sync defaults whenever product type changes
  useEffect(() => {
    setMaterialId(activeProduct.materials[0].id);
    setFinishingId(activeProduct.finishings[0].id);
    setQuantity((prev) => (prev < activeProduct.minOrder ? activeProduct.minOrder : prev));
    setFormError(null);
  }, [activeProduct]);

  const activeMaterial =
    activeProduct.materials.find((m) => m.id === materialId) ?? activeProduct.materials[0];
  const activeFinishing =
    activeProduct.finishings.find((f) => f.id === finishingId) ?? activeProduct.finishings[0];

  const discountPercent = useMemo(() => {
    if (quantity >= 300) return 15;
    if (quantity >= 100) return 10;
    if (quantity >= 50) return 5;
    return 0;
  }, [quantity]);

  const rawUnitPrice =
    activeProduct.basePrice + activeMaterial.unitPriceDelta + activeFinishing.unitPriceDelta;
  const discountedUnitPrice = Math.round(rawUnitPrice * (1 - discountPercent / 100));
  const totalEstimatedPrice = discountedUnitPrice * Math.max(1, quantity);

  const estimatedDays = useMemo(() => {
    const extraDays = Math.floor(quantity / 120) * 3;
    return activeProduct.baseDays + extraDays;
  }, [activeProduct.baseDays, quantity]);

  const selectedBranch =
    BRANCH_LOCATIONS.find((b) => b.id === branchId) ?? BRANCH_LOCATIONS[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = customerName.trim();
    const cleanedPhone = whatsappNumber.replace(/[^0-9+]/g, '');

    if (trimmedName.length < 2) {
      setFormError('Mohon isi nama lengkap atau nama instansi Anda.');
      return;
    }

    if (cleanedPhone.length < 9 || cleanedPhone.length > 15) {
      setFormError('Mohon masukkan nomor WhatsApp yang aktif (minimal 9 digit).');
      return;
    }

    if (quantity < activeProduct.minOrder) {
      setFormError(
        `Jumlah minimal pemesanan untuk ${activeProduct.name} adalah ${activeProduct.minOrder} pcs.`
      );
      return;
    }

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedOrder({
      referenceCode: `EK-${randomCode}`,
      customerName: trimmedName,
      whatsappNumber: cleanedPhone,
      branchId,
      productName: activeProduct.name,
      materialLabel: activeMaterial.label,
      finishingLabel: activeFinishing.label,
      quantity,
      unitPrice: discountedUnitPrice,
      totalPrice: totalEstimatedPrice,
      discountPercent,
      estimatedDays,
      notes: notes.trim(),
    });
  };

  const buildOrderMessageText = (order: SubmittedOrder) => {
    const branch = BRANCH_LOCATIONS.find((b) => b.id === order.branchId) ?? BRANCH_LOCATIONS[0];
    return [
      `Halo Elly Konveksi (${branch.name}), saya ingin mengajukan pesanan konveksi:`,
      `No. Referensi: ${order.referenceCode}`,
      `Nama / Instansi: ${order.customerName}`,
      `No. WhatsApp: ${order.whatsappNumber}`,
      `Produk: ${order.productName}`,
      `Bahan: ${order.materialLabel}`,
      `Finishing: ${order.finishingLabel}`,
      `Jumlah: ${order.quantity} pcs`,
      `Estimasi Satuan: ${formatRupiah(order.unitPrice)}`,
      `Estimasi Total: ${formatRupiah(order.totalPrice)}`,
      order.notes ? `Catatan: ${order.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleCopySummary = async () => {
    if (!submittedOrder) return;
    try {
      await navigator.clipboard.writeText(buildOrderMessageText(submittedOrder));
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="estimasi"
      className="py-16 lg:py-24 bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-blue-800 mb-2">
            Kalkulator Estimasi &amp; Pengajuan Pesanan
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Hitung perkiraan biaya produksi secara transparan
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Pilih jenis pakaian, material kain, teknik bordir atau sablon, serta jumlah pesanan. Potongan harga grosir berlaku otomatis mulai dari 50 pcs.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Controls */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            {/* Step 1: Product Type */}
            <div>
              <label
                htmlFor="estimator-product"
                className="block text-sm font-semibold text-slate-900 mb-2"
              >
                1. Jenis Produk Konveksi
              </label>
              <select
                id="estimator-product"
                value={activeProduct.id}
                onChange={(e) => onProductTypeChange(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
              >
                {ESTIMATOR_PRODUCT_TYPES.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} (Min. {type.minOrder} pcs)
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Material */}
            <div>
              <span className="block text-sm font-semibold text-slate-900 mb-2">
                2. Pilihan Bahan Kain
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {activeProduct.materials.map((mat) => {
                  const selected = mat.id === activeMaterial.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => setMaterialId(mat.id)}
                      className={`text-left px-4 py-3 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-4 ${
                        selected
                          ? 'bg-white border-blue-800 ring-1 ring-blue-800'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-slate-900">{mat.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{mat.note}</p>
                      </div>
                      <span className="font-mono-tabular text-xs font-medium text-slate-600 whitespace-nowrap shrink-0">
                        {mat.unitPriceDelta === 0
                          ? 'Standar'
                          : mat.unitPriceDelta > 0
                            ? `+${formatRupiah(mat.unitPriceDelta)}`
                            : formatRupiah(mat.unitPriceDelta)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Finishing */}
            <div>
              <label
                htmlFor="estimator-finishing"
                className="block text-sm font-semibold text-slate-900 mb-2"
              >
                3. Teknik Bordir / Sablon
              </label>
              <select
                id="estimator-finishing"
                value={activeFinishing.id}
                onChange={(e) => setFinishingId(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
              >
                {activeProduct.finishings.map((fin) => (
                  <option key={fin.id} value={fin.id}>
                    {fin.label}{' '}
                    {fin.unitPriceDelta > 0 ? `(+${formatRupiah(fin.unitPriceDelta)}/pcs)` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Quantity */}
            <div className="pt-2">
              <div className="flex items-center justify-between gap-4 mb-2">
                <label
                  htmlFor="estimator-qty"
                  className="text-sm font-semibold text-slate-900"
                >
                  4. Jumlah Pesanan (pcs)
                </label>
                <span className="text-xs font-medium text-slate-500">
                  Min. {activeProduct.minOrder} pcs
                  {discountPercent > 0 ? ` · Diskon grosir ${discountPercent}% aktif` : ''}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  aria-label="Slider jumlah pesanan"
                  min={activeProduct.minOrder}
                  max={500}
                  step={1}
                  value={Math.min(500, Math.max(activeProduct.minOrder, quantity))}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full accent-blue-800 cursor-pointer"
                />
                <input
                  id="estimator-qty"
                  type="number"
                  min={activeProduct.minOrder}
                  max={10000}
                  value={quantity}
                  onChange={(e) => {
                    const val = parseInt(e.target.value, 10);
                    setQuantity(Number.isNaN(val) ? activeProduct.minOrder : Math.max(1, val));
                  }}
                  className="w-24 px-3 py-2 text-sm font-mono-tabular font-semibold text-right bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* Volume Discount Guide */}
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                <span>Tier Grosir:</span>
                <span>50+ pcs (-5%)</span>
                <span aria-hidden="true">·</span>
                <span>100+ pcs (-10%)</span>
                <span aria-hidden="true">·</span>
                <span>300+ pcs (-15%)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Summary + Validated Lead Capture Form */}
          <div className="lg:col-span-5 space-y-6">
            {/* Price Output Box */}
            <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8">
              <p className="text-xs font-medium text-slate-300">
                Ringkasan Perkiraan Biaya
              </p>

              <div className="mt-4 pb-5 border-b border-slate-800 flex items-baseline justify-between gap-4">
                <div>
                  <span className="block text-xs text-slate-400">Estimasi Total</span>
                  <span className="font-mono-tabular text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {formatRupiah(totalEstimatedPrice)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs text-slate-400">Per Satuan</span>
                  <span className="font-mono-tabular text-base font-semibold text-slate-200">
                    {formatRupiah(discountedUnitPrice)}
                  </span>
                </div>
              </div>

              <dl className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400">Produk</dt>
                  <dd className="text-right font-medium text-white">{activeProduct.name}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400">Jumlah &amp; Potongan</dt>
                  <dd className="text-right font-mono-tabular">
                    {quantity} pcs {discountPercent > 0 ? `(-${discountPercent}%)` : '(Normal)'}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-400">Perkiraan Pengerjaan</dt>
                  <dd className="text-right font-mono-tabular">{estimatedDays} hari kerja</dd>
                </div>
              </dl>

              <p className="mt-4 text-[11px] text-slate-400 leading-relaxed">
                Harga final akan disesuaikan kembali setelah konfirmasi desain bordir/sablon dan jumlah titik warna di workshop.
              </p>
            </div>

            {/* Lead Capture Form or Confirmation Card */}
            {submittedOrder ? (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="w-5 h-5 text-blue-800 shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-xs font-mono-tabular font-semibold text-blue-800">
                      Referensi: {submittedOrder.referenceCode}
                    </p>
                    <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                      Rincian pesanan siap dikirim
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Klik tombol WhatsApp di bawah untuk langsung terhubung ke admin {selectedBranch.name}, atau salin ringkasan pesanan.
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-lg p-3.5 text-xs font-mono-tabular text-slate-700 space-y-1">
                  <p>Pemesan: {submittedOrder.customerName}</p>
                  <p>Item: {submittedOrder.productName} ({submittedOrder.quantity} pcs)</p>
                  <p>Estimasi: {formatRupiah(submittedOrder.totalPrice)}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={`https://wa.me/${selectedBranch.whatsapp}?text=${encodeURIComponent(
                      buildOrderMessageText(submittedOrder)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors whitespace-nowrap min-h-[44px]"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    Kirim via WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer min-h-[44px]"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-blue-800" aria-hidden="true" />
                        Tersalin
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        Salin Detail
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setSubmittedOrder(null)}
                  className="text-xs font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4 cursor-pointer"
                >
                  Ubah rincian atau buat estimasi baru
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4"
              >
                <h3 className="font-display text-lg font-bold text-slate-900">
                  Kirim Pengajuan Penawaran
                </h3>

                {formError && (
                  <div
                    role="alert"
                    className="px-3.5 py-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800"
                  >
                    {formError}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="order-name"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Nama Lengkap / Instansi
                  </label>
                  <input
                    id="order-name"
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso / SMAN 1 Bandar Lampung"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="order-wa"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Nomor WhatsApp Aktif
                    </label>
                    <input
                      id="order-wa"
                      type="tel"
                      required
                      placeholder="0812xxxxxxxx"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="order-branch"
                      className="block text-xs font-semibold text-slate-700 mb-1.5"
                    >
                      Pilih Cabang Layanan
                    </label>
                    <select
                      id="order-branch"
                      value={branchId}
                      onChange={(e) => setBranchId(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    >
                      {BRANCH_LOCATIONS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.tag}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="order-notes"
                    className="block text-xs font-semibold text-slate-700 mb-1.5"
                  >
                    Catatan Warna, Ukuran &amp; Tenggat Waktu (Opsional)
                  </label>
                  <textarea
                    id="order-notes"
                    rows={2}
                    placeholder="Contoh: Warna navy kombinasi abu, bordir logo dada kiri, target selesai akhir bulan."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-5 py-3 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-800"
                >
                  Buat Ringkasan &amp; Hubungi Admin
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
