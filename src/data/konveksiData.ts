export type ProductCategory =
  | 'Semua'
  | 'Seragam & Kemeja'
  | 'Kaos & Jaket'
  | 'Bordir & Sablon'
  | 'Tailor & Atribut';

export interface CatalogItem {
  id: string;
  estimatorTypeId: string;
  title: string;
  category: Exclude<ProductCategory, 'Semua'>;
  fabricSummary: string;
  minOrder: number;
  startingPrice: number;
  leadTimeDays: string;
  image: string;
  imageAlt: string;
  description: string;
  specifications: string[];
  recommendedFor: string[];
}

export interface EstimatorMaterialOption {
  id: string;
  label: string;
  unitPriceDelta: number;
  note: string;
}

export interface EstimatorFinishingOption {
  id: string;
  label: string;
  unitPriceDelta: number;
}

export interface EstimatorProductType {
  id: string;
  name: string;
  basePrice: number;
  minOrder: number;
  baseDays: number;
  materials: EstimatorMaterialOption[];
  finishings: EstimatorFinishingOption[];
}

export interface SizeChartRow {
  size: string;
  chestWidthCm: number;
  bodyLengthCm: number;
  sleeveLengthCm: number;
}

export interface WorkflowStep {
  number: string;
  title: string;
  description: string;
  detail: string;
}

export interface ClientTestimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  orderSummary: string;
  quote: string;
}

