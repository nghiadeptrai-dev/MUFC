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

  const playersData = [
    {
      number: '8',
      name: 'Bruno Fernandes',
      pos: 'Tiền Vệ Công',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559977_102167101.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Bruno Fernandes'
    },
    {
      number: '30',
      name: 'Benjamin Šeško',
      pos: 'Tiền Đạo',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896326/media_102559907_102167031.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Benjamin Šeško'
    },
    {
      number: '11',
      name: 'Joshua Zirkzee',
      pos: 'Tiền Đạo / Cánh',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896326/media_102559902_102167028.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Joshua Zirkzee'
    },
    {
      number: '37',
      name: 'Kobbie Mainoo',
      pos: 'Tiền Vệ Trung Tâm',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559979_102167103.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Kobbie Mainoo'
    },
    {
      number: '7',
      name: 'Mason Mount',
      pos: 'Tiền Vệ Trung Tâm',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896330/media_102559976_102167100.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Mason Mount'
    },
    {
      number: '5',
      name: 'Harry Maguire',
      pos: 'Hậu Vệ Trung Tâm',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559861_102166984.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Harry Maguire'
    },
    {
      number: '24',
      name: 'Senne Lammens',
      pos: 'Thủ Môn',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896327/media_102559948_102167072.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Senne Lammens'
    },
    {
      number: '15',
      name: 'Leny Yoro',
      pos: 'Hậu Vệ Trung Tâm',
      img: 'https://dynamic-crop-cdn.scoreplay.io/472/4896325/media_102559869_102166993_compressed.jpg?fmt=webp&f=center&w=600&h=818',
      alt: 'Leny Yoro'
    }
  ];

  const track = document.querySelector('.players-track');
  const frontCard = document.querySelector('.player-card-large');
  const prevPlayer = document.querySelector('.slider-btn-prev');
  const nextPlayer = document.querySelector('.slider-btn-next');

  let activeIndex = 0;
  let currentSlide = playersData.length;
  const totalCopies = 3;
  const playersLength = playersData.length;

  const createCard = (player) => {
    const card = document.createElement('article');
    card.className = 'player-card';
    card.innerHTML = `
      <img src="${player.img}" alt="${player.alt}" loading="lazy"
        onerror="this.src='https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg';this.style.padding='30px';this.style.background='#4A0000'" />
      <div class="player-card-info">
        <div class="player-number">${player.number}</div>
        <div class="player-name">${player.name}</div>
        <div class="player-pos">${player.pos}</div>
      </div>
    `;
    return card;
  };

  const renderTrack = () => {
    if (!track) return;
    track.innerHTML = '';
    for (let copy = 0; copy < totalCopies; copy += 1) {
      playersData.forEach((player) => {
        track.appendChild(createCard(player));
      });
    }
  };

  const renderFrontCard = (index) => {
    if (!frontCard || !playersData[index]) return;
    const player = playersData[index];
    frontCard.innerHTML = `
      <img src="${player.img}" alt="${player.alt}" loading="lazy"
        onerror="this.src='https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg';this.style.padding='30px';this.style.background='#4A0000'" />
      <div class="player-card-info">
        <div class="player-number">${player.number}</div>
        <div class="player-name">${player.name}</div>
        <div class="player-pos">${player.pos}</div>
      </div>
    `;
  };

  const updateTrack = (instant = false) => {
    if (!track) return;
    const card = track.querySelector('.player-card');
    const trackWrapper = track.parentElement;
    if (!card || !trackWrapper) return;

    const gapValue = parseFloat(getComputedStyle(track).gap) || 24;
    const itemWidth = card.offsetWidth;
    const step = itemWidth + gapValue;
    const containerWidth = trackWrapper.clientWidth;
    const offset = (containerWidth - itemWidth) / 2;
    const positionX = -currentSlide * step + offset;

    if (instant) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.45s ease';
    }

    track.style.transform = `translateX(${positionX}px)`;

    if (instant) {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.45s ease';
      });
    }
  };

  const normalizeSlide = () => {
    if (!track) return;
    if (currentSlide >= playersLength * 2) {
      currentSlide -= playersLength;
      updateTrack(true);
    }

    if (currentSlide < playersLength) {
      currentSlide += playersLength;
      updateTrack(true);
    }
  };

  const moveSlide = (direction) => {
    activeIndex = (activeIndex + direction + playersLength) % playersLength;
    currentSlide += direction;
    renderFrontCard(activeIndex);
    updateTrack(false);
  };

  if (track && frontCard) {
    renderTrack();
    renderFrontCard(activeIndex);
    updateTrack(true);

    track.addEventListener('transitionend', normalizeSlide);
  }

  if (prevPlayer) {
    prevPlayer.addEventListener('click', () => moveSlide(-1));
  }

  if (nextPlayer) {
    nextPlayer.addEventListener('click', () => moveSlide(1));
  }

  let autoplayTimer = null;
  const sliderRoot = document.querySelector('.players-slider');

  const startAutoplay = () => {
    if (autoplayTimer) return;
    autoplayTimer = window.setInterval(() => moveSlide(1), 4500);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  if (sliderRoot) {
    sliderRoot.addEventListener('mouseenter', stopAutoplay);
    sliderRoot.addEventListener('mouseleave', startAutoplay);
    sliderRoot.addEventListener('touchstart', stopAutoplay, { passive: true });
    sliderRoot.addEventListener('touchend', startAutoplay);
  }

  startAutoplay();

});
