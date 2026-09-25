// Menyalakan "mesin" kompres (ffmpeg.wasm) hanya sekali, saat pertama dibutuhkan.
// ffmpeg.wasm dimuat dari CDN lewat <script> di compress.html (lihat window.FFmpeg).
let ffmpegInstance = null;

async function getFFmpeg(onLog) {
  if (ffmpegInstance) return ffmpegInstance;

  const { FFmpeg } = window.FFmpegWASM;
  const { toBlobURL } = window.FFmpegUtil;
  const ffmpeg = new FFmpeg();

  if (onLog) {
    ffmpeg.on('log', ({ message }) => onLog(message));
  }

  // ffmpeg.wasm WAJIB memuat file inti sebagai Blob URL, bukan URL CDN langsung,
  // karena browser memblokir worker yang mengimpor script lintas-domain.
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
  const coreURL = await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript');
  const wasmURL = await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm');

  await ffmpeg.load({ coreURL, wasmURL });

  ffmpegInstance = ffmpeg;
  return ffmpeg;
}
