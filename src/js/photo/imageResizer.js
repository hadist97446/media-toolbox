// Perkecil dimensi foto (lebar/tinggi) sambil menjaga rasio aslinya.
// scalePercent: 100 = ukuran asli, 50 = setengah dari lebar & tinggi asli, dst.
function resizeImageToCanvas(img, scalePercent) {
  const scale = Math.max(5, Math.min(100, scalePercent)) / 100;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));

  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  return canvas;
}
