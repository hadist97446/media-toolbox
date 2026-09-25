// Kompres file MP4. "level" mengatur seberapa agresif kompresnya:
// crf lebih tinggi = file lebih kecil, kualitas sedikit turun.
// Suara TIDAK ikut dikompres berat (audio bitrate dijaga tetap wajar)
// supaya musik/suara tidak rusak.
const VIDEO_LEVELS = {
  ringan: { crf: 26, audioBitrate: '160k', label: 'Ringan (kualitas maksimal)' },
  seimbang: { crf: 30, audioBitrate: '128k', label: 'Seimbang (disarankan)' },
  maksimal: { crf: 34, audioBitrate: '96k', label: 'Maksimal (ukuran paling kecil)' },
};

async function compressVideo(file, levelKey, onProgress) {
  const ffmpeg = await getFFmpeg();
  const level = VIDEO_LEVELS[levelKey] || VIDEO_LEVELS.seimbang;

  ffmpeg.on('progress', ({ progress }) => {
    onProgress(Math.min(99, Math.round(progress * 100)));
  });

  const inputName = 'input' + (file.name.match(/\.\w+$/)?.[0] || '.mp4');
  const outputName = 'compressed.mp4';

  const { fetchFile } = window.FFmpegUtil;
  await ffmpeg.writeFile(inputName, await fetchFile(file));

  await ffmpeg.exec([
    '-i', inputName,
    '-vcodec', 'libx264',
    '-crf', String(level.crf),
    '-preset', 'veryfast',
    '-acodec', 'aac',
    '-b:a', level.audioBitrate,
    outputName,
  ]);

  const data = await ffmpeg.readFile(outputName);
  onProgress(100);

  return new Blob([data.buffer], { type: 'video/mp4' });
}
