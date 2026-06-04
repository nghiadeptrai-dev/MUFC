/* ── DỮ LIỆU — key phải khớp slugify(home)+'-vs-'+slugify(away) ── */
    const matchesData = {
      'bit-fc-vs-fc-kinh-te': {
        date: '01/06/2026', type: 'GIAO HỮU', stadium: 'Sân ABC',
        status: 'win', statusText: 'Thắng',
        teamHome: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        teamAway: { name: 'FC Kinh Tế', logo: '' },
        score: '3 - 1',
        homeEvents: [
          { time: "14'", player: 'Trần Mạnh Hiếu' },
          { time: "42'", player: 'Nguyễn Tiến Thành' },
          { time: "78'", player: 'Nguyễn Hà Tuấn Nghĩa' },
        ],
        awayEvents: [
          { time: "60'", player: 'Cầu thủ đối phương' },
        ],
      },
      'ngoai-thuong-vs-bit-fc': {
        date: '25/05/2026', type: 'GIAO HỮU', stadium: 'Sân NTU',
        status: 'draw', statusText: 'Hòa',
        teamHome: { name: 'Ngoại Thương', logo: '' },
        teamAway: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        score: '1 - 1',
        homeEvents: [{ time: "30'", player: 'Tiền đạo Ngoại Thương' }],
        awayEvents: [{ time: "85'", player: 'Trần Mạnh Hiếu' }],
      },
      'bit-fc-vs-bach-khoa-fc': {
        date: '18/05/2026', type: 'GIAO HỮU', stadium: 'Sân ABC',
        status: 'win', statusText: 'Thắng',
        teamHome: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        teamAway: { name: 'Bách Khoa FC', logo: '' },
        score: '2 - 0',
        homeEvents: [
          { time: "23'", player: 'Nguyễn Đức Anh' },
          { time: "67'", player: 'Trần Minh Khoa' },
        ],
        awayEvents: [],
      },
      'luat-fc-vs-bit-fc': {
        date: '10/05/2026', type: 'GIAO HỮU', stadium: 'Sân HLU',
        status: 'lose', statusText: 'Thua',
        teamHome: { name: 'Luật FC', logo: '' },
        teamAway: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        score: '2 - 0',
        homeEvents: [
          { time: "15'", player: 'Hoàng Văn Sơn' },
          { time: "54'", player: 'Tiền đạo Luật FC' },
        ],
        awayEvents: [],
      },
      'bit-fc-vs-thuong-mai-fc': {
        date: '04/05/2026', type: 'GIAO HỮU', stadium: 'Sân ABC',
        status: 'win', statusText: 'Thắng',
        teamHome: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        teamAway: { name: 'Thương Mại FC', logo: '' },
        score: '4 - 2',
        homeEvents: [
          { time: "8'", player: 'Nguyễn Đức Anh' },
          { time: "29'", player: 'Trần Minh Khoa' },
          { time: "55'", player: 'Nguyễn Đức Anh' },
          { time: "80'", player: 'Nguyễn Tiến Thành' },
        ],
        awayEvents: [
          { time: "43'", player: 'Tiền đạo Thương Mại' },
          { time: "72'", player: 'Tiền đạo Thương Mại' },
        ],
      },
      'su-pham-fc-vs-bit-fc': {
        date: '27/04/2026', type: 'GIAO HỮU', stadium: 'Sân ĐHSP',
        status: 'win', statusText: 'Thắng',
        teamHome: { name: 'Sư Phạm FC', logo: '' },
        teamAway: { name: 'BIT FC', logo: '../assessts/logoBit.png' },
        score: '1 - 2',
        homeEvents: [{ time: "38'", player: 'Đỗ Công Minh' }],
        awayEvents: [
          { time: "22'", player: 'Trần Mạnh Hiếu' },
          { time: "89'", player: 'Nguyễn Đức Anh' },
        ],
      },
    };

    /* ── RENDER ── */
    function renderMatch(match) {
      const statusClass = { win: 'status-win', draw: 'status-draw', lose: 'status-lose' }[match.status] || 'status-draw';

      const eventsHtml = (events, alignRight) =>
        events.length === 0
          ? `<div style="color:#555;font-size:.85rem;padding:.5rem 0;${alignRight ? 'text-align:right' : ''}">—</div>`
          : events.map(e => alignRight
            ? `<div class="event-item" style="justify-content:flex-end"><span>${e.player}</span><span class="event-time">${e.time}</span></div>`
            : `<div class="event-item"><span class="event-time">${e.time}</span><span>${e.player}</span></div>`
          ).join('');

      const logoHtml = (logo, name) => logo
        ? `<img src="${logo}" alt="${name}" />`
        : `<svg width="90" height="90" viewBox="0 0 90 90">
             <circle cx="45" cy="45" r="43" fill="#1a0000" stroke="rgba(218,41,28,.4)" stroke-width="2"/>
             <text x="45" y="53" font-family="Oswald,sans-serif" font-size="16" font-weight="700"
               fill="rgba(255,255,255,.75)" text-anchor="middle">${name.split(' ').slice(-1)[0].slice(0, 4).toUpperCase()}</text>
           </svg>`;

      document.getElementById('match-detail-container').innerHTML = `
        <div class="match-meta-info">
          <span class="match-status-badge ${statusClass}">${match.statusText}</span>
          <div style="color:#ff2a3b;font-weight:600;letter-spacing:.1em;font-size:.9rem;margin-bottom:.4rem;">
            ${match.date} — ${match.type}
          </div>
          <div style="color:#888;font-size:.9rem;">${match.stadium}</div>
        </div>

        <div class="scoreboard-wrapper">
          <div class="team-display">
            ${logoHtml(match.teamHome.logo, match.teamHome.name)}
            <div class="team-name">${match.teamHome.name}</div>
          </div>
          <div class="score-display">${match.score}</div>
          <div class="team-display">
            ${logoHtml(match.teamAway.logo, match.teamAway.name)}
            <div class="team-name">${match.teamAway.name}</div>
          </div>
        </div>

        <div class="match-details-grid">
          <div class="events-box" style="text-align:right">
            <h3>Bàn thắng ${match.teamHome.name}</h3>
            ${eventsHtml(match.homeEvents, true)}
          </div>
          <div class="events-box">
            <h3>Bàn thắng ${match.teamAway.name}</h3>
            ${eventsHtml(match.awayEvents, false)}
          </div>
        </div>
      `;
    }

    /* ── INIT: đọc ?match= từ URL ── */
    document.addEventListener('DOMContentLoaded', function () {
      const matchKey = new URLSearchParams(window.location.search).get('match');
      const match = matchKey && matchesData[matchKey];

      if (!match) {
        document.getElementById('match-detail-container').innerHTML = `
          <div style="text-align:center;padding:3rem 0">
            <h2 style="color:#fff;margin-bottom:1rem">Không tìm thấy dữ liệu trận đấu</h2>
            <p style="color:#555;margin-bottom:1.5rem;font-size:.85rem">key: <code style="color:#ff2a3b">${matchKey || '(trống)'}</code></p>
            <a href="../index.html" class="back-link">← Quay lại Trang Chủ</a>
          </div>
        `;
        return;
      }

      renderMatch(match);
    });