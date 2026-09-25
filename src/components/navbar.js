// Cetak navbar yang sama ke semua halaman.
// activePage: "home" | "compress" | "photo" -> dipakai untuk menandai menu aktif
function renderNavbar(activePage) {
  const mount = document.getElementById('navbar-mount');
  if (!mount) return;

  const link = (href, label, key) => `
    <a href="${href}" ${activePage === key ? 'aria-current="page"' : ''}>${label}</a>
  `;

  mount.innerHTML = `
    <div class="navbar">
      <div class="container navbar__inner">
        <a class="navbar__brand" href="index.html">Ringkas</a>
        <ul class="navbar__links">
          <li>${link('index.html', 'Beranda', 'home')}</li>
          <li>${link('compress.html', 'Perkecil File', 'compress')}</li>
          <li>${link('photo.html', 'Edit Foto', 'photo')}</li>
        </ul>
        <div class="navbar__actions">
          <button class="theme-toggle" data-theme-toggle aria-label="Ganti mode terang/gelap" type="button">🌙</button>
        </div>
      </div>
    </div>
  `;
}
