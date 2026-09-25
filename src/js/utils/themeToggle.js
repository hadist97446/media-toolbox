// Atur mode terang/gelap. Pilihan user disimpan di localStorage
// supaya tetap sama saat dia buka halaman lain di situs ini.
const THEME_KEY = 'media-toolbox-theme';

function applyStoredTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    document.documentElement.setAttribute('data-theme', saved);
  }
}

function currentTheme() {
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr) return attr;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function toggleTheme() {
  const next = currentTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateToggleIcon();
}

function updateToggleIcon() {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;
  btn.textContent = currentTheme() === 'dark' ? '☀️' : '🌙';
}

function initThemeToggle() {
  applyStoredTheme();
  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) {
    btn.addEventListener('click', toggleTheme);
    updateToggleIcon();
  }
}
