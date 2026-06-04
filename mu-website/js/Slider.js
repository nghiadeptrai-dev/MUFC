// Cần đảm bảo object playersDetailData đã được khai báo trước đoạn code này.

document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('player-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  if (!track || typeof playersDetailData === 'undefined') return;

  // Chuyển object dữ liệu thành mảng để dễ xử lý vòng lặp
  const players = Object.values(playersDetailData);
  let currentIndex = Math.floor(players.length / 2); // Bắt đầu ở giữa mảng

  // 1. Khởi tạo HTML cho các thẻ cầu thủ
  track.innerHTML = players.map((player, index) => `
    <div class="player-3d-card" data-index="${index}">
      <div class="glass-card">
        <div class="glass-card-bg"></div>
        <div class="player-3d-number">
          <div class="player-3d-number-inner">
            <span>${player.number}</span>
          </div>
        </div>
        <div class="player-3d-img-wrap">
          <img src="${player.img}" alt="${player.alt}">
        </div>
        <div class="player-3d-info">
          <div class="player-3d-info-inner">
            <h3>${player.name}</h3>
            <div class="player-3d-pos">
              <div class="line"></div>
              <p>${player.pos}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  const cards = document.querySelectorAll('.player-3d-card');

  // 2. Hàm cập nhật hiệu ứng 3D Coverflow
  const updateSlider = () => {
    cards.forEach((card, index) => {
      const offset = index - currentIndex;
      const absOffset = Math.abs(offset);
      
      let translateX = 0;
      let translateZ = 0;
      let rotateY = 0;
      let scale = 1;
      let zIndex = 10 - absOffset;
      let blur = 0;
      let opacity = 1;

      if (offset === 0) {
        // Thẻ đang active (Chính giữa)
        translateX = 0;
        translateZ = 0;
        rotateY = 0;
        scale = 1;
        blur = 0;
        opacity = 1;
        card.classList.add('is-active');
      } else {
        // Các thẻ xung quanh
        card.classList.remove('is-active');
        const direction = offset > 0 ? 1 : -1;
        
        // Thông số cấu hình giống hệt code F12 của Chelsea
        if (absOffset === 1) {
          translateX = 300 * direction;
          translateZ = -100;
          rotateY = -25 * direction;
          scale = 0.85;
          blur = 3;
        } else if (absOffset === 2) {
          translateX = 600 * direction;
          translateZ = -200;
          rotateY = -50 * direction;
          scale = 0.7;
          blur = 3;
        } else if (absOffset === 3) {
          translateX = 900 * direction;
          translateZ = -300;
          rotateY = -75 * direction;
          scale = 0.55;
          blur = 3;
          opacity = 0; // Ẩn dần ở vị trí số 3
        } else {
          // Các thẻ nằm ngoài khung hình
          translateX = 1200 * direction;
          translateZ = -400;
          scale = 0;
          opacity = 0;
        }
      }

      // Áp dụng CSS
      card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
      card.style.zIndex = zIndex;
      card.style.filter = `brightness(${offset === 0 ? 1 : 0.5}) blur(${blur}px)`;
      card.style.opacity = opacity;
    });
  };

  // 3. Xử lý sự kiện Click
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentIndex < players.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });
  }

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      if (currentIndex !== index) {
        currentIndex = index;
        updateSlider();
      } else {
        // Nếu click vào thẻ đang active, chuyển hướng sang trang chi tiết
        const slug = Object.keys(playersDetailData)[index];
        window.location.href = `pages/player-detail.html?slug=${slug}`;
      }
    });
  });

  // Gọi hàm chạy lần đầu
  updateSlider();
});