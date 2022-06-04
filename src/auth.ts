import { initializeApp } from "firebase/app";

// https://firebase.google.com/docs/web/setup
const firebaseConfig = {
  apiKey: "AIzaSyCF5qkzsY95L3b-8W-hVsAVo1-j68BTygU",
  authDomain: "tv-shows-calendar.firebaseapp.com",
  projectId: "tv-shows-calendar",
  storageBucket: "tv-shows-calendar.appspot.com",
  messagingSenderId: "130288006280",
  appId: "1:130288006280:web:a0c1cae89cdc17c7149b3d",
};

export const firebaseApp = initializeApp(firebaseConfig);
