/* ============================================================
   BIT FC DASHBOARD - MAIN JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  renderTopbar();
  renderNextMatch();
  renderStatCards();
  renderBarChart();
  renderRecentMatches();
  renderForm();
  renderStatBars();
  renderStandings();
  renderTopScorers();
  renderTopAssists();
  renderMedia();
  initNavItems();
  updateDate();
});

/* ---- HELPERS ---- */
function el(id) { return document.getElementById(id); }

function avatarStyle(color) {
  return `style="background:${color}"`;
}

function formDotHTML(result) {
  return `<div class="form-dot ${result}">${result}</div>`;
}

function resultBadgeHTML(result) {
  return `<div class="result-badge ${result}">${result}</div>`;
}

/* ---- DATE ---- */
function updateDate() {
  const days = ['Chủ Nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy'];
  const now   = new Date();
  const d     = `${days[now.getDay()]}, ${now.getDate()} Tháng ${now.getMonth()+1}, ${now.getFullYear()}`;
  const node  = el('current-date');
  if (node) node.textContent = d;
}

/* ---- TOPBAR ---- */
function renderTopbar() {
  const { team } = BITFC_DATA;
  const greet = el('topbar-greet');
  const title = el('topbar-title');
  if (greet) greet.textContent = `Xin chào, Admin`;
  if (title) title.innerHTML = `Tổng quan <span>${team.name}</span>`;
}

/* ---- NEXT MATCH ---- */
function renderNextMatch() {
  const nm = BITFC_DATA.nextMatch;
  const team = BITFC_DATA.team;

  const homeTeam = nm.isHome ? team.name : nm.opponent;
  const awayTeam = nm.isHome ? nm.opponent : team.name;
  const homeLabel = nm.isHome ? 'Sân nhà' : 'Khách';
  const awayLabel = nm.isHome ? 'Khách' : 'Sân nhà';

  const container = el('next-match-content');
  if (!container) return;

  container.innerHTML = `
    <div>
      <div class="nm-label">Trận tiếp theo · ${nm.competition}</div>
      <div class="nm-teams">
        <div>
          <div class="nm-team-name">${homeTeam}</div>
          <div class="nm-team-sub">${homeLabel}</div>
        </div>
        <div class="nm-vs">VS</div>
        <div>
          <div class="nm-team-name">${awayTeam}</div>
          <div class="nm-team-sub" style="text-align:right">${awayLabel}</div>
        </div>
      </div>
    </div>
    <div class="nm-divider"></div>
    <div class="nm-meta">
      <div class="nm-meta-item">
        <i class="ti ti-calendar" aria-hidden="true"></i>
        <span>${nm.date}</span>
      </div>
      <div class="nm-meta-item">
        <i class="ti ti-clock" aria-hidden="true"></i>
        <span>${nm.time}</span>
      </div>
      <div class="nm-meta-item">
        <i class="ti ti-map-pin" aria-hidden="true"></i>
        <span>${nm.venue}</span>
      </div>
    </div>
    <div class="spacer"></div>
    <button class="btn-cta" onclick="alert('Chức năng đang phát triển!')">Xem chi tiết →</button>
  `;
}

/* ---- STAT CARDS ---- */
function renderStatCards() {
  const s = BITFC_DATA.seasonStats;

  const cards = [
    {
      id: 'stat-played',
      label: 'Trận đã đấu',
      value: s.played,
      valueClass: '',
      sub: `Mùa ${BITFC_DATA.team.season}`,
      badge: null,
      accent: '',
      icon: 'ti-ball-football'
    },
    {
      id: 'stat-points',
      label: 'Điểm số',
      value: s.points,
      valueClass: 'gold',
      sub: null,
      badge: { text: `↑ Hạng ${s.rank}`, cls: 'badge-up' },
      accent: 'accent-gold',
      icon: 'ti-trophy'
    },
    {
      id: 'stat-goals',
      label: 'Bàn thắng ghi',
      value: s.goalsFor,
      valueClass: '',
      sub: null,
      badge: { text: `+4 hơn mùa trước`, cls: 'badge-up' },
      accent: 'accent-green',
      icon: 'ti-target'
    },
    {
      id: 'stat-winrate',
      label: 'Tỷ lệ thắng',
      value: `${s.winRate}%`,
      valueClass: '',
      sub: null,
      badge: null,
      subHTML: `<span class="stat-sub-text" style="color:#22c55e">${s.won}T</span>
                <span class="stat-sub-text">·</span>
                <span class="stat-sub-text">${s.drawn}H</span>
                <span class="stat-sub-text">·</span>
                <span class="stat-sub-text" style="color:var(--red-mid)">${s.lost}B</span>`,
      accent: 'accent-blue',
      icon: 'ti-chart-pie'
    }
  ];

  const container = el('stats-grid');
  if (!container) return;

  container.innerHTML = cards.map(c => `
    <div class="stat-card ${c.accent}">
      <div class="stat-label">${c.label}</div>
      <div class="stat-value ${c.valueClass}">${c.value}</div>
      <div class="stat-sub">
        ${c.badge ? `<span class="badge ${c.badge.cls}">${c.badge.text}</span>` : ''}
        ${c.sub ? `<span class="stat-sub-text">${c.sub}</span>` : ''}
        ${c.subHTML || ''}
      </div>
      <i class="ti ${c.icon} stat-icon" aria-hidden="true"></i>
    </div>
  `).join('');
}

