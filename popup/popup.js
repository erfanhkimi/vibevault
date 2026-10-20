document.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let previewImageData = null;

  if (tab) {
    document.getElementById('input-title').value = tab.title || '';
    document.getElementById('input-url').value = tab.url || '';

    // Capture visible viewport screen as compressed JPEG
    try {
      previewImageData = await chrome.tabs.captureVisibleTab(null, {
        format: 'jpeg',
        quality: 50
      });
    } catch (e) {
      console.log('Preview capture unavailable for restricted page');
    }
  }

  document.getElementById('btn-open-dash').addEventListener('click', () => {
    chrome.tabs.create({ url: chrome.runtime.getURL('dashboard/dashboard.html') });
  });

  document.getElementById('btn-save').addEventListener('click', () => {
    const title = document.getElementById('input-title').value.trim();
    const url = document.getElementById('input-url').value;
    const note = document.getElementById('input-note').value.trim();
    const collection = document.getElementById('select-collection').value;
    const tagsInput = document.getElementById('input-tags').value;

    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];

    const newItem = {
      id: Date.now().toString(),
      title: title || url,
      url: url,
      note: note || "No notes provided.",
      collection: collection,
      tags: tags,
      previewImage: previewImageData,
      dateAdded: new Date().toISOString()
    };

    chrome.storage.local.get(['vibes'], (result) => {
      const current = result.vibes || [];
      chrome.storage.local.set({ vibes: [newItem, ...current] }, () => {
        const status = document.getElementById('status-msg');
        status.style.display = 'block';
        setTimeout(() => { window.close(); }, 700);
      });
    });
  });
});