// Kompres file MP3/audio. Bitrate dipilih agar ukuran mengecil
// tanpa merusak kualitas suara secara terdengar jelas.
const AUDIO_LEVELS = {
  ringan: { bitrate: '192k', label: 'Ringan (kualitas maksimal)' },
  seimbang: { bitrate: '128k', label: 'Seimbang (disarankan)' },
  maksimal: { bitrate: '96k', label: 'Maksimal (ukuran paling kecil)' },
};

async function compressAudio(file, levelKey, onProgress) {
  const ffmpeg = await getFFmpeg();
  const level = AUDIO_LEVELS[levelKey] || AUDIO_LEVELS.seimbang;

  ffmpeg.on('progress', ({ progress }) => {
    onProgress(Math.min(99, Math.round(progress * 100)));
  });

  const inputName = 'input' + (file.name.match(/\.\w+$/)?.[0] || '.mp3');
  const outputName = 'compressed.mp3';

  const { fetchFile } = window.FFmpegUtil;
  await ffmpeg.writeFile(inputName, await fetchFile(file));

  await ffmpeg.exec([
    '-i', inputName,
    '-acodec', 'libmp3lame',
    '-b:a', level.bitrate,
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  onProgress(100);

  return new Blob([data.buffer], { type: 'audio/mpeg' });
}
