// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCwPaQVRLGO2Yai00nEmM0UYlRZJcLR_5w",
    authDomain: "giftease-2d5a4.firebaseapp.com",
    projectId: "giftease-2d5a4",
    storageBucket: "giftease-2d5a4.appspot.com",
    messagingSenderId: "189639674803",
    appId: "1:189639674803:web:8a9aa82b8a9aeba4cb99c6",
    measurementId: "G-MPJBTS4LVS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);