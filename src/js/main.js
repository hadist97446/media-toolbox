// Dijalankan di setiap halaman: pasang tema, navbar, dan footer.
document.addEventListener('DOMContentLoaded', () => {
  applyStoredTheme();
  const page = document.body.getAttribute('data-page') || 'home';
  renderNavbar(page);
  renderFooter();
  initThemeToggle();
});
