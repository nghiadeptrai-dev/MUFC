/**
 * auth-guard.js
 * Bảo vệ các trang trong Management — chỉ cho phép user đã đăng nhập.
 *
 * Cách dùng: thêm vào ĐẦU mỗi trang protected (dashboard, news-panel, players-panel, ...)
 *
 *   <script type="module" src="../../js/Management/auth-guard.js"></script>
 *
 * Guard sẽ:
 *   1. Ẩn toàn bộ nội dung trang ngay lập tức (tránh flash)
 *   2. Đợi Firebase xác nhận trạng thái auth
 *   3. Nếu CHƯA đăng nhập  → redirect về Login
 *   4. Nếu ĐÃ đăng nhập    → hiện trang + gắn user vào window.__currentUser
 */

import { onAuthChange, logout } from "../../controllers/AuthenticationController.js";

const LOGIN_URL = "../../Login.html"; // ← đổi nếu path khác

// 1. Ẩn trang ngay lập tức — tránh flash nội dung cho user chưa auth
document.documentElement.style.visibility = "hidden";

// 2. Lắng nghe trạng thái auth (Firebase trả về trong ~200–400ms)
const unsubscribe = onAuthChange((user) => {
  unsubscribe(); // chỉ cần check 1 lần lúc load

  if (!user) {
    // Chưa đăng nhập → redirect về Login, kèm returnUrl để sau login quay lại
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.replace(`${LOGIN_URL}?returnUrl=${returnUrl}`);
    return;
  }

  // Đã đăng nhập → hiện trang
  document.documentElement.style.visibility = "";

  // Expose user ra global để các script khác trong trang dùng nếu cần
  window.__currentUser = user;

  // Cập nhật tên user và thêm nút Logout vào sidebar
  const updateUI = () => {
    // Cập nhật tên user trên topbar
    const greetEl = document.querySelector('.greet');
    if (greetEl) {
      const userName = user.displayName || user.email.split('@')[0];
      greetEl.innerHTML = `Xin chào, <strong style="color: var(--white);">${userName}</strong>`;
    }

    // Thêm nút Đăng xuất vào cuối danh sách nav-item (trước sidebar-bottom)
    const sidebarBottom = document.querySelector('.sidebar-bottom');
    if (sidebarBottom && !document.getElementById('sidebar-logout-btn')) {
      sidebarBottom.insertAdjacentHTML('beforebegin', `<a href="#" class="nav-item" id="sidebar-logout-btn" style="color: var(--red-mid);"><i class="ti ti-logout"></i>Đăng xuất</a>`);
      
      // Inject modal đăng xuất
      document.body.insertAdjacentHTML('beforeend', `
        <div class="modal-overlay" id="logout-modal">
          <div class="delete-card">
            <div class="delete-body">
              <div class="delete-icon-wrap"><i class="ti ti-logout"></i></div>
              <div class="delete-title">Xác nhận đăng xuất</div>
              <div class="delete-msg">
                Bạn có chắc chắn muốn đăng xuất khỏi hệ thống quản trị không?
              </div>
            </div>
            <div class="delete-footer">
              <button class="btn-cancel" id="logout-cancel-btn">Hủy</button>
              <button class="btn-del-confirm" id="logout-confirm-btn">Có, Đăng xuất</button>
            </div>
          </div>
        </div>
      `);

      const logoutModal = document.getElementById('logout-modal');
      
      document.getElementById('sidebar-logout-btn').addEventListener('click', (e) => {
        e.preventDefault();
        logoutModal.classList.add('open');
      });

      document.getElementById('logout-cancel-btn').addEventListener('click', () => {
        logoutModal.classList.remove('open');
      });

      document.getElementById('logout-confirm-btn').addEventListener('click', async () => {
        await logout();
        window.location.replace('/index.html');
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateUI);
  } else {
    updateUI();
  }

  // Dispatch event để các module khác biết auth đã sẵn sàng
  window.dispatchEvent(new CustomEvent("authReady", { detail: { user } }));
});
