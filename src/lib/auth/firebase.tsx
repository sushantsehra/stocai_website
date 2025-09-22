import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDpnXYdTvJKF8nO9hrzzXXPQE0Y3FieM9k",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "stocai.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "stocai",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "stocai.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "132540449116",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:132540449116:web:434f1140250edc8c8cc199",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-G22TJCKW0B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Analytics only on client side
let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, auth, analytics, googleProvider };

// import { initializeApp } from "firebase/app";
// import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDpnXYdTvJKF8nO9hrzzXXPQE0Y3FieM9k",
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "stocai.firebaseapp.com",
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "stocai",
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "stocai.firebasestorage.app",
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "132540449116",
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:132540449116:web:434f1140250edc8c8cc199",
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-G22TJCKW0B"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);

// // Configure Google Auth Provider
// const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({
//   prompt: 'select_account'
// });

// // Initialize Analytics only on client side
// let analytics: any = null;
// if (typeof window !== 'undefined') {
//   analytics = getAnalytics(app);
// }

// export { app, auth, analytics, googleProvider };