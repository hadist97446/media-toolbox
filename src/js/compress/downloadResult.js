// Ubah blob hasil kompres jadi URL yang bisa didownload, lalu tampilkan resultCard.
function showCompressResult({ mountId, originalFile, blob, kind }) {
  const url = URL.createObjectURL(blob);
  const ext = kind === 'video' ? '.mp4' : '.mp3';
  const baseName = originalFile.name.replace(/\.\w+$/, '');
  const fileName = `${baseName}-kecil${ext}`;

  renderResultCard({
    mountId,
    fileName,
    originalBytes: originalFile.size,
    newBytes: blob.size,
    blobUrl: url,
  });
}
