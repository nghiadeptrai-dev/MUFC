/* ════════════════════════════════════════════════════════════
   BIT FC DARK MATCH BOARD — JS
   File: js/match_board.js
════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── DATA ── */
  const MB_MATCHES = [
    { date: '01/06/2026', comp: 'Giao Hữu', home: 'BIT FC',       away: 'FC Kinh Tế',    score: '3 - 1', res: 'w', venue: 'Sân ABC',  hl: 'BIT', al: 'KT'  },
    { date: '25/05/2026', comp: 'Giao Hữu', home: 'Ngoại Thương', away: 'BIT FC',        score: '1 - 1', res: 'd', venue: 'Sân NTU',  hl: 'NT',  al: 'BIT' },
    { date: '18/05/2026', comp: 'Giao Hữu', home: 'BIT FC',       away: 'Bách Khoa FC',  score: '2 - 0', res: 'w', venue: 'Sân ABC',  hl: 'BIT', al: 'BK'  },
    { date: '10/05/2026', comp: 'Giao Hữu', home: 'Luật FC',      away: 'BIT FC',        score: '2 - 0', res: 'l', venue: 'Sân HLU',  hl: 'LU',  al: 'BIT' },
    { date: '04/05/2026', comp: 'Giao Hữu', home: 'BIT FC',       away: 'Thương Mại FC', score: '4 - 2', res: 'w', venue: 'Sân ABC',  hl: 'BIT', al: 'TM'  },
    { date: '27/04/2026', comp: 'Giao Hữu', home: 'Sư Phạm FC',   away: 'BIT FC',        score: '1 - 2', res: 'w', venue: 'Sân ĐHSP', hl: 'SP',  al: 'BIT' },
  ];

  const MB_SCORERS = [
    { r: 1, name: 'Nguyễn Đức Anh', team: 'BIT FC',       goals: 11, games: 10, gold: true  },
    { r: 2, name: 'Trần Minh Khoa', team: 'BIT FC',       goals: 8,  games: 10, gold: false },
    { r: 3, name: 'Lê Hải Đăng',    team: 'Bách Khoa FC', goals: 6,  games: 9,  gold: false },
    { r: 4, name: 'Phạm Tuấn Kiệt', team: 'FC Kinh Tế',   goals: 5,  games: 10, gold: false },
    { r: 5, name: 'Vũ Bảo Long',    team: 'Ngoại Thương', goals: 4,  games: 10, gold: false },
    { r: 6, name: 'Đỗ Công Minh',   team: 'Sư Phạm FC',   goals: 3,  games: 8,  gold: false },
    { r: 7, name: 'Hoàng Văn Sơn',  team: 'Luật FC',      goals: 2,  games: 7,  gold: false },
  ];

  const MB_NEXT_MATCH = new Date('2026-06-14T15:30:00+07:00');
  const MB_MAX_GOALS   = MB_SCORERS[0].goals;
  const MB_TOTAL_GOALS = MB_SCORERS.reduce((a, s) => a + s.goals, 0);

  /* ── HELPERS ── */
  const p2  = n  => String(n).padStart(2, '0');
  const $   = id => document.getElementById(id);
  const per = () => window.innerWidth <= 480 ? 1 : 2;

  /* ── COUNTDOWN (flip digit) ── */
  const _prev = { d: null, h: null, m: null, s: null };

  function flipDigit(id, val) {
    const el = $(id); if (!el) return;
    const v  = p2(val);
    const k  = id.replace('mb-', '');
    if (_prev[k] === v) return;
    el.classList.add('mb-flip');
    setTimeout(() => { el.textContent = v; el.classList.remove('mb-flip'); }, 110);
    _prev[k] = v;
  }

  function startCD() {
    function tick() {
      const diff = MB_NEXT_MATCH - Date.now();
      if (diff < 0) {
        ['mb-d', 'mb-h', 'mb-m', 'mb-s'].forEach(id => { const e = $(id); if (e) e.textContent = '00'; });
        return;
      }
      flipDigit('mb-d', Math.floor(diff / 864e5));
      flipDigit('mb-h', Math.floor(diff % 864e5 / 36e5));
      flipDigit('mb-m', Math.floor(diff % 36e5  / 6e4));
      flipDigit('mb-s', Math.floor(diff % 6e4   / 1e3));
    }
    tick(); setInterval(tick, 1000);
  }

  /* ── BUILD STANDINGS ── */
  function buildStd() {
    const b = $('mb-std-body'); if (!b) return;
    b.innerHTML = '';
    MB_SCORERS.forEach((p, i) => {
      const pct  = Math.round((p.goals / MB_TOTAL_GOALS) * 100);
      const barW = Math.round((p.goals / MB_MAX_GOALS) * 100);
      const isG  = p.gold;
      const row  = document.createElement('div');
      row.className     = 'mb-std-row' + (isG ? ' mb-me' : '');
      row.style.animationDelay = (i * .07) + 's';
      row.innerHTML = `
        <span class="mb-rk${i < 3 ? ' mb-hi' : ''}">${p.r}</span>
        <span>
          <div class="mb-club-cell">
            <div class="mb-clogo">${p.name.split(' ').pop().slice(0, 2).toUpperCase()}</div>
            <div>
              <div class="mb-cname${isG ? ' mb-me' : ''}">${p.name}</div>
              <div style="font-size:.6rem;color:#6b3333;letter-spacing:.08em;">${p.team}</div>
            </div>
          </div>
        </span>
        <span>
          <div class="mb-bar-cell">
            <div class="mb-bar-top">
              <span class="mb-bar-goals" style="color:${isG ? '#FBE122' : '#DA291C'}">${p.goals}</span>
              <span class="mb-bar-pct"   style="color:${isG ? 'rgba(251,225,34,.75)' : 'rgba(218,41,28,.7)'}">${pct}%</span>
            </div>
            <div class="mb-bar-wrap">
              <div class="mb-bar-fill${isG ? ' mb-gold' : ''}" data-idx="${i}" style="width:0%"></div>
            </div>
          </div>
        </span>
        <span class="mb-bar-games">${p.games}</span>
      `;
      b.appendChild(row);
      setTimeout(() => {
        const fill = b.querySelector(`[data-idx="${i}"]`);
        if (fill) fill.style.width = barW + '%';
      }, 150 + i * 90);
    });
  }

  /* ── SLIDER ── */
  let c1 = 0, c2 = 0;

  function makeTrack(tid, did, getCur, setCur) {
    const tr = $(tid), dt = $(did); if (!tr || !dt) return;
    tr.innerHTML = ''; dt.innerHTML = '';
    const p     = per();
    const pages = Math.ceil(MB_MATCHES.length / p);
    MB_MATCHES.forEach((m, idx) => {
      const card = document.createElement('div');
      card.className = 'mb-rc';
      card.style.flex = `0 0 calc(${100 / p}% - ${(p - 1) * 12 / p}px)`;
      card.style.animationDelay = (idx * .06) + 's';
      card.innerHTML = `
        <div class="mb-rc-top">${m.date}</div>
        <div class="mb-rc-comp">${m.comp}</div>
        <div class="mb-rc-body">
          <div class="mb-rc-logo">
            <svg viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="#DA291C"/>
              <text x="14" y="18" font-family="Oswald" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">${m.hl}</text>
            </svg>
          </div>
          <div class="mb-rc-tname">${m.home}</div>
          <div class="mb-rc-score">${m.score}</div>
          <div class="mb-rc-tname mb-r">${m.away}</div>
          <div class="mb-rc-logo">
            <svg viewBox="0 0 28 28">
              <circle cx="14" cy="14" r="13" fill="#1a1a2e"/>
              <text x="14" y="18" font-family="Oswald" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">${m.al}</text>
            </svg>
          </div>
        </div>
        <div class="mb-rc-foot">
          <span class="mb-rc-ven">${m.venue}</span>
          <span class="mb-badge ${m.res}">${m.res === 'w' ? 'Thắng' : m.res === 'd' ? 'Hòa' : 'Thua'}</span>
        </div>
      `;
      tr.appendChild(card);
    });
    for (let i = 0; i < pages; i++) {
      const d  = document.createElement('div');
      d.className = 'mb-dot' + (i === 0 ? ' mb-on' : '');
      d.onclick   = (function (pp) { return function () { goTo(tid, did, pp, getCur, setCur); }; })(i);
      dt.appendChild(d);
    }
    goTo(tid, did, 0, getCur, setCur);
  }

  function goTo(tid, did, p, getCur, setCur) {
    const pv    = per();
    const pages = Math.ceil(MB_MATCHES.length / pv);
    p = Math.max(0, Math.min(p, pages - 1));
    setCur(p);
    const cards = document.querySelectorAll('#' + tid + ' .mb-rc');
    if (!cards.length) return;
    const step = (cards[0].offsetWidth + 12) * pv;
    $(tid).style.transform = 'translateX(-' + (p * step) + 'px)';
    document.querySelectorAll('#' + did + ' .mb-dot')
      .forEach((d, i) => d.className = 'mb-dot' + (i === p ? ' mb-on' : ''));
  }

  window.mbSlide1 = function (dir) { goTo('mb-track1', 'mb-dots1', c1 + dir, () => c1, v => c1 = v); };
  window.mbSlide2 = function (dir) { goTo('mb-track2', 'mb-dots2', c2 + dir, () => c2, v => c2 = v); };

  /* ── TAB SWITCH (fade) ── */
  window.mbSw = function (tab) {
    const isM = tab === 'match';
    const pm = $('mb-p-match'), ps = $('mb-p-std');
    const tm = $('mb-t-match'), ts = $('mb-t-std');
    const hide = isM ? ps : pm, show = isM ? pm : ps;

    hide.style.transition = 'opacity .18s'; hide.style.opacity = '0';
    setTimeout(() => {
      hide.style.display = 'none';
      show.style.display = 'block'; show.style.opacity = '0';
      void show.offsetHeight;
      show.style.transition = 'opacity .22s'; show.style.opacity = '1';
      if (!isM) { buildStd(); makeTrack('mb-track2', 'mb-dots2', () => c2, v => c2 = v); }
    }, 160);

    if (tm) tm.className = 'mb-tb mb-left'  + (isM ? '' : ' mb-off');
    if (ts) ts.className = 'mb-tb mb-right' + (isM ? '' : ' mb-act');
  };

  /* ── SWIPE ── */
  function addSwipe(outerSel, slideFn) {
    const el = document.querySelector(outerSel); if (!el) return;
    let sx = 0;
    el.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
    el.addEventListener('touchend',   e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 36) slideFn(dx < 0 ? 1 : -1);
    });
  }

  /* ── SCROLL REVEAL ── */
  function initReveal() {
    const el = $('mbCol'); if (!el) return;
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { el.classList.add('mb-visible'); obs.disconnect(); }
      }, { threshold: .08 });
      obs.observe(el);
    } else {
      el.classList.add('mb-visible');
    }
  }

  /* ── RESIZE ── */
  let mbResizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(mbResizeTimer);
    mbResizeTimer = setTimeout(function () {
      makeTrack('mb-track1', 'mb-dots1', () => c1, v => c1 = v);
      if ($('mb-p-std') && $('mb-p-std').style.display !== 'none') {
        makeTrack('mb-track2', 'mb-dots2', () => c2, v => c2 = v);
      }
    }, 200);
  });

  /* ── INIT ── */
  function init() {
    if (!$('mbCol')) return;
    mbSw('match');
    makeTrack('mb-track1', 'mb-dots1', () => c1, v => c1 = v);
    startCD();
    initReveal();
    addSwipe('#mb-track1', window.mbSlide1);
    addSwipe('#mb-track2', window.mbSlide2);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();