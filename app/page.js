import Image from "next/image";

export default function Home() {
  return (
    <main>
      {/* ================= NAVBAR ================= */}
      <header className="navbar">
        <div className="navbar-container">
          <div className="brand">
            <Image
              src="/logo.png"
              alt="SMK Taruna Bhakti Depok"
              width={45}
              height={45}
            />

            <div>
              <h2>SMK TARUNA BHAKTI DEPOK</h2>
              <span>UNGGUL & BERKARAKTER</span>
            </div>
          </div>

          <nav>
            <a href="#beranda" className="active">
              Beranda
            </a>
            <a href="#">Tentang</a>
            <a href="#">Sejarah</a>
            <a href="#">Ekstrakurikuler</a>
            <a href="#">Kontak</a>
          </nav>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <span className="hero-badge">AKREDITASI A UNGGUL</span>

          <h1>SMK Taruna Bhakti Depok</h1>

          <h3>
            Membangun Generasi Unggul, Berkarakter, dan Berprestasi
          </h3>

          <p>
            Selamat datang di institusi pendidikan terdepan yang
            mendidik calon pemimpin masa depan bangsa dengan
            keselarasan nilai moral luhur dan pencapaian akademik
            berkelas internasional.
          </p>
        </div>
      </section>

      {/* ================= SAMBUTAN ================= */}
      <section className="sambutan" id="tentang">
        <div className="sambutan-container">
          <div className="sambutan-image">
            <Image
              src="/kepalasekolah.png"
              alt="Sambutan Kepala Sekolah"
              width={500}
              height={400}
            />
          </div>

          <div className="sambutan-text">
            <span className="yellow-title">
              SAMBUTAN KEPALA SEKOLAH
            </span>

            <h2>Mempersiapkan Pemimpin Peradaban Masa Depan</h2>

            <p>
              “Pendidikan bukanlah sekadar mengisi wadah yang kosong,
              melainkan menyalakan api inspirasi dalam jiwa setiap
              anak didik. Di SMK TARUNA BHAKTI, kami berkomitmen
              penuh untuk mengasah potensi intelektual, spiritual,
              dan emosional secara seimbang demi melahirkan lulusan
              berdaya saing global yang berbakti pada Ibu Pertiwi.”
            </p>

            <h4>Aina Novera, S.Pd., M.M.</h4>

            <span className="kepala">Kepala sekolah</span>
          </div>
        </div>
      </section>
      

      {/* ================= PROGRAM ================= */}
      <section className="program">
        <div className="program-container">
          <div className="section-heading">
            <span>AKADEMIK & TALENTA</span>

            <h2>3 Program Unggulan Utama</h2>

            <p>
              Pengembangan minat spesifik siswa dengan fasilitas
              berstandar tinggi guna mengoptimalkan pencapaian
              luar biasa.
            </p>
          </div>

          <div className="program-grid">
            {/* PROGRAM 1 */}
            <div className="program-card">
              <Image
                src="/program1.png"
                alt="Banyak praktik dan proyek"
                width={500}
                height={300}
              />

              <div className="program-content">
                <span>MENGASAH KEMAMPUAN</span>

                <h3>Banyak praktik dan proyek</h3>

                <p>
                  Siswa tidak hanya mendapatkan materi teori,
                  tetapi juga melakukan praktik dan mengerjakan
                  berbagai proyek untuk meningkatkan kemampuan
                  serta pengalaman.
                </p>
              </div>
            </div>

            {/* PROGRAM 2 */}
            <div className="program-card">
              <Image
                src="/program2.png"
                alt="Unggul di bidang teknologi"
                width={500}
                height={300}
              />

              <div className="program-content">
                <span>DIGITAL</span>

                <h3>Unggul di bidang teknologi</h3>

                <p>
                  SMK Taruna Bhakti Depok memiliki pembelajaran
                  yang banyak berfokus pada teknologi dan
                  keterampilan digital yang sesuai dengan
                  perkembangan dunia saat ini.
                </p>
              </div>
            </div>

            {/* PROGRAM 3 */}
            <div className="program-card">
              <Image
                src="/program3.png"
                alt="Akreditasi"
                width={500}
                height={300}
              />

              <div className="program-content">
                <span>KOMITMEN</span>

                <h3>Akreditasi</h3>

                <p>
                  SMK Taruna Bhakti Depok terakreditasi A, yang
                  menunjukkan bahwa sekolah memiliki kualitas
                  pendidikan yang baik dan telah memenuhi standar
                  yang ditetapkan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRESTASI ================= */}
      <section className="prestasi">
        <div className="prestasi-container">
          <div className="section-heading">
            <span>INFORMASI</span>

            <h2>PRESTASI SMK TARUNA BHAKTI DEPOK</h2>

            <p>Dapatkan pembaruan berita seputar prestasi</p>
          </div>

          <div className="prestasi-grid">
            {/* PRESTASI 1 */}
            <div className="prestasi-card">
              <Image
                src="/prestasi1.png"
                alt="Rakha dan Balqis"
                width={500}
                height={300}
              />

              <div className="prestasi-content">
                <span>APRESIASI APRESIASI NASA</span>

                <h3>RAKHA & BALQIS</h3>

                <p>
                  Rakha dan Bilqis mendapat apresiasi dari NASA
                  atas prestasi dan karya mereka di bidang cyber
                  security. Pencapaian ini menjadi kebanggaan bagi
                  SMK Taruna Bhakti Depok.
                </p>
              </div>
            </div>

            {/* PRESTASI 2 */}
            <div className="prestasi-card">
              <Image
                src="/prestasi2.png"
                alt="SISA"
                width={500}
                height={300}
              />

              <div className="prestasi-content">
                <span>JUARA 2</span>

                <h3>Sisa</h3>

                <p>
                  Siswa SMK TARUNA BHAKTI mendapatkan juara dua
                  tingkat depok.
                </p>
              </div>
            </div>

            {/* PRESTASI 3 */}
            <div className="prestasi-card">
              <Image
                src="/prestasi3.png"
                alt="Renang"
                width={500}
                height={300}
              />

              <div className="prestasi-content">
                <span>JUARA O2SN</span>

                <h3>Renang</h3>

                <p>
                  * Juara 1 Renang gaya bebas Putra (50 M)
                </p>

                <p>
                  * Juara 1 Renang gaya dada Putra (50 M)
                </p>

                <p>
                  * Juara 1 Renang gaya dada Putri (50 M)
                </p>

                <p>
                  * Juara 2 Renang Gaya bebas Putri (50 M)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer id="kontak">
        <div className="footer-container">
          {/* KOLOM 1 */}
          <div className="footer-brand">
            <div className="footer-logo">
              <Image
                src="/logo.png"
                alt="SMK Taruna Bhakti"
                width={45}
                height={45}
              />

              <h2>SMK TARUNA BHAKTI</h2>
            </div>

            <p>
              Membangun generasi unggul yang berkarakter kuat,
              cerdas secara akademis, dan siap bersaing dalam
              skala global dengan tetap menjunjung nilai luhur
              bangsa.
            </p>

            <h4>ALAMAT UTAMA</h4>

            <p>
              Jalan Raya Pekapuran, RT 02/RW 07, Kelurahan Curug,
              Kecamatan Cimanggis, Kota Depok, Jawa Barat
            </p>
          </div>

          {/* KOLOM 2 */}
          <div>
            <h4>TAUTAN CEPAT</h4>

            <a href="#tentang">Profil Sekolah</a>
            <a href="#tentang">Kurikulum</a>
            <a href="#tentang">Fasilitas Belajar</a>
            <a href="#ekstrakurikuler">Ekstrakurikuler</a>
            <a href="#beranda">Informasi PPDB</a>
          </div>

          {/* KOLOM 3 */}
          <div>
            <h4>JAM OPERASIONAL</h4>

            <p>Senin - Sabtu: 07:00 - 16:00</p>
            <p>Minggu: Tutup</p>

            <h4 className="telepon-title">
              LAYANAN TELEPON
            </h4>

            <strong>(021) 555-1234</strong>
          </div>

          {/* KOLOM 4 */}
          <div>
            <h4>HUBUNGI KAMI</h4>

            <p>info@SMKTARUNABHAKTI.sch.id</p>

            <div className="social">
              <span>◎</span>
              <span>▶</span>
              <span>f</span>
              <span>𝕏</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © 2026 SMK TARUNA BHAKTI DEPOK. All rights reserved.
          </span>

          <span>Akreditasi A Unggul (98.4)</span>
        </div>
      </footer>
    </main>
  );
}