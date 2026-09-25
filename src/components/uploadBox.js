// Bikin kotak upload drag & drop yang bisa dipakai ulang.
// options: { mountId, accept, icon, title, hint, onFile }
function renderUploadBox(options) {
  const mount = document.getElementById(options.mountId);
  if (!mount) return;

  mount.innerHTML = `
    <label class="upload-box" tabindex="0">
      <div class="upload-box__icon">${options.icon || '📁'}</div>
      <div>${options.title || 'Klik atau seret file ke sini'}</div>
      <p class="upload-box__hint">${options.hint || ''}</p>
      <input type="file" accept="${options.accept || '*'}" />
    </label>
  `;

  const box = mount.querySelector('.upload-box');
  const input = mount.querySelector('input[type="file"]');

  const handleFiles = (files) => {
    if (files && files[0]) options.onFile(files[0]);
  };

  input.addEventListener('change', (e) => handleFiles(e.target.files));

  box.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      input.click();
    }
  });

  ['dragenter', 'dragover'].forEach((evt) =>
    box.addEventListener(evt, (e) => {
      e.preventDefault();
      box.classList.add('is-dragover');
    })
  );

  ['dragleave', 'drop'].forEach((evt) =>
    box.addEventListener(evt, (e) => {
      e.preventDefault();
      box.classList.remove('is-dragover');
    })
  );

  box.addEventListener('drop', (e) => {
    handleFiles(e.dataTransfer.files);
  });
}
