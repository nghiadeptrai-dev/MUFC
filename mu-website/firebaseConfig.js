import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth }       from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore }  from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";
import { getAnalytics }  from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

// --- XỬ LÝ ĐỌC FILE .ENV VÀ TẠO IMPORT.META.ENV GIẢ LẬP ---
const response = await fetch('./.env');
const text = await response.text();

// Khởi tạo object env trên import.meta
import.meta.env = {}; 

text.split('\n').forEach(line => {
  if (line.trim() === '') return;
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    import.meta.env[key.trim()] = valueParts.join('=').trim();
  }
});
// -----------------------------------------------------------

// Cấu hình Firebase giờ đây có thể dùng trực tiếp import.meta.env
const firebaseConfig = {
  apiKey:            import.meta.env.FIREBASE_API_KEY,
  authDomain:        import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.FIREBASE_APP_ID,
  measurementId:     import.meta.env.FIREBASE_MEASUREMENT_ID,
};

const app       = initializeApp(firebaseConfig);
const auth      = getAuth(app);
const db        = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db, analytics };