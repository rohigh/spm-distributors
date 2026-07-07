// Firebase SDKs
const firebaseConfig = {
  apiKey: "AIzaSyAv7kZHkXOsWPEtLFOs_wyY5VN4OpFvTHY",
  authDomain: "spm-distributors.firebaseapp.com",
  projectId: "spm-distributors",
  storageBucket: "spm-distributors.firebasestorage.app",
  messagingSenderId: "1009423822494",
  appId: "1:1009423822494:web:c306b76937e0698b3c558f",
  measurementId: "G-MZTX4PHE1M"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();
