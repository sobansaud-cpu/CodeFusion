import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUUXe9HssGwJGZwG6TlAEoon7QWSg1x5g",
  authDomain: "my-startup-71f49.firebaseapp.com",
  projectId: "my-startup-71f49",
  storageBucket: "my-startup-71f49.appspot.com",
  messagingSenderId: "225212801671",
  appId: "1:225212801671:web:a9ceb17eb42f0c935c8e22",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
  experimentalForceLongPolling: true,
});

export { auth, db };