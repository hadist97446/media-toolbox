function renderFooter() {
  const mount = document.getElementById('footer-mount');
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <footer class="footer">
      <div class="container">
        Ringkas &copy; ${year}. Semua proses berjalan langsung di browser kamu — file tidak dikirim ke server mana pun.
      </div>
    </footer>
  `;
}
