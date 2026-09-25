// Baca file foto yang diupload dan ubah jadi <img> yang siap diolah di canvas.
function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Gagal membaca gambar.'));
      img.src = reader.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file.'));
    reader.readAsDataURL(file);
  });
}

function validateImageFile(file) {
  const isImage = file.type.startsWith('image/') || /\.(jpe?g|png|webp)$/i.test(file.name);
  if (!isImage) {
    return { ok: false, message: 'Format tidak didukung. Gunakan JPG, PNG, atau WebP.' };
  }
  const MAX_SIZE = 30 * 1024 * 1024; // 30MB
  if (file.size > MAX_SIZE) {
    return { ok: false, message: 'File terlalu besar (maks 30MB).' };
  }
  return { ok: true };
}