export interface BranchLocation {
  id: string;
  name: string;
  tag: string;
  address: string;
  city: string;
  phone?: string;
  whatsapp: string;
  whatsappDisplay: string;
  hours: string;
  servicesHighlight: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_konveksi_workshop_1795751358903.jpg';

export const CATALOG_CATEGORIES: ProductCategory[] = [
  'Semua',
  'Seragam & Kemeja',
  'Kaos & Jaket',
  'Bordir & Sablon',
  'Tailor & Atribut',
];

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'seragam-kantor-pdh',
    estimatorTypeId: 'kemeja',
    title: 'Kemeja PDH, PDL & Seragam Kantor',
    category: 'Seragam & Kemeja',
    fabricSummary: 'American Drill · Nagata Drill · Taipan Tropical',
    minOrder: 12,
    startingPrice: 125000,
    leadTimeDays: '10–14 hari kerja',
    image: '/src/assets/images/katalog_seragam_kemeja_1795751358917.jpg',
    imageAlt: 'Kemeja PDH dan seragam kantor produksi Elly Konveksi dengan bordir dada rapi',
    description:
      'Kemeja kerja lapangan (PDL), pakaian dinas harian (PDH), dan seragam instansi dengan potongan presisi, jahitan rantai dua jalur, serta bordir logo komputer.',
    specifications: [
      'Pilihan bahan: American Drill 1919, Nagata Drill, atau Taipan Tropical',
      'Sudah termasuk 2–3 titik bordir komputer standar (logo, nama, instansi)',
      'Tersedia lengan pendek, lengan panjang, dan skoder bahu atau saku tempel',
      'Ukuran lengkap dari S hingga 5XL dengan pola pria & wanita terpisah',
    ],
    recommendedFor: ['Instansi Pemerintah', 'Perusahaan Swasta', 'Organisasi & Himpunan'],
  },
  {
    id: 'seragam-sekolah-olahraga',
    estimatorTypeId: 'seragam',
    title: 'Seragam Sekolah & Setelan Olahraga',
    category: 'Seragam & Kemeja',
    fabricSummary: 'Oxford · Tetoron Cotton · Lotto · Diadora',
    minOrder: 24,
    startingPrice: 95000,
    leadTimeDays: '12–18 hari kerja',
    image: '/src/assets/images/katalog_seragam_kemeja_1795751358917.jpg',
    imageAlt: 'Setelan seragam sekolah dan instansi dengan bahan Oxford dan Drill berkualitas',
    description:
      'Paket produksi seragam harian sekolah (SD, SMP, SMA/SMK), batik sekolah, seragam pramuka, hingga setelan baju dan celana training olahraga siswa.',
    specifications: [
      'Bahan atasan Oxford / TC / Katun Batik adem untuk pemakaian seharian',
      'Celana & rok menggunakan Nagata / American Drill tahan cuci berulang',
      'Setelan olahraga tersedia dalam bahan Lotto, Diadora, dan Adidas PE',
      'Dapat memesan sekaligus paket badge bordir lokasi sekolah & nama',
    ],
    recommendedFor: ['Sekolah SD–SMA', 'Pondok Pesantren', 'Klub & Akademi Olahraga'],
  },
  {
    id: 'kaos-event-partai',
    estimatorTypeId: 'kaos',
    title: 'Kaos Sablon, Polo Shirt & Kaos Partai',
    category: 'Kaos & Jaket',
    fabricSummary: 'Cotton Combed 30s/24s · Lacoste CVC · Hyget',
    minOrder: 24,
    startingPrice: 48000,
    leadTimeDays: '7–12 hari kerja',
    image: '/src/assets/images/katalog_kaos_jaket_1795751359286.jpg',
    imageAlt: 'Kaos combed katun dan polo shirt kerah hasil produksi konveksi',
    description:
      'Produksi kaos oblong (O-neck / V-neck), kaos berkerah (polo shirt) untuk seragam panitia dan karyawan, serta kaos kampanye partai dalam skala ribuan pcs.',
    specifications: [
      'Cotton Combed 24s & 30s 100% katun halus, sejuk, dan menyerap keringat',
      'Polo Shirt menggunakan Lacoste Cotton Pique / CVC dengan bordir dada',
      'Kaos Partai menggunakan Hyget / PE Double dengan kapasitas produksi massal',
      'Jahitan overdeck 3 jarum dan rantai pundak standar distro',
    ],
    recommendedFor: ['Event & Panitia', 'Seragam Promosi', 'Kampanye & Komunitas'],
  },
  {
    id: 'jaket-training-club',
    estimatorTypeId: 'jaket',
    title: 'Jaket Almamater, Parka & Setelan Training',
    category: 'Kaos & Jaket',
    fabricSummary: 'Taslan Waterproof · Baby Terry · Fleece · American Drill',
    minOrder: 12,
    startingPrice: 155000,
    leadTimeDays: '14–21 hari kerja',
    image: '/src/assets/images/katalog_kaos_jaket_1795751359286.jpg',
    imageAlt: 'Jaket kerja terstruktur dan pakaian komunitas bahan drill dan fleece',
    description:
      'Pembuatan jas almamater kampus, jaket bomber/varsity, jaket touring tahan angin, hoodie komunitas, dan setelan training olahraga lengkap.',
    specifications: [
      'Lapisan dalam (furing) menggunakan katun hero, jala mesh, atau quilting',
      'Resleting YKK / Lion tahan macet serta rib lengan dan kerah rapat',
      'Tersedia opsi saku dalam dan reflektor scotchlite untuk kerja lapangan',
      'Cocok dipadukan dengan bordir punggung ukuran besar yang rapat',
    ],
    recommendedFor: ['Universitas & Sekolah', 'Komunitas Motor & Klub', 'Tim Lapangan'],
  },
  {
    id: 'bordir-sablon-komputer',
    estimatorTypeId: 'bordir',
    title: 'Jasa Bordir Komputer & Sablon Kain',
    category: 'Bordir & Sablon',
    fabricSummary: 'Mesin Bordir Multi-Head · Plastisol · Rubber · DTF',
    minOrder: 12,
    startingPrice: 12000,
    leadTimeDays: '3–7 hari kerja',
    image: '/src/assets/images/katalog_bordir_sablon_1795751360392.jpg',
    imageAlt: 'Mesin bordir komputer presisi mengerjakan emblem logo di atas kain drill navy',
    description:
      'Layanan makloon bordir komputer presisi tinggi untuk logo, emblem, bet nama, handuk, maupun jasa sablon kain manual (Plastisol/Rubber) dan digital (DTF).',
    specifications: [
      'Digitalisasi desain (film punch) langsung di workshop kami untuk hasil simetris',
      'Benang bordir rayon/polyester mengkilap dan tidak mudah luntur',
      'Sablon manual cat Rubber & Plastisol curing suhu tinggi tahan setrika',
      'Bisa mengerjakan pesanan bordir/sablon saja atau sekaligus jahit jadi',
    ],
    recommendedFor: ['Konveksi Partner', 'Atribut Sekolah & TNI/Polri', 'Brand Pakaian Lokal'],
  },
  {
    id: 'topi-tas-atribut',
    estimatorTypeId: 'atribut',
    title: 'Topi Custom, Tas Seminar & Goodie Bag',
    category: 'Tailor & Atribut',
    fabricSummary: 'Rafel · Twill · Kanvas · Cordura · D300/D600',
    minOrder: 24,
    startingPrice: 28000,
    leadTimeDays: '7–14 hari kerja',
    image: '/src/assets/images/katalog_seragam_kemeja_1795751358917.jpg',
    imageAlt: 'Produksi atribut konveksi rapi untuk kebutuhan seminar, instansi, dan acara',
    description:
      'Pembuatan topi baseball, topi rimba, topi komando, serta tas ransel seminar, tas diklat, dan totebag kanvas dengan logo bordir atau sablon instansi.',
    specifications: [
      'Topi bahan Rafel tebal, Twill Sueding, atau jaring trucker dengan rel pengatur',
      'Tas seminar menggunakan Cordura / D600 / D1680 berlapis busa polyfoam',
      'Kompartemen laptop aman dengan jahitan bartack penguat tali bahu',
      'Paket hemat tersedia jika dipesan bersamaan dengan seragam atau kaos acara',
    ],
    recommendedFor: ['Seminar & Pelatihan', 'Instansi & Dinas', 'Souvenir Perusahaan'],
  },
  {
    id: 'tailor-kebaya-custom',
    estimatorTypeId: 'tailor',
    title: 'Jahit Tailor, Jas Formal & Kebaya Custom',
    category: 'Tailor & Atribut',
    fabricSummary: 'Semi Wool · Katun Batik · Brokat · Tile · Satin Silk',
    minOrder: 1,
    startingPrice: 250000,
    leadTimeDays: '7–14 hari kerja',
    image: '/src/assets/images/katalog_tailor_kebaya_1795751360185.jpg',
    imageAlt: 'Jas tailor terstruktur dan kain kebaya tradisional di meja kerja penjahit',
    description:
      'Layanan jahit perorangan (tailor) maupun seragam keluarga dengan pengukuran badan langsung: jas pria, blazer wanita, kebaya wisuda/pernikahan, hingga gamis pesta.',
    specifications: [
      'Pengukuran langsung di gerai Gunung Terang atau Kemiling untuk fit sempurna',
      'Pengerjaan oleh penjahit tailor berpengalaman dengan teknik furing penuh',
      'Menerima bahan kain bawaan sendiri maupun penyediaan bahan dari workshop',
      'Tersedia sesi fitting sebelum penyelesaian akhir agar pas di badan',
    ],
    recommendedFor: ['Keluarga Pengantin', 'Wisuda & Acara Resmi', 'Eksekutif & Profesional'],
  },
];

