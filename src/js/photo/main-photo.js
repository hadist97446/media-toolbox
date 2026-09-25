(function initPhotoPage() {
  let selectedFile = null;
  let loadedImage = null;
  let lastResultUrl = null;

  const els = {
    step2: document.getElementById('step-2'),
    statusText: document.getElementById('status-text'),
    scaleInput: document.getElementById('scale-input'),
    scaleOutput: document.getElementById('scale-output'),
    sharpenInput: document.getElementById('sharpen-input'),
    sharpenOutput: document.getElementById('sharpen-output'),
    formatInputs: document.querySelectorAll('input[name="photo-format"]'),
    runBtn: document.getElementById('run-photo-btn'),
    resetBtn: document.getElementById('reset-photo-btn'),
    previewPair: document.getElementById('preview-pair'),
    beforeImg: document.getElementById('preview-before'),
    afterImg: document.getElementById('preview-after'),
  };

  let selectedFormat = 'image/jpeg';
  let formatExt = 'jpg';

  renderUploadBox({
    mountId: 'upload-mount',
    accept: 'image/*,.jpg,.jpeg,.png,.webp',
    icon: '🖼️',
    title: 'Klik atau seret foto ke sini',
    hint: 'JPG, PNG, atau WebP. Maks 30MB.',
    onFile: handleFileSelected,
  });

  async function handleFileSelected(file) {
    const result = validateImageFile(file);
    if (!result.ok) {
      setStatus(result.message, true);
      return;
    }
    setStatus('Memuat gambar...');
    try {
      loadedImage = await loadImageFromFile(file);
      selectedFile = file;
      setStatus('');
      document.getElementById('result-mount').innerHTML = '';
      showStep2();
    } catch (err) {
      setStatus('Gagal membaca gambar. Coba file lain.', true);
    }
  }

  function showStep2() {
    els.step2.hidden = false;
    els.previewPair.hidden = true;
    els.beforeImg.src = loadedImage.src;
    els.step2.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  els.scaleInput.addEventListener('input', () => {
    els.scaleOutput.textContent = `${els.scaleInput.value}%`;
  });

  els.sharpenInput.addEventListener('input', () => {
    els.sharpenOutput.textContent = `${els.sharpenInput.value}%`;
  });

  els.formatInputs.forEach((input) => {
    input.addEventListener('change', () => {
      selectedFormat = input.value;
      formatExt = input.value === 'image/webp' ? 'webp' : 'jpg';
      document.querySelectorAll('.radio-chip').forEach((chip) => {
        chip.classList.toggle('is-active', chip.contains(input) ? input.checked : false);
      });
    });
  });

  els.runBtn.addEventListener('click', runProcessing);
  els.resetBtn.addEventListener('click', resetTool);

  async function runProcessing() {
    if (!loadedImage) return;
    els.runBtn.disabled = true;
    setStatus('Memproses gambar...');

    try {
      const scale = Number(els.scaleInput.value);
      const sharpenAmount = Number(els.sharpenInput.value);

      let canvas = resizeImageToCanvas(loadedImage, scale);
      canvas = sharpenCanvas(canvas, sharpenAmount);

      const quality = 0.82;
      const blob = await canvasToCompressedBlob(canvas, selectedFormat, quality);

      if (lastResultUrl) URL.revokeObjectURL(lastResultUrl);
      lastResultUrl = showPhotoResult({
        mountId: 'result-mount',
        originalFile: selectedFile,
        blob,
        ext: formatExt,
      });

      els.afterImg.src = lastResultUrl;
      els.previewPair.hidden = false;
      setStatus('Selesai! Foto siap diunduh.');
    } catch (err) {
      console.error(err);
      setStatus('Terjadi kendala saat memproses foto. Coba lagi.', true);
    } finally {
      els.runBtn.disabled = false;
    }
  }

  function resetTool() {
    selectedFile = null;
    loadedImage = null;
    els.step2.hidden = true;
    document.getElementById('result-mount').innerHTML = '';
    setStatus('');
  }

  function setStatus(text, isError) {
    els.statusText.textContent = text;
    els.statusText.classList.toggle('is-error', Boolean(isError));
  }
})();
