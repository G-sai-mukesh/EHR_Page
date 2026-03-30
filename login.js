// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your config
const firebaseConfig = {
  apiKey: "AIzaSyAh-IRBgiCI3VmDudrC4FyzvCLejDyfSdY",
  authDomain: "liv-emss.firebaseapp.com",
  projectId: "liv-emss",
  storageBucket: "liv-emss.firebasestorage.app",
  messagingSenderId: "202735332901",
  appId: "1:202735332901:web:9425fb864d22bac428d9cc",
  measurementId: "G-R74PHWQNL0"
};

// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Setup reCAPTCHA
window.recaptchaVerifier = new RecaptchaVerifier(
  'recaptcha-container',
  {
    size: 'normal',
    callback: () => console.log("reCAPTCHA solved")
  },
  auth
);

// Send OTP
window.sendOTP = function () {
  const phoneNumber = document.getElementById('phone').value;

  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      alert("OTP sent!");
    })
    .catch((error) => {
      console.error(error);
      alert("Error sending OTP");
    });
};

// Verify OTP
window.verifyOTP = function () {
  const code = document.getElementById('otp').value;

  confirmationResult.confirm(code)
    .then((result) => {
      const user = result.user;

      alert("Login successful!");

      // Save session
      sessionStorage.setItem("user", JSON.stringify(user));

      // Redirect
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Invalid OTP");
    });
};