import {initializeApp} from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "my-blog-4cd93.firebaseapp.com",
    projectId: "my-blog-4cd93",
    storageBucket: "my-blog-4cd93.appspot.com",
    messagingSenderId: "420877309814",
    appId: "1:420877309814:web:813c7888ca62ce85e5cc57",
    measurementId: "G-94908MXC0B"
};

export const app = initializeApp(firebaseConfig);
