import { listenAllGalleryItems } from "../controllers/GalleryController.js";

const galleryContainer = document.getElementById("gallery-masonry-container");
const filterBtns = document.querySelectorAll(".gallery-filter-btn");

// Lightbox DOM
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxVideoContainer = document.getElementById("lightbox-video-container");
const lightboxIframe = document.getElementById("lightbox-iframe");

// Lấy Thumbnail YouTube
function getYouTubeThumbnail(id) {
  if (!id) return '';
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

async function initGallery() {
  listenAllGalleryItems((res) => {
    if (res.error) {
      galleryContainer.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--red-mid);">Lỗi tải dữ liệu. Vui lòng thử lại.</div>`;
      return;
    }
    
    // Thêm class nháy sáng nhẹ để người dùng biết vừa có data mới
    galleryContainer.classList.remove("flash-update");
    void galleryContainer.offsetWidth; // trigger reflow
    galleryContainer.classList.add("flash-update");

    renderGallery(res);
    setupFilters(res);
  });
  
  setupLightbox();
}

function renderGallery(items) {
  if (!items || items.length === 0) {
    galleryContainer.innerHTML = `
      <div id="team-empty-msg" style="grid-column: 1 / -1; text-align: center; min-height: 40vh; padding-top: 100px; color: var(--gray-mid); font-family: var(--font-condensed); font-size: 1.2rem; letter-spacing: 0.15em; text-transform: uppercase;">
        Chưa có dữ liệu
      </div>`;
    return;
  }

  let html = '';
  items.forEach(item => {
    // Dù category là gì (ảnh hay video), ta thống nhất mọi highlight lưu dạng youtube link đều là video
    // Trừ khi có phát triển tính năng tải ảnh riêng sau này. Hiện tại dùng videoId.
    const isVideo = !!item.videoId; 
    const thumbUrl = item.thumbnail || (item.videoId ? getYouTubeThumbnail(item.videoId) : '');
    
    html += `
      <div class="gallery-item fade-in" data-category="${item.category}" data-type="${isVideo ? 'video' : 'photo'}" data-src="${item.videoId || thumbUrl}">
        <img src="${thumbUrl}" alt="${item.title}" loading="lazy" />
        ${isVideo ? '<div class="vid-badge">▶</div>' : ''}
        <div class="gallery-overlay">
          <div class="g-tag">${isVideo ? 'Video' : 'Photo'} ${item.tag ? '· ' + item.tag : ''}</div>
          <div class="g-title">${item.title}</div>
        </div>
      </div>
    `;
  });

  galleryContainer.innerHTML = html;

  // Hiệu ứng Fade In
  setTimeout(() => {
    document.querySelectorAll(".gallery-item.fade-in").forEach((el, i) => {
      setTimeout(() => el.classList.add("visible"), i * 60);
    });
    
    // Gắn event mở lightbox sau khi render xong
    attachItemEvents();
  }, 100);
}

function setupFilters(allItems) {
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      
      const filter = btn.dataset.filter;
      const itemsDOM = document.querySelectorAll(".gallery-item");
      
      itemsDOM.forEach(item => {
        if (filter === "all") {
          item.style.display = "block";
          setTimeout(() => item.classList.add("visible"), 50);
        } else {
          // Lọc theo loại (giả định thẻ filter là: all, video, photo)
          // Hoặc có thể mở rộng lọc theo data-category
          if (item.dataset.type === filter || item.dataset.category.toLowerCase() === filter.toLowerCase()) {
             item.style.display = "block";
             setTimeout(() => item.classList.add("visible"), 50);
          } else {
             item.style.display = "none";
             item.classList.remove("visible");
          }
        }
      });
    });
  });
}

function attachItemEvents() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(item => {
    item.addEventListener('click', () => {
      const type = item.dataset.type;
      const src = item.dataset.src;
      
      if (type === 'video') {
        // Src là videoId
        lightboxImg.style.display = 'none';
        lightboxVideoContainer.style.display = 'block';
        lightboxIframe.src = `https://www.youtube.com/embed/${src}?autoplay=1`;
      } else {
        // Trực tiếp hiện ảnh nếu có
        lightboxVideoContainer.style.display = 'none';
        lightboxIframe.src = "";
        lightboxImg.src = src;
        lightboxImg.style.display = 'block';
      }
      
      lightbox.classList.add('show');
      document.body.style.overflow = 'hidden'; // Ngăn cuộn trang
    });
  });
}

function setupLightbox() {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  lightbox.classList.remove('show');
  document.body.style.overflow = 'auto';
  // Dừng video khi đóng lightbox
  setTimeout(() => {
    lightboxIframe.src = "";
    lightboxImg.src = "";
  }, 300);
}

document.addEventListener("DOMContentLoaded", initGallery);
