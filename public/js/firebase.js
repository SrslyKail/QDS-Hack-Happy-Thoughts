// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCoMBLDPUOGbxNXzaUJc1f43r17ZrTnmYU",   // have to put this into an env later 
    authDomain: "hack-happy-thoughts.firebaseapp.com",
    projectId: "hack-happy-thoughts",
    storageBucket: "hack-happy-thoughts.appspot.com",
    messagingSenderId: "982663522534",
    appId: "1:982663522534:web:2e0cbe6d9152cd97197327",
    measurementId: "G-26V8G87PPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);