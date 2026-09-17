const AREAS = [
  ['Disease Control', 'Antibiotics, antimycoplasma products, anticoccidials, dewormers and respiratory support'],
  ['Intestinal Health', 'Acidifiers, probiotics, prebiotics, synbiotics and intestinal-integrity products'],
  ['Nutrition', 'Vitamins, minerals, calcium, amino acids and electrolytes'],
  ['Metabolic Health', 'Toxin binders, liver, renal and immune support'],
  ['Nutrient Utilisation', 'Enzymes, emulsifiers and feed-efficiency support'],
  ['Botanicals', 'Phytogenics and functional herbal support'],
  ['Biosecurity', 'Feed, water, premises and pest control'],
  ['Vaccines & Diagnostics', 'Prevention, detection and practitioner decision support']
];

let records = [];
let activeArea = '';
let sortKey = 'product';

function parseCSV(text) {
  const rows = []; let row = []; let cell = ''; let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i]; const next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { row.push(cell); cell = ''; }
    else if ((char === '\n' || char === '\r') && !quoted) {
      if (char === '\r' && next === '\n') i += 1;
      row.push(cell); if (row.some((value) => value.trim())) rows.push(row); row = []; cell = '';
    } else cell += char;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift().map((header) => header.trim());
  return rows.map((values) => Object.fromEntries(headers.map((header, index) => [header, (values[index] || '').trim()])));
}

function unique(key) { return [...new Set(records.map((record) => record[key]).filter(Boolean))].sort(); }
function fillSelect(id, values) { const select = document.getElementById(id); values.forEach((value) => { const option = document.createElement('option'); option.value = value; option.textContent = value; select.append(option); }); }
function makeAreaButtons() {
  const container = document.getElementById('area-buttons');
  AREAS.forEach(([name, detail], index) => {
    const button = document.createElement('button'); button.type = 'button'; button.className = 'area-card';
    button.innerHTML = `<span>${String(index + 1).padStart(2, '0')}</span><strong>${name}</strong><small>${detail}</small>`;
    button.addEventListener('click', () => { activeArea = activeArea === name ? '' : name; document.querySelectorAll('.area-card').forEach((node) => node.classList.toggle('selected', node === button && activeArea)); render(); });
    container.append(button);
  });
}
function render() {
  const query = document.getElementById('search-input').value.trim().toLowerCase();
  const category = document.getElementById('category-filter').value;
  const status = document.getElementById('status-filter').value;
  const filtered = records.filter((record) => {
    const haystack = Object.values(record).join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (!category || record.category === category) && (!status || record.status === status) && (!activeArea || record.area === activeArea);
  }).sort((a, b) => (a[sortKey] || '').localeCompare(b[sortKey] || ''));
  document.getElementById('result-count').textContent = `${filtered.length} of ${records.length} records shown`;
  const container = document.getElementById('results'); container.innerHTML = '';
  filtered.forEach((record) => {
    const article = document.createElement('article'); article.className = 'record-card';
    const statusClass = record.status.toLowerCase().includes('verified') ? 'verified' : record.status.toLowerCase().includes('legacy') ? 'legacy' : 'check';
    article.innerHTML = `<div class="record-top"><span class="category-tag">${record.category}</span><span class="status ${statusClass}">${record.status}</span></div><h3>${record.product}</h3><dl><div><dt>Generic composition</dt><dd>${record.generic || 'Not stated'}</dd></div><div><dt>Company / institution</dt><dd>${record.company || 'Not stated'}</dd></div><div><dt>Use / decision context</dt><dd>${record.use || 'Not stated'}</dd></div><div><dt>Dosage / duration</dt><dd>${record.dosage || 'Verify current label'}</dd></div></dl>${record.remarks ? `<p class="remarks"><strong>Remarks:</strong> ${record.remarks}</p>` : ''}`;
    container.append(article);
  });
  document.getElementById('empty-state').hidden = filtered.length !== 0;
}

makeAreaButtons();
fetch('data/products.csv').then((response) => { if (!response.ok) throw new Error('Could not load the reference data.'); return response.text(); }).then((text) => {
  records = parseCSV(text); fillSelect('category-filter', unique('category')); fillSelect('status-filter', unique('status')); render();
}).catch((error) => { document.getElementById('result-count').textContent = error.message; });
['search-input', 'category-filter', 'status-filter'].forEach((id) => document.getElementById(id).addEventListener(id === 'search-input' ? 'input' : 'change', render));
document.getElementById('clear-search').addEventListener('click', () => { document.getElementById('search-input').value = ''; render(); });
document.getElementById('show-all').addEventListener('click', () => { activeArea = ''; document.getElementById('search-input').value = ''; document.getElementById('category-filter').value = ''; document.getElementById('status-filter').value = ''; document.querySelectorAll('.area-card').forEach((node) => node.classList.remove('selected')); render(); });
document.querySelectorAll('[data-sort]').forEach((button) => button.addEventListener('click', () => { sortKey = button.dataset.sort; render(); }));
