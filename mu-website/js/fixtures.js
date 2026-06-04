/* ============================================================
   Chức năng: Tab Upcoming/Results + Bộ lọc giải đấu
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. TAB: Sắp Diễn Ra / Kết Quả
  ---------------------------------------------------------- */
  const tabs     = document.querySelectorAll('.fixtures-tab');
  const sections = document.querySelectorAll('.fixtures-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Hiện/ẩn section tương ứng
      const target = tab.dataset.tab; // 'upcoming' hoặc 'results'
      sections.forEach(sec => {
        if (sec.id === `tab-${target}`) {
          sec.classList.remove('hidden');
        } else {
          sec.classList.add('hidden');
        }
      });

      // Reset bộ lọc về "Tất Cả" khi chuyển tab
      filterBtns.forEach(b => b.classList.remove('active'));
      document.querySelector('.filter-btn[data-league="all"]').classList.add('active');
      applyLeagueFilter('all');
    });
  });

  /* ----------------------------------------------------------
     2. BỘ LỌC GIẢI ĐẤU
  ---------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.fixtures-filters .filter-btn');

  function applyLeagueFilter(league) {
    // Chỉ lọc trong section đang hiện
    const activeSection = document.querySelector('.fixtures-section:not(.hidden)');
    if (!activeSection) return;

    const cards = activeSection.querySelectorAll('.fixture-card');
    cards.forEach(card => {
      if (league === 'all' || card.dataset.league === league) {
        card.style.display = '';
        card.style.animation = 'fadeInUp 0.35s ease both';
        setTimeout(() => { card.style.animation = ''; }, 400);
      } else {
        card.style.display = 'none';
      }
    });

    // Ẩn header tháng nếu không có card nào hiện trong tháng đó
    const monthHeaders = activeSection.querySelectorAll('.fixtures-month-header');
    monthHeaders.forEach(header => {
      let nextEl = header.nextElementSibling;
      let hasVisible = false;
      while (nextEl && !nextEl.classList.contains('fixtures-month-header')) {
        if (nextEl.classList.contains('fixture-card') && nextEl.style.display !== 'none') {
          hasVisible = true;
          break;
        }
        nextEl = nextEl.nextElementSibling;
      }
      header.style.display = hasVisible ? '' : 'none';
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyLeagueFilter(btn.dataset.league);
    });
  });

  /* ----------------------------------------------------------
     3. FADE-IN KHI SCROLL
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    fadeEls.forEach(el => observer.observe(el));
  }

});