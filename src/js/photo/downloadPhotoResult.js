function showPhotoResult({ mountId, originalFile, blob, ext }) {
  const url = URL.createObjectURL(blob);
  const baseName = originalFile.name.replace(/\.\w+$/, '');
  const fileName = `${baseName}-hasil.${ext}`;

  renderResultCard({
    mountId,
    fileName,
    originalBytes: originalFile.size,
    newBytes: blob.size,
    blobUrl: url,
  });

  return url;
}
