(function initCompressPage() {
  let selectedFile = null;
  let selectedKind = null;
  let selectedLevel = 'seimbang';

  const els = {
    step2: document.getElementById('step-2'),
    fileMeta: document.getElementById('file-meta'),
    progressWrap: document.getElementById('progress-wrap'),
    statusText: document.getElementById('status-text'),
    runBtn: document.getElementById('run-compress-btn'),
    resetBtn: document.getElementById('reset-btn'),
    levelChips: null,
  };

  const progress = createProgressController(document.getElementById('progress-wrap'));

  renderUploadBox({
    mountId: 'upload-mount',
    accept: 'video/*,audio/*,.mp4,.mov,.mp3,.wav,.m4a',
    icon: '🎬',
    title: 'Klik atau seret file MP4 / MP3 ke sini',
    hint: 'Maks 500MB. File diproses langsung di browser kamu.',
    onFile: handleFileSelected,
  });

  function handleFileSelected(file) {
    const result = validateMediaFile(file);
    if (!result.ok) {
      setStatus(result.message, true);
      return;
    }
    selectedFile = file;
    selectedKind = result.kind;
    setStatus('');
    document.getElementById('result-mount').innerHTML = '';
    showStep2();
  }

  function showStep2() {
    els.step2.hidden = false;
    els.fileMeta.innerHTML = `
      <div class="file-meta-row">
        <span>${selectedFile.name}</span>
        <span>${formatBytes(selectedFile.size)} &middot; ${selectedKind === 'video' ? 'Video' : 'Audio'}</span>
      </div>
    `;
    els.step2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  document.querySelectorAll('input[name="quality-level"]').forEach((input) => {
    input.addEventListener('change', () => {
      selectedLevel = input.value;
      document.querySelectorAll('.radio-chip').forEach((chip) => {
        chip.classList.toggle('is-active', chip.contains(input) ? input.checked : false);
      });
    });
  });

  els.runBtn.addEventListener('click', runCompression);
  els.resetBtn.addEventListener('click', resetTool);

  async function runCompression() {
    if (!selectedFile) return;
    els.runBtn.disabled = true;
    setStatus('Memuat mesin kompres (sekali saja, mohon tunggu)...');
    progress.set(2, 'Menyiapkan');

    try {
      const onProgress = (pct) => progress.set(pct, 'Mengompres');
      let blob;
      if (selectedKind === 'video') {
        blob = await compressVideo(selectedFile, selectedLevel, onProgress);
      } else {
        blob = await compressAudio(selectedFile, selectedLevel, onProgress);
      }

      setStatus('Selesai! File siap diunduh.');
      showCompressResult({
        mountId: 'result-mount',
        originalFile: selectedFile,
        blob,
        kind: selectedKind,
      });
    } catch (err) {
      console.error(err);
      setStatus(`Terjadi kendala saat memproses file: ${err.message || 'coba muat ulang halaman.'}`, true);
    } finally {
      els.runBtn.disabled = false;
    }
  }

  function resetTool() {
    selectedFile = null;
    selectedKind = null;
    els.step2.hidden = true;
    document.getElementById('result-mount').innerHTML = '';
    progress.reset();
    setStatus('');
  }

  function setStatus(text, isError) {
    els.statusText.textContent = text;
    els.statusText.classList.toggle('is-error', Boolean(isError));
  }
})();
