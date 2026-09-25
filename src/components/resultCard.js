// Tampilkan kartu hasil akhir dengan tombol download.
// options: { mountId, fileName, originalBytes, newBytes, blobUrl }
function renderResultCard(options) {
  const mount = document.getElementById(options.mountId);
  if (!mount) return;

  const savingsText =
    options.originalBytes && options.newBytes
      ? formatSavings(options.originalBytes, options.newBytes)
      : '';

  mount.innerHTML = `
    <div class="result-card">
      <div class="result-card__info">
        <span class="result-card__name">${options.fileName}</span>
        <span class="result-card__meta">
          ${formatBytes(options.originalBytes)} &rarr; ${formatBytes(options.newBytes)}
          ${savingsText ? `&middot; <span class="result-card__savings">${savingsText}</span>` : ''}
        </span>
      </div>
      <a class="btn btn-primary" href="${options.blobUrl}" download="${options.fileName}">
        Download File
      </a>
    </div>
  `;
}
