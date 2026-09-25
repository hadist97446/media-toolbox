// Kontrol kecil untuk elemen progress bar (lihat .progress di components.css)
// Dipakai oleh halaman compress.html maupun photo.html
function createProgressController(rootEl) {
  const bar = rootEl.querySelector('.progress__bar');
  const label = rootEl.querySelector('.progress__label-text');
  const percentLabel = rootEl.querySelector('.progress__label-percent');

  return {
    set(percent, text) {
      rootEl.hidden = false;
      const clamped = Math.max(0, Math.min(100, percent));
      bar.style.width = `${clamped}%`;
      if (text !== undefined && label) label.textContent = text;
      if (percentLabel) percentLabel.textContent = `${Math.round(clamped)}%`;
    },
    reset() {
      bar.style.width = '0%';
      rootEl.hidden = true;
    },
  };
}
