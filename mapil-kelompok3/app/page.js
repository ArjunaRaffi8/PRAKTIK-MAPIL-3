import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=1920"
            alt="Gedung Sekolah"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 max-w-4xl text-center px-4">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-amber-400 bg-amber-400/10 rounded-full border border-amber-400/20">
            AKREDITASI A UNGGUL
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            SMK Taruna Bhakti Depok
          </h1>
          <p className="text-lg md:text-xl font-medium text-amber-200 mb-4">
            Membangun Generasi Unggul, Berkarakter, dan Berprestasi
          </p>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Selamat datang di website resmi SMK Taruna Bhakti Depok. Kami berkomitmen mencetak calon pemimpin masa depan bangsa di bidang keahlian teknologi dan komunikasi berbasis kemajuan internasional.
          </p>
        </div>
      </section>

      {/* 2. SAMBUTAN KEPALA SEKOLAH */}
      <section className="max-w-6xl mx-auto py-20 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[380px] w-full rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
              alt="Sambutan Kepala Sekolah"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-bold tracking-widest uppercase text-amber-600 block mb-2">
              SAMBUTAN KEPALA SEKOLAH
            </span>
            <h2 className="text-3xl font-bold text-slate-900 mb-6 leading-tight">
              Mempersiapkan Pemimpin Peradaban Masa Depan
            </h2>
            <blockquote className="text-slate-600 italic text-sm md:text-base leading-relaxed mb-6 border-l-4 border-amber-500 pl-4">
              "Pendidikan bukanlah sekadar mengisi wadah yang kosong, melainkan menyalakan api inspirasi dalam jiwa setiap anak didik. SMK TARUNA BHAKTI memiliki komitmen penuh untuk mengasah potensi intelektual, spiritual, dan emosional sarana seimbang demi melahirkan lulusan berdaya saing global yang berbasis pada Imtak dan IPTEK."
            </blockquote>
            <div>
              <h4 className="font-bold text-slate-900">Aina Novero, S.Pd., M.M.</h4>
              <p className="text-xs text-slate-500">Kepala Sekolah</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PROGRAM UNGGULAN */}
      <section className="bg-slate-100 py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest uppercase text-amber-600 block mb-2">
              AKADEMIK & TALENTA
            </span>
            <h2 className="text-3xl font-bold text-slate-900">3 Program Unggulan Utama</h2>
            <p className="text-sm text-slate-500 mt-2">
              Pengembangan minat spesifik siswa dengan kurikulum berstandar tinggi guna mengoptimalkan pencapaian prestasi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600"
                  alt="Banyak Praktik"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
                MENGASAH KETERAMPILAN
              </span>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Banyak Praktik dan Proyek</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Siswa tidak hanya mendapatkan materi teori, tetapi juga melakukan praktik dan mengerjakan berbagai proyek untuk meningkatkan keterampilan nyata.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600"
                  alt="Unggul di Bidang Teknologi"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
                DIGITAL
              </span>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Unggul di Bidang Teknologi</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                SMK Taruna Bhakti Depok memiliki pembelajaran yang banyak berfokus pada teknologi dan keterampilan digital yang sesuai dengan perkembangan industri saat ini.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition">
              <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                <img
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600"
                  alt="Akreditasi"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
                KOMITMEN
              </span>
              <h3 className="font-bold text-lg text-slate-900 mb-2">Akreditasi A</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                SMK Taruna Bhakti Depok terakreditasi A, yang membuktikan bahwa sekolah memiliki kualitas pendidikan yang baik dan telah memenuhi standar yang ditetapkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRESTASI SECTION */}
      <section className="max-w-6xl mx-auto py-20 px-4 md:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold tracking-widest uppercase text-amber-600 block mb-2">
            INFORMASI
          </span>
          <h2 className="text-3xl font-bold text-slate-900">PRESTASI SMK TARUNA BHAKTI DEPOK</h2>
          <p className="text-sm text-slate-500 mt-2">Dapatkan pembaruan berita seputar prestasi</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card Prestasi 1 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <img
                src="image/homepage/prestasi-NASA.png"
                alt="Rakha & Balqis"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
              APRESIASI APRESIASI MAHASISWA
            </span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">RAKHA & BALQIS</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rakha dan Balqis mendapat apresiasi atas inovasi atau prestasi mereka. Mengembangkan bidang cyber security. Pencapaian ini menjadi kebanggaan bagi SMK Taruna Bhakti Depok.
            </p>
          </div>

          {/* Card Prestasi 2 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <img
                src="image/homepage/prestasi-FILM.png"
                alt="SISA"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
              JUARA 2
            </span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">SISA</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Siswa SMK TARUNA BHAKTI mendapatkan juara dua tingkat Bogor.
            </p>
          </div>

          {/* Card Prestasi 3 */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition">
            <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
              <img
                src="/image/homepage/prestasi-RENANG.png"
                alt="Renang"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-[10px] font-bold tracking-wider uppercase text-amber-600 block mb-1">
              INSPIRATIF
            </span>
            <h3 className="font-bold text-lg text-slate-900 mb-2">Renang</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              * Juara 1 Renang gaya dada 50m Putra O2SN<br />
              * Juara 2 Renang gaya bebas 50m Putra O2SN<br />
              * Juara 1 Renang Gaya Bebas 50m (Kota)<br />
              * Juara 2 Renang Gaya Bebas Putra 50m Kab.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#0b2545] text-white py-12 px-4 md:px-8 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
          {/* Col 1 */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-[#0b2545] font-bold">
                TB
              </div>
              <span className="font-bold text-sm tracking-wider">SMK TARUNA BHAKTI</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-4">
              Membangun generasi unggul yang berkarakter kuat, cerdas, serba akademis, dan siap bersaing dalam era digital dengan tetap menjunjung nilai-nilai karakter.
            </p>
            <h5 className="font-bold mb-1 text-slate-200">ALAMAT UTAMA</h5>
            <p className="text-slate-400 leading-relaxed">
              Jalan Pekapuran RT 02/07 Kel. Curug, Kec. Cimanggis, Kota Depok, Jawa Barat.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-bold text-sm text-amber-400 mb-4">TAUTAN CEPAT</h5>
            <ul className="space-y-2 text-slate-300">
              <li><Link href="/tentang-kami" className="hover:text-amber-400">Profil Sekolah</Link></li>
              <li><Link href="/kurikulum" className="hover:text-amber-400">Kurikulum</Link></li>
              <li><Link href="/fasilitas" className="hover:text-amber-400">Fasilitas Belajar</Link></li>
              <li><Link href="/ekstrakurikuler" className="hover:text-amber-400">Ekstrakurikuler</Link></li>
              <li><Link href="/ppdb" className="hover:text-amber-400">Informasi PPDB</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-bold text-sm text-amber-400 mb-4">JAM OPERASIONAL</h5>
            <p className="text-slate-300 mb-2">Senin - Sabtu: 07.00 - 16.00</p>
            <p className="text-slate-300 mb-4">Minggu: Tutup</p>
            <h5 className="font-bold text-sm text-amber-400 mb-1">LAYANAN TELEPON</h5>
            <p className="text-slate-300">(021) 8740379</p>
          </div>

          {/* Col 4 */}
          <div>
            <h5 className="font-bold text-sm text-amber-400 mb-4">HUBUNGI KAMI</h5>
            <p className="text-slate-300 mb-4">info@smktarunabhakti.sch.id</p>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-[#0b2545] cursor-pointer transition">
                🌐
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-[#0b2545] cursor-pointer transition">
                📷
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-[#0b2545] cursor-pointer transition">
                📘
              </span>
              <span className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-amber-400 hover:text-[#0b2545] cursor-pointer transition">
                ▶
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500">
          <p>© 2026 SMK Taruna Bhakti Depok. All rights reserved.</p>
          <p>Akreditasi A Unggul (BAN-S/M)</p>
        </div>
      </footer>
    </div>
  );
}