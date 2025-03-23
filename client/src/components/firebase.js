import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  PhoneAuthProvider, 

  signInWithCredential,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDlYtIYnygqxyGkWV0jbjmV24VV9RWDXYw",
    authDomain: "jewellery-project01.firebaseapp.com",
    projectId: "jewellery-project01",
    storageBucket: "jewellery-project01.firebasestorage.app",
    messagingSenderId: "934716996941",
    appId: "1:934716996941:web:a05aa7e532d17a16dccb04",
    measurementId: "G-L2HYN15XLF"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Google Login
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Info:", result.user);
    return result.user;
  } catch (error) {
    console.error("Login Failed:", error);
    return null;
  }
};

// Google Logout
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Logout Failed:", error);
  }
};

// Setup Recaptcha for SMS MFA
export const setupRecaptcha = (containerId) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
  });
};

// Send OTP for MFA
export const sendOtp = async (phoneNumber, recaptchaVerifier) => {
  try {
    const provider = new PhoneAuthProvider(auth);
    const verificationId = await provider.verifyPhoneNumber(phoneNumber, recaptchaVerifier);
    return verificationId;
  } catch (error) {
    console.error("OTP Sending Failed:", error);
    return null;
  }
};

// Verify OTP for MFA
export const verifyOtp = async (verificationId, otp) => {
  try {
    const credential = PhoneAuthProvider.credential(verificationId, otp);
    await signInWithCredential(auth, credential);
    console.log("Phone Authentication Successful");
  } catch (error) {
    console.error("OTP Verification Failed:", error);
  }
};

export { auth };