// Ubah canvas jadi file gambar terkompres (JPEG/WebP).
// quality: 0.1 (ukuran paling kecil) - 1.0 (kualitas paling tinggi)
function canvasToCompressedBlob(canvas, format, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Gagal membuat file gambar.'))),
      format,
      quality
    );
  });
}
