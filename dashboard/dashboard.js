let allVibes = [];
let activeCollection = 'all';
let activeTag = null;
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();

  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.onChanged.addListener((changes) => {
      if (changes.vibes) {
        allVibes = changes.vibes.newValue || [];
        render();
      }
    });
  }
});

function loadData() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.get(['vibes'], (result) => {
      allVibes = result.vibes || [];
      render();
    });
  } else {
    const localData = localStorage.getItem('vibes');
    allVibes = localData ? JSON.parse(localData) : [];
    render();
  }
}

function saveData() {
  if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.local.set({ vibes: allVibes });
  } else {
    localStorage.setItem('vibes', JSON.stringify(allVibes));
  }
}

function setupEventListeners() {
  document.querySelectorAll('#collections-list li').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('#collections-list li').forEach(li => li.classList.remove('active'));
      item.classList.add('active');
      activeCollection = item.getAttribute('data-collection');
      activeTag = null;
      render();
    });
  });

  document.getElementById('search-input').addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    render();
  });

  document.getElementById('btn-export').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allVibes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `vibevault_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });
}

function render() {
  updateCounts();
  renderTagCloud();

  const grid = document.getElementById('grid-container');
  const emptyState = document.getElementById('empty-state');
  grid.innerHTML = '';

  const filtered = allVibes.filter(item => {
    const matchesCollection = activeCollection === 'all' || item.collection === activeCollection;
    const matchesTag = !activeTag || (item.tags && item.tags.includes(activeTag));
    const matchesSearch = !searchQuery || 
      item.title.toLowerCase().includes(searchQuery) ||
      item.note.toLowerCase().includes(searchQuery) ||
      (item.tags && item.tags.some(t => t.toLowerCase().includes(searchQuery)));

    return matchesCollection && matchesTag && matchesSearch;
  });

  document.getElementById('vault-stats').innerText = `${allVibes.length} Saved`;
  document.getElementById('current-view-title').innerText = 
    activeTag ? `Tag: #${activeTag}` : (activeCollection === 'all' ? 'All Items' : activeCollection);

  if (filtered.length === 0) {
    emptyState.style.display = 'block';
    return;
  }
  emptyState.style.display = 'none';

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'vibe-card';

    const formattedDate = new Date(item.dateAdded).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    const tagsHtml = (item.tags || []).map(t => `<span class="badge-tag">#${t}</span>`).join(' ');

    card.innerHTML = `
      <div class="card-header">
        <a href="${item.url}" target="_blank" class="card-title">${escapeHtml(item.title)}</a>
      </div>
      <div class="note-box">${escapeHtml(item.note)}</div>
      <div class="card-tags">${tagsHtml}</div>
      <div class="card-footer">
        <span>${formattedDate} · ${item.collection}</span>
        <button class="btn-delete" data-id="${item.id}">Delete</button>
      </div>
    `;

    card.querySelector('.btn-delete').addEventListener('click', () => deleteItem(item.id));
    grid.appendChild(card);
  });
}

function deleteItem(id) {
  allVibes = allVibes.filter(v => v.id !== id);
  saveData();
  render();
}

function updateCounts() {
  const counts = { all: allVibes.length, Design: 0, Dev: 0, Articles: 0, Music: 0, General: 0 };
  allVibes.forEach(v => {
    if (counts[v.collection] !== undefined) counts[v.collection]++;
  });

  Object.keys(counts).forEach(key => {
    const el = document.getElementById(`count-${key.toLowerCase()}`);
    if (el) el.innerText = counts[key];
  });
}

function renderTagCloud() {
  const cloud = document.getElementById('tag-cloud');
  cloud.innerHTML = '';
  
  const tagCounts = {};
  allVibes.forEach(v => {
    (v.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; });
  });

  Object.keys(tagCounts).forEach(tag => {
    const pill = document.createElement('span');
    pill.className = `tag-pill ${activeTag === tag ? 'active' : ''}`;
    pill.innerText = `#${tag} (${tagCounts[tag]})`;
    pill.addEventListener('click', () => {
      activeTag = activeTag === tag ? null : tag;
      render();
    });
    cloud.appendChild(pill);
  });
}

function escapeHtml(str) {
  return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}