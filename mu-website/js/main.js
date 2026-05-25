/* ============================================================
   CHELSEA FC - GLOBAL JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- PRELOADER ----
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => preloader.classList.add('hidden'), 1800);
    });
    // fallback
    setTimeout(() => preloader.classList.add('hidden'), 3000);
  }

  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- MOBILE NAV ----
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- ACTIVE NAV LINK ----
  const currentPath = window.location.pathname.replace(/\/+$/, '');
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const linkPath = link.getAttribute('href')?.replace(/\/+$/, '');
    if (linkPath && currentPath.endsWith(linkPath) && linkPath !== '') {
      link.classList.add('active');
    } else if ((currentPath.endsWith('index') || currentPath === '' || currentPath.endsWith('/')) && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });

  // ---- SCROLL FADE-IN ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // ---- HERO PARTICLES ----
  const particles = document.querySelector('.hero-particles');
  if (particles) {
    for (let i = 0; i < 25; i++) {
      const span = document.createElement('span');
      span.style.cssText = `
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-duration: ${5 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 6}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
        opacity: ${0.2 + Math.random() * 0.6};
      `;
      particles.appendChild(span);
    }
  }

});