export const ESTIMATOR_PRODUCT_TYPES: EstimatorProductType[] = [
  {
    id: 'kaos',
    name: 'Kaos / Polo Shirt',
    basePrice: 52000,
    minOrder: 24,
    baseDays: 8,
    materials: [
      { id: 'hyget', label: 'Hyget / PE (Kaos Partai & Massal)', unitPriceDelta: -18000, note: 'Ekonomis untuk acara massal' },
      { id: 'combed30', label: 'Cotton Combed 30s (Adem & Standar Distro)', unitPriceDelta: 0, note: 'Paling diminati untuk event & komunitas' },
      { id: 'combed24', label: 'Cotton Combed 24s (Lebih Tebal)', unitPriceDelta: 8000, note: 'Tebal, kokoh, tetap lembut' },
      { id: 'lacoste', label: 'Lacoste CVC Pique (Kaos Kerah / Polo)', unitPriceDelta: 25000, note: 'Rapi untuk seragam kantor santai' },
    ],
    finishings: [
      { id: 'polos', label: 'Polos / Tanpa Sablon & Bordir', unitPriceDelta: 0 },
      { id: 'sablon_rubber', label: 'Sablon Rubber (Depan & Belakang)', unitPriceDelta: 12000 },
      { id: 'sablon_plastisol', label: 'Sablon Plastisol / DTF Detail Penuh', unitPriceDelta: 18000 },
      { id: 'bordir_dada', label: 'Bordir Komputer Logo Dada + Punggung', unitPriceDelta: 16000 },
    ],
  },
  {
    id: 'kemeja',
    name: 'Kemeja PDH / PDL / Kerja',
    basePrice: 115000,
    minOrder: 12,
    baseDays: 12,
    materials: [
      { id: 'american_drill', label: 'American Drill 1919 (Standar Seragam)', unitPriceDelta: 0, note: 'Kuat, warna awet, harga seimbang' },
      { id: 'nagata_drill', label: 'Nagata Drill (Katun Lebih Tinggi & Adem)', unitPriceDelta: 15000, note: 'Lembut dan nyaman di iklim tropis' },
      { id: 'taipan', label: 'Taipan Tropical (Halus & Jatuh Rapi)', unitPriceDelta: 22000, note: 'Kesan premium untuk seragam kantor' },
    ],
    finishings: [
      { id: 'bordir_2', label: 'Bordir Komputer 2 Titik (Logo + Nama)', unitPriceDelta: 10000 },
      { id: 'bordir_full', label: 'Bordir Komputer Lengkap + Punggung Besar', unitPriceDelta: 22000 },
      { id: 'polos', label: 'Jahit Polos (Tanpa Bordir)', unitPriceDelta: 0 },
    ],
  },
  {
    id: 'seragam',
    name: 'Seragam Sekolah / Olahraga',
    basePrice: 95000,
    minOrder: 24,
    baseDays: 14,
    materials: [
      { id: 'oxford_drill', label: 'Atasan Oxford + Bawahan Drill (1 Set)', unitPriceDelta: 25000, note: 'Setelan seragam harian sekolah' },
      { id: 'lotto', label: 'Kaos + Celana Training Lotto (Olahraga)', unitPriceDelta: 0, note: 'Ringan & cepat kering untuk siswa' },
      { id: 'diadora', label: 'Setelan Training Diadora Tebal', unitPriceDelta: 20000, note: 'Tebal, mengkilap, cocok untuk instansi' },
    ],
    finishings: [
      { id: 'sablon_lokasi', label: 'Sablon Identitas Sekolah / Instansi', unitPriceDelta: 10000 },
      { id: 'bordir_badge', label: 'Bordir Badge Lokasi & Logo Sekolah', unitPriceDelta: 15000 },
    ],
  },
  {
    id: 'jaket',
    name: 'Jaket / Almamater / Training',
    basePrice: 145000,
    minOrder: 12,
    baseDays: 16,
    materials: [
      { id: 'fleece', label: 'Cotton Fleece Tebal (Hoodie / Varsity)', unitPriceDelta: 0, note: 'Hangat dan lembut di bagian dalam' },
      { id: 'taslan', label: 'Taslan Waterproof + Furing Jala', unitPriceDelta: 18000, note: 'Tahan angin & gerimis untuk lapangan' },
      { id: 'drill_almamater', label: 'American / Nagata Drill (Jas Almamater)', unitPriceDelta: 15000, note: 'Struktur bahu rapi dengan furing penuh' },
    ],
    finishings: [
      { id: 'bordir_std', label: 'Bordir Komputer Dada + Punggung', unitPriceDelta: 20000 },
      { id: 'sablon_dtf', label: 'Sablon DTF / Plastisol Multi-warna', unitPriceDelta: 16000 },
    ],
  },
  {
    id: 'atribut',
    name: 'Topi & Tas Seminar',
    basePrice: 32000,
    minOrder: 24,
    baseDays: 10,
    materials: [
      { id: 'topi_twill', label: 'Topi Twill / Jaring Trucker', unitPriceDelta: -4000, note: 'Cocok untuk acara & seragam lapangan' },
      { id: 'topi_rafel', label: 'Topi Bahan Rafel Tebal (Rel Besi)', unitPriceDelta: 6000, note: 'Kokoh dan premium' },
      { id: 'tas_totebag', label: 'Tote Bag Kanvas / Blacu Seminar', unitPriceDelta: -6000, note: 'Praktis untuk goodie bag diklat' },
      { id: 'tas_ransel', label: 'Tas Ransel Seminar D600 / Cordura', unitPriceDelta: 48000, note: 'Dengan slot laptop & busa punggung' },
    ],
    finishings: [
      { id: 'bordir_logo', label: 'Bordir Komputer Logo Instansi', unitPriceDelta: 8000 },
      { id: 'sablon_logo', label: 'Sablon 1–3 Warna', unitPriceDelta: 5000 },
    ],
  },
  {
    id: 'bordir',
    name: 'Makloon Bordir & Sablon Saja',
    basePrice: 12000,
    minOrder: 12,
    baseDays: 5,
    materials: [
      { id: 'bordir_badge', label: 'Bordir Komputer Emblem / Logo Dada', unitPriceDelta: 0, note: 'Harga tergantung kerapatan tusukan benang' },
      { id: 'bordir_punggung', label: 'Bordir Komputer Ukuran Besar Punggung', unitPriceDelta: 12000, note: 'Presisi tinggi untuk jaket / PDL' },
      { id: 'sablon_kain', label: 'Sablon Kain Manual (Plastisol / Rubber)', unitPriceDelta: 2000, note: 'Kain potongan maupun pakaian jadi' },
    ],
    finishings: [
      { id: 'standar', label: 'Finishing Bersih + Potong Benang Rapi', unitPriceDelta: 0 },
      { id: 'perekat_velcro', label: 'Tambah Perekat Velcro / Jahit Tempel', unitPriceDelta: 4000 },
    ],
  },
  {
    id: 'tailor',
    name: 'Tailor, Jas & Kebaya Custom',
    basePrice: 250000,
    minOrder: 1,
    baseDays: 10,
    materials: [
      { id: 'bawa_kain', label: 'Jasa Jahit Saja (Kain dari Pelanggan)', unitPriceDelta: 0, note: 'Pengukuran badan langsung di cabang' },
      { id: 'semi_wool', label: 'Bahan Semi Wool / Batik dari Workshop', unitPriceDelta: 175000, note: 'Termasuk kain pilihan & furing penuh' },
      { id: 'kebaya_payet', label: 'Kebaya Modern / Pesta (+ Aplikasi Payet)', unitPriceDelta: 225000, note: 'Termasuk sesi fitting sebelum selesai' },
    ],
    finishings: [
      { id: 'fitting', label: 'Termasuk 1x Sesi Fitting & Penyesuaian', unitPriceDelta: 0 },
    ],
  },
];

