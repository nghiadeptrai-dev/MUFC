/* ────────────────────────────────────────────
   DATA SEED (từ playersDetailData)
──────────────────────────────────────────── */
let players = [
  { id:'bruno-fernandes',  number:8,  name:'Bruno Fernandes',   pos:'MID', posLabel:'Tiền Vệ Công',       nationality:'Bồ Đào Nha', birth:'8/9/1994',   joined:2020, height:'1.79 m', weight:'69 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559977_102167101.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:24, assists:16, appearances:52 },
  { id:'benjamin-sesko',   number:30, name:'Benjamin Šeško',    pos:'FWD', posLabel:'Tiền Đạo',           nationality:'Slovenia',    birth:'31/5/2003',  joined:2024, height:'1.94 m', weight:'86 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896326/media_102559907_102167031.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:13, assists:5,  appearances:28 },
  { id:'joshua-zirkzee',   number:11, name:'Joshua Zirkzee',    pos:'FWD', posLabel:'Tiền Đạo / Cánh',    nationality:'Hà Lan',      birth:'22/5/2001',  joined:2024, height:'1.88 m', weight:'78 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896326/media_102559902_102167028.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:11, assists:7,  appearances:34 },
  { id:'altay-bayindir',   number:1,  name:'Altay Bayındır',    pos:'GK',  posLabel:'Thủ Môn',            nationality:'Thổ Nhĩ Kỳ', birth:'14/4/1998',  joined:2024, height:'1.92 m', weight:'90 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896327/media_102559947_102167070.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:0,  assists:0,  appearances:25 },
  { id:'diogo-dalot',      number:20, name:'Diogo Dalot',       pos:'DEF', posLabel:'Hậu Vệ Phải / Đội Trưởng', nationality:'Bồ Đào Nha', birth:'18/3/1999', joined:2018, height:'1.83 m', weight:'79 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559860_102166986.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:3,  assists:10, appearances:48 },
  { id:'luke-shaw',        number:23, name:'Luke Shaw',         pos:'DEF', posLabel:'Hậu Vệ Trái',        nationality:'Anh',         birth:'12/7/1995',  joined:2014, height:'1.85 m', weight:'74 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559870_102166995.jpg?fmt=webp&f=center&w=600&h=818', status:'injured', goals:2,  assists:9,  appearances:44 },
  { id:'kobbie-mainoo',    number:37, name:'Kobbie Mainoo',     pos:'MID', posLabel:'Tiền Vệ Trung Tâm',  nationality:'Anh',         birth:'1/5/2005',   joined:2023, height:'1.78 m', weight:'72 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559979_102167103.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:3,  assists:4,  appearances:39 },
  { id:'mason-mount',      number:7,  name:'Mason Mount',       pos:'MID', posLabel:'Tiền Vệ Trung Tâm',  nationality:'Anh',         birth:'10/1/1999',  joined:2023, height:'1.81 m', weight:'73 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559976_102167100.jpg?fmt=webp&f=center&w=600&h=818', status:'injured', goals:5,  assists:7,  appearances:46 },
  { id:'harry-maguire',    number:5,  name:'Harry Maguire',     pos:'DEF', posLabel:'Hậu Vệ Trung Tâm',  nationality:'Anh',         birth:'5/3/1993',   joined:2019, height:'1.94 m', weight:'100 kg',img:'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559861_102166984.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:2,  assists:0,  appearances:41 },
  { id:'senne-lammens',    number:24, name:'Senne Lammens',     pos:'GK',  posLabel:'Thủ Môn',            nationality:'Bỉ',          birth:'6/3/2003',   joined:2024, height:'1.90 m', weight:'84 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896327/media_102559948_102167072.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:0,  assists:0,  appearances:21 },
  { id:'leny-yoro',        number:15, name:'Leny Yoro',         pos:'DEF', posLabel:'Hậu Vệ Trung Tâm',  nationality:'Pháp',        birth:'13/1/2005',  joined:2024, height:'1.92 m', weight:'83 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559869_102166993_compressed.jpg?fmt=webp&f=center&w=600&h=818', status:'active', goals:0, assists:0, appearances:26 },
  { id:'amad-diallo',      number:16, name:'Amad Diallo',       pos:'FWD', posLabel:'Cánh Phải',          nationality:'Bờ Biển Ngà', birth:'11/7/2002',  joined:2021, height:'1.72 m', weight:'64 kg', img:'https://dynamic-crop-cdn.scoreplay.io/472/4896326/media_102559906_102167030.jpg?fmt=webp&f=center&w=600&h=818', status:'active',  goals:8,  assists:6,  appearances:33 },
];

/* ── STATE ── */
let sortCol = 'number', sortAsc = true;
let filterPos = '', filterStatus = '', filterSearch = '';
let editingId = null, deletingId = null;

/* ── PAGINATION STATE (NEW) ── */
const PAGE_SIZE = 10;
let currentPage = 1;

/* ── HELPERS ── */
const posClass  = { GK:'pos-gk', DEF:'pos-def', MID:'pos-mid', FWD:'pos-fwd' };
const posLabels = { GK:'GK', DEF:'DEF', MID:'MID', FWD:'FWD' };
const statusLabel = { active:'Active', injured:'Injured', suspend:'Suspend' };
const statusClass  = { active:'status-active', injured:'status-injured', suspend:'status-suspend' };

function uid() { return 'p-' + Date.now() + '-' + Math.random().toString(36).slice(2,6); }
function initials(name) { return name.split(' ').slice(-2).map(w=>w[0]).join('').toUpperCase(); }

function toast(msg, type='success') {
  const wrap = document.getElementById('toast-wrap');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  el.innerHTML = `<i class="ti ti-${type==='success'?'circle-check':'alert-circle'}"></i>${msg}`;
  wrap.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

/* ── RENDER TABLE ── */
function getFiltered() {
  return players.filter(p => {
    if (filterPos    && p.pos    !== filterPos)    return false;
    if (filterStatus && p.status !== filterStatus) return false;
    if (filterSearch && !p.name.toLowerCase().includes(filterSearch.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    let va = a[sortCol] ?? 0, vb = b[sortCol] ?? 0;
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    return sortAsc ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
  });
}

function renderTable() {
  const tbody = document.getElementById('players-tbody');
  const filtered = getFiltered();
  const total = filtered.length;

  /* Clamp currentPage */
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (currentPage > totalPages) currentPage = totalPages;

  /* Slice for current page */
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  /* Update count bar */
  document.getElementById('count-shown').textContent = total;
  document.getElementById('count-total').textContent = players.length;

  if (!total) {
    tbody.innerHTML = `<tr><td colspan="9"><div class="table-empty"><i class="ti ti-users-off"></i>Không tìm thấy cầu thủ nào</div></td></tr>`;
    renderPagination(0, 1, 1);
    return;
  }

  tbody.innerHTML = pageItems.map(p => `
    <tr>
      <td class="col-num"><div class="jersey-num">${p.number}</div></td>
      <td class="col-player">
        <div class="player-cell">
          <img class="player-avatar" src="${p.img}" alt="${p.name}"
               onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
               loading="lazy" />
          <div class="player-avatar-fallback" style="display:none">${initials(p.name)}</div>
          <div>
            <div class="player-name-text">${p.name}</div>
            <div class="player-joined">Gia nhập ${p.joined}</div>
          </div>
        </div>
      </td>
      <td class="col-pos"><span class="pos-badge ${posClass[p.pos] || 'pos-mid'}">${posLabels[p.pos] || p.pos}</span></td>
      <td class="col-nat">${p.nationality || '—'}</td>
      <td class="col-stats"><span class="stat-cell">${p.goals ?? 0}</span></td>
      <td class="col-stats"><span class="stat-cell">${p.assists ?? 0}</span></td>
      <td class="col-stats"><span class="stat-cell">${p.appearances ?? 0}</span></td>
      <td class="col-status"><span class="status-badge ${statusClass[p.status] || 'status-active'}">${statusLabel[p.status] || 'Active'}</span></td>
      <td class="col-action">
        <div class="action-btns">
          <button class="act-btn act-edit" onclick="openEdit('${p.id}')" title="Sửa"><i class="ti ti-pencil"></i></button>
          <button class="act-btn act-del"  onclick="openDelete('${p.id}')" title="Xóa"><i class="ti ti-trash"></i></button>
        </div>
      </td>
    </tr>
  `).join('');

  renderPagination(total, currentPage, totalPages);
}

/* ── PAGINATION RENDER (NEW) ── */
function renderPagination(total, page, totalPages) {
  const bar = document.getElementById('pagination-bar');
  if (!bar) return;

  const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const end   = Math.min(page * PAGE_SIZE, total);

  /* Info text */
  const info = bar.querySelector('.pagination-info');
  if (info) {
    info.innerHTML = total === 0
      ? 'Không có dữ liệu'
      : `Hiển thị <strong>${start}–${end}</strong> / <strong>${total}</strong> cầu thủ`;
  }

  /* Controls */
  const controls = bar.querySelector('.pagination-controls');
  if (!controls) return;

  /* Build page numbers with ellipsis */
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (page > 3) pages.push('...');
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) pages.push(i);
    if (page < totalPages - 2) pages.push('...');
    pages.push(totalPages);
  }

  controls.innerHTML = `
    <button class="page-btn" id="pg-prev" ${page <= 1 ? 'disabled' : ''} title="Trang trước">
      <i class="ti ti-chevron-left"></i>
    </button>
    ${pages.map(p =>
      p === '...'
        ? `<span class="page-ellipsis">…</span>`
        : `<button class="page-btn ${p === page ? 'active' : ''}" data-page="${p}">${p}</button>`
    ).join('')}
    <button class="page-btn" id="pg-next" ${page >= totalPages ? 'disabled' : ''} title="Trang sau">
      <i class="ti ti-chevron-right"></i>
    </button>
  `;

  /* Bind events */
  controls.querySelector('#pg-prev')?.addEventListener('click', () => { if (currentPage > 1) { currentPage--; renderTable(); } });
  controls.querySelector('#pg-next')?.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; renderTable(); } });
  controls.querySelectorAll('.page-btn[data-page]').forEach(btn => {
    btn.addEventListener('click', () => { currentPage = parseInt(btn.dataset.page); renderTable(); });
  });
}

/* ── SORT ── */
document.querySelectorAll('th.sortable').forEach(th => {
  th.addEventListener('click', () => {
    const col = th.dataset.col;
    if (sortCol === col) sortAsc = !sortAsc;
    else { sortCol = col; sortAsc = true; }
    document.querySelectorAll('th.sortable').forEach(t => t.classList.remove('sort-asc','sort-desc'));
    th.classList.add(sortAsc ? 'sort-asc' : 'sort-desc');
    currentPage = 1; /* Reset to page 1 on sort */
    renderTable();
  });
});

/* ── FILTERS ── */
document.getElementById('search-input').addEventListener('input', e => { filterSearch = e.target.value; currentPage = 1; renderTable(); });
document.getElementById('filter-pos').addEventListener('change', e => { filterPos = e.target.value; currentPage = 1; renderTable(); });
document.getElementById('filter-status').addEventListener('change', e => { filterStatus = e.target.value; currentPage = 1; renderTable(); });

/* ── FORM MODAL ── */
function openAdd() {
  editingId = null;
  document.getElementById('form-modal-title').innerHTML = 'Thêm <span>Cầu Thủ</span>';
  document.getElementById('form-save-btn').textContent = 'Thêm cầu thủ';
  ['name','number','pos','nat','birth','joined','height','weight','img','apps','goals','assists','cards'].forEach(id => {
    const el = document.getElementById('f-'+id);
    if (el) el.value = '';
  });
  document.getElementById('f-status').value = 'active';
  document.getElementById('form-modal').classList.add('open');
}

function openEdit(id) {
  const p = players.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('form-modal-title').innerHTML = 'Sửa <span>Cầu Thủ</span>';
  document.getElementById('form-save-btn').textContent = 'Lưu thay đổi';
  document.getElementById('f-name').value    = p.name || '';
  document.getElementById('f-number').value  = p.number || '';
  document.getElementById('f-pos').value     = p.pos || '';
  document.getElementById('f-nat').value     = p.nationality || '';
  document.getElementById('f-birth').value   = p.birth || '';
  document.getElementById('f-joined').value  = p.joined || '';
  document.getElementById('f-height').value  = p.height || '';
  document.getElementById('f-weight').value  = p.weight || '';
  document.getElementById('f-img').value     = p.img || '';
  document.getElementById('f-status').value  = p.status || 'active';
  document.getElementById('f-apps').value    = p.appearances || 0;
  document.getElementById('f-goals').value   = p.goals || 0;
  document.getElementById('f-assists').value = p.assists || 0;
  document.getElementById('f-cards').value   = p.cards || '';
  document.getElementById('form-modal').classList.add('open');
}

function closeFormModal() { document.getElementById('form-modal').classList.remove('open'); }

document.getElementById('btn-add-player').addEventListener('click', openAdd);
document.getElementById('form-modal-close').addEventListener('click', closeFormModal);
document.getElementById('form-cancel-btn').addEventListener('click', closeFormModal);
document.getElementById('form-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeFormModal(); });

document.getElementById('form-save-btn').addEventListener('click', () => {
  const name   = document.getElementById('f-name').value.trim();
  const number = parseInt(document.getElementById('f-number').value) || 0;
  const pos    = document.getElementById('f-pos').value;
  if (!name || !pos) { toast('Vui lòng điền đầy đủ tên và vị trí', 'error'); return; }

  const data = {
    name, number, pos,
    posLabel: document.getElementById('f-pos').options[document.getElementById('f-pos').selectedIndex]?.text || pos,
    nationality: document.getElementById('f-nat').value.trim(),
    birth:   document.getElementById('f-birth').value.trim(),
    joined:  parseInt(document.getElementById('f-joined').value) || new Date().getFullYear(),
    height:  document.getElementById('f-height').value.trim(),
    weight:  document.getElementById('f-weight').value.trim(),
    img:     document.getElementById('f-img').value.trim(),
    status:  document.getElementById('f-status').value,
    appearances: parseInt(document.getElementById('f-apps').value) || 0,
    goals:   parseInt(document.getElementById('f-goals').value) || 0,
    assists: parseInt(document.getElementById('f-assists').value) || 0,
    cards:   document.getElementById('f-cards').value.trim(),
  };

  if (editingId) {
    const idx = players.findIndex(p => p.id === editingId);
    if (idx !== -1) players[idx] = { ...players[idx], ...data };
    toast(`Đã cập nhật ${name}`);
  } else {
    data.id = uid();
    players.unshift(data);
    toast(`Đã thêm ${name}`);
  }
  closeFormModal();
  renderTable();
});

/* ── DELETE MODAL ── */
function openDelete(id) {
  deletingId = id;
  const p = players.find(x => x.id === id);
  document.getElementById('delete-player-name').textContent = p ? p.name : '?';
  document.getElementById('delete-modal').classList.add('open');
}

function closeDeleteModal() { document.getElementById('delete-modal').classList.remove('open'); }

document.getElementById('delete-cancel-btn').addEventListener('click', closeDeleteModal);
document.getElementById('delete-modal').addEventListener('click', e => { if (e.target === e.currentTarget) closeDeleteModal(); });
document.getElementById('delete-confirm-btn').addEventListener('click', () => {
  const p = players.find(x => x.id === deletingId);
  players = players.filter(x => x.id !== deletingId);
  toast(`Đã xóa ${p?.name || 'cầu thủ'}`, 'error');
  closeDeleteModal();
  renderTable();
});

/* ── HAMBURGER ── */
const sidebar  = document.getElementById('sidebar');
const overlay  = document.getElementById('sidebar-overlay');
const hamburger = document.getElementById('hamburger-btn');

hamburger.addEventListener('click', () => {
  const open = sidebar.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  overlay.classList.toggle('visible', open);
});
overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('visible');
});

/* ── DATE ── */
const d = new Date();
document.getElementById('current-date').textContent =
  d.toLocaleDateString('vi-VN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });

/* ── INIT ── */
renderTable();
