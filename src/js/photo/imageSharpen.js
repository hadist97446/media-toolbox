// Terapkan "unsharp mask": buram-kan gambar sedikit, lalu tambahkan
// balik selisih (asli - buram) supaya tepian terlihat lebih tegas.
// Ini jauh lebih halus daripada kernel tajam biasa, yang gampang
// membuat gambar terlihat pecah/bernoise di area detail halus.
// amount: 0 (tanpa efek) sampai 100 (paling tajam, tetap terkontrol).
function sharpenCanvas(canvas, amount) {
  if (!amount || amount <= 0) return canvas;

  // Batasi kekuatan maksimum supaya tidak overshoot dan bikin gambar pecah.
  const strength = (Math.min(100, amount) / 100) * 0.9; // 0..0.9

  const ctx = canvas.getContext('2d');
  const { width, height } = canvas;
  const original = ctx.getImageData(0, 0, width, height);

  const blurred = boxBlur(original, width, height);

  const out = ctx.createImageData(width, height);
  const src = original.data;
  const blur = blurred.data;
  const dst = out.data;

  for (let i = 0; i < src.length; i += 4) {
    for (let c = 0; c < 3; c++) {
      const detail = src[i + c] - blur[i + c];
      dst[i + c] = clamp255(src[i + c] + detail * strength);
    }
    dst[i + 3] = src[i + 3];
  }

  ctx.putImageData(out, 0, 0);
  return canvas;
}

function clamp255(value) {
  return value < 0 ? 0 : value > 255 ? 255 : value;
}

// Box blur 3x3 sederhana, dipakai sebagai dasar unsharp mask.
function boxBlur(imageData, width, height) {
  const src = imageData.data;
  const out = new ImageData(width, height);
  const dst = out.data;
  const idx = (x, y) => (y * width + x) * 4;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let r = 0, g = 0, b = 0, count = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          const px = x + kx;
          const py = y + ky;
          if (px < 0 || px >= width || py < 0 || py >= height) continue;
          const i = idx(px, py);
          r += src[i];
          g += src[i + 1];
          b += src[i + 2];
          count++;
        }
      }
      const i = idx(x, y);
      dst[i] = r / count;
      dst[i + 1] = g / count;
      dst[i + 2] = b / count;
      dst[i + 3] = src[i + 3];
    }
  }

  return out;
}
