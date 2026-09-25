// Ubah angka byte menjadi teks yang gampang dibaca, misal 2500000 -> "2.5 MB"
function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(1024))
  );
  const value = bytes / Math.pow(1024, i);
  return `${value.toFixed(i === 0 ? 0 : decimals)} ${units[i]}`;
}

// Hitung persen pengurangan ukuran file, misal dari 10MB ke 4MB = "60% lebih kecil"
function formatSavings(originalBytes, newBytes) {
  if (!originalBytes || originalBytes <= 0) return '';
  const diff = originalBytes - newBytes;
  const percent = Math.max(0, Math.round((diff / originalBytes) * 100));
  return `${percent}% lebih kecil`;
}