/* ---- BAR CHART ---- */
function renderBarChart() {
  const data   = BITFC_DATA.monthlyGoals;
  const maxVal = Math.max(...data.map(d => Math.max(d.scored, d.conceded)));
  const container = el('bar-chart');
  if (!container) return;

  container.innerHTML = data.map(d => {
    const sPct = Math.round((d.scored   / maxVal) * 100);
    const cPct = Math.round((d.conceded / maxVal) * 100);
    return `
      <div class="bar-col">
        <div class="bar-group">
          <div class="bar scored" style="height:${sPct}%">
            <span class="bar-tip">${d.scored}</span>
          </div>
          <div class="bar conceded" style="height:${cPct}%"></div>
        </div>
        <div class="bar-month">${d.month}</div>
      </div>
    `;
  }).join('');
}

/* ---- RECENT FORM ---- */
function renderForm() {
  const container = el('form-dots');
  if (!container) return;
  container.innerHTML = BITFC_DATA.recentForm.map(r => formDotHTML(r)).join('');
}

/* ---- STAT BARS ---- */
function renderStatBars() {
  const s = BITFC_DATA.teamStats;
  const bars = [
    { label: 'Bàn thắng',  val: s.goalsFor,      max: 60,  display: s.goalsFor,     color: 'var(--red-primary)' },
    { label: 'Bàn thua',   val: s.goalsAgainst,  max: 60,  display: s.goalsAgainst, color: '#60a5fa' },
    { label: 'Cú sút',     val: s.totalShots,    max: 250, display: s.totalShots,   color: 'rgba(251,225,34,0.65)' },
    { label: 'Kiểm soát',  val: s.possession,    max: 100, display: `${s.possession}%`, color: '#22c55e' }
  ];
  const container = el('stat-bars');
  if (!container) return;

  container.innerHTML = bars.map(b => {
    const pct = Math.round((b.val / b.max) * 100);
    return `
      <div class="stat-bar-row">
        <span class="sbar-label">${b.label}</span>
        <div class="sbar-track">
          <div class="sbar-fill" style="width:${pct}%;background:${b.color}"></div>
        </div>
        <span class="sbar-val">${b.display}</span>
      </div>
    `;
  }).join('');
}

/* ---- RECENT MATCHES ---- */
function renderRecentMatches() {
  const container = el('match-list');
  if (!container) return;

  container.innerHTML = BITFC_DATA.recentMatches.map(m => {
    const isHome     = m.home === BITFC_DATA.team.name;
    const vsLabel    = isHome ? `${m.home} vs ${m.away}` : `${m.home} vs ${m.away}`;
    const scoreLabel = `${m.homeScore}–${m.awayScore}`;
    return `
      <div class="match-item">
        <div class="match-teams">
          <div class="match-vs">${vsLabel}</div>
          <div class="match-date">${m.date} · ${m.competition}</div>
        </div>
        <div class="match-score">${scoreLabel}</div>
        ${resultBadgeHTML(m.result)}
      </div>
    `;
  }).join('');
}

/* ---- STANDINGS ---- */
function renderStandings() {
  const container = el('standings-body');
  if (!container) return;

  container.innerHTML = BITFC_DATA.standings.map(s => `
    <tr class="${s.isTeam ? 'is-team' : ''}">
      <td>
        <span class="rank-num ${s.rank <= 2 ? 'top' : ''}">${s.rank}</span>
        <span class="team-name-cell ${s.isTeam ? 'ours' : ''}">${s.name}</span>
      </td>
      <td>${s.won}</td>
      <td>${s.drawn}</td>
      <td>${s.lost}</td>
      <td><span class="pts-cell ${s.isTeam ? 'ours' : ''}">${s.points}</span></td>
    </tr>
  `).join('');
}

/* ---- TOP SCORERS ---- */
function renderTopScorers() {
  const container = el('top-scorers');
  if (!container) return;

  container.innerHTML = BITFC_DATA.topScorers.map((p, i) => `
    <div class="player-item">
      <div class="player-rank">${i + 1}</div>
      <div class="player-avatar" ${avatarStyle(p.color)}>${p.initials}</div>
      <div class="player-info">
        <div class="player-name">${p.name}</div>
        <div class="player-pos">${p.position} · #${p.number}</div>
      </div>
      <div class="player-stat">${p.goals}</div>
    </div>
  `).join('');
}

/* ---- TOP ASSISTS ---- */
function renderTopAssists() {
  const container = el('top-assists');
  if (!container) return;

  container.innerHTML = BITFC_DATA.topAssists.map((p, i) => `
    <div class="player-item">
      <div class="player-rank">${i + 1}</div>
      <div class="player-avatar" ${avatarStyle(p.color)}>${p.initials}</div>
      <div class="player-info">
        <div class="player-name">${p.name}</div>
        <div class="player-pos">${p.position} · #${p.number}</div>
      </div>
      <div class="player-stat">${p.assists}</div>
    </div>
  `).join('');
}

/* ---- MEDIA ---- */
function renderMedia() {
  const container = el('media-list');
  if (!container) return;

  container.innerHTML = BITFC_DATA.media.map(m => {
    const isVideo = m.type === 'video';
    const icon    = isVideo ? 'ti-player-play' : 'ti-news';
    const badgeCls = isVideo ? 'mt-video' : 'mt-article';
    const badgeTxt = isVideo ? 'Video' : 'Báo';
    const meta    = isVideo ? `${m.date} · ${m.duration}` : `${m.date} · ${m.category}`;
    return `
      <div class="media-item">
        <div class="media-thumb">
          <i class="ti ${icon}" aria-hidden="true"></i>
        </div>
        <div class="media-info">
          <div class="media-title">${m.title}</div>
          <div class="media-meta">${meta}</div>
        </div>
        <div class="media-type-badge ${badgeCls}">${badgeTxt}</div>
      </div>
    `;
  }).join('');
}

/* ---- NAV ITEMS ---- */
function initNavItems() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      this.classList.add('active');
    });
  });
}