export const STANDARD_SIZE_CHART: SizeChartRow[] = [
  { size: 'S', chestWidthCm: 48, bodyLengthCm: 68, sleeveLengthCm: 22 },
  { size: 'M', chestWidthCm: 51, bodyLengthCm: 70, sleeveLengthCm: 23 },
  { size: 'L', chestWidthCm: 54, bodyLengthCm: 72, sleeveLengthCm: 24 },
  { size: 'XL', chestWidthCm: 57, bodyLengthCm: 74, sleeveLengthCm: 25 },
  { size: 'XXL', chestWidthCm: 60, bodyLengthCm: 76, sleeveLengthCm: 26 },
  { size: 'XXXL', chestWidthCm: 64, bodyLengthCm: 78, sleeveLengthCm: 27 },
];

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    number: '01.',
    title: 'Konsultasi Desain & Pemilihan Kain',
    description:
      'Diskusikan model pakaian, jumlah, anggaran, dan pilihan sampel kain langsung bersama tim kami atau melalui WhatsApp.',
    detail: 'Tersedia buku sampel warna kain lengkap',
  },
  {
    number: '02.',
    title: 'Pembuatan Pola & Approval Mockup',
    description:
      'Kami menyiapkan visualisasi letak logo bordir/sablon serta rincian tabel ukuran (S–5XL) untuk disetujui sebelum potong kain.',
    detail: 'Revisi desain gratis sebelum masuk produksi',
  },
  {
    number: '03.',
    title: 'Potong Kain, Jahit, Bordir & Sablon',
    description:
      'Seluruh proses dikerjakan in-house oleh penjahit terampil menggunakan mesin jahit industri, mesin bordir komputer, dan meja sablon khusus.',
    detail: 'Kontrol kualitas di setiap meja jahit',
  },
  {
    number: '04.',
    title: 'Finishing, Setrika Uap & Pengiriman',
    description:
      'Pakaian melewati tahap pembersihan benang, setrika uap, pengemasan per ukuran, dan siap diambil di cabang atau dikirim ke seluruh Indonesia.',
    detail: 'Garansi perbaikan apabila ukuran tidak sesuai kesepakatan',
  },
];

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'testi-1',
    name: 'Hendra Wijaya',
    role: 'Kepala Bagian Umum',
    organization: 'Koperasi Karyawan Mitra Lampung',
    orderSummary: '140 pcs Kemeja PDH Nagata Drill',
    quote:
      'Sebelumnya kami sering kesulitan menyamakan ukuran seragam staf pria dan wanita. Di Elly Konveksi, pola dibuat terpisah dan bordir logo instansinya rapat tanpa kerut. Seluruh 140 pcs selesai tepat 12 hari kerja.',
  },
  {
    id: 'testi-2',
    name: 'Dra. Siti Nurhaliza',
    role: 'Wakil Kepala Bidang Kesiswaan',
    organization: 'SMK Bina Karya Pesawaran',
    orderSummary: '320 stel Seragam Olahraga & Topi',
    quote:
      'Sudah tiga tahun ajaran berturut-turut kami memesan setelan olahraga dan topi siswa ke cabang Kemiling. Kainnya awet dicuci dan pengiriman selalu dibagi rapi per kelas sehingga memudahkan pembagian ke siswa.',
  },
  {
    id: 'testi-3',
    name: 'Rizky Pratama',
    role: 'Ketua Panitia Acara',
    organization: 'Forum Mahasiswa Teknik Bandar Lampung',
    orderSummary: '210 pcs Kaos Combed 24s & Tas Seminar',
    quote:
      'Kami butuh paket kaos panitia sekaligus tas ransel seminar dalam waktu mepet 9 hari. Elly Konveksi memberi harga paket yang masuk anggaran organisasi dan sablon plastisolnya tetap tajam.',
  },
];

export const BRANCH_LOCATIONS: BranchLocation[] = [
  {
    id: 'gunung-terang',
    name: 'Cabang Gunung Terang (Pusat)',
    tag: 'Bandar Lampung',
    address: 'Jl. Purnawirawan Raya No. 56, Gunung Terang',
    city: 'Bandar Lampung, Lampung',
    phone: '(0721) 251-468',
    whatsapp: '6281377917757',
    whatsappDisplay: '0813 7791 7757',
    hours: 'Senin – Sabtu, 08.00 – 17.00 WIB',
    servicesHighlight: 'Workshop utama konveksi massal, bordir komputer, konsultasi sampel kain & tailor.',
  },
  {
    id: 'kemiling',
    name: 'Cabang Kemiling',
    tag: 'Pesawaran / Kemiling',
    address: 'Jl. Raya Kemiling KM. 10',
    city: 'Kabupaten Pesawaran, Lampung',
    whatsapp: '6282177377321',
    whatsappDisplay: '0821 7737 7321',
    hours: 'Senin – Sabtu, 08.00 – 17.00 WIB',
    servicesHighlight: 'Penerimaan pesanan seragam sekolah, kaos, kemeja, jahit kebaya & pengukuran langsung.',
  },
];

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}
