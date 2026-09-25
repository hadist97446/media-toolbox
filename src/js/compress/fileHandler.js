// Cek jenis file yang diupload user: video (mp4) atau audio (mp3)/(lainnya)
const ACCEPTED_VIDEO = ['video/mp4', 'video/quicktime', 'video/x-matroska', 'video/webm'];
const ACCEPTED_AUDIO = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/x-wav', 'audio/aac'];

function detectMediaKind(file) {
  if (ACCEPTED_VIDEO.includes(file.type) || /\.(mp4|mov|mkv|webm)$/i.test(file.name)) {
    return 'video';
  }
  if (ACCEPTED_AUDIO.includes(file.type) || /\.(mp3|wav|aac|m4a)$/i.test(file.name)) {
    return 'audio';
  }
  return null;
}

function validateMediaFile(file) {
  const kind = detectMediaKind(file);
  if (!kind) {
    return { ok: false, message: 'Format file tidak didukung. Gunakan MP4, MOV, MP3, atau WAV.' };
  }
  const MAX_SIZE = 500 * 1024 * 1024; // 500MB, batas wajar untuk proses di browser
  if (file.size > MAX_SIZE) {
    return { ok: false, message: 'File terlalu besar untuk diproses di browser (maks 500MB).' };
  }
  return { ok: true, kind };
}
