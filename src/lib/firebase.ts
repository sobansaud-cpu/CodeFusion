import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCX94C55vOE13zBmx6gN545H7gfwEGVRfc",
  authDomain: "codefusion-49c5b.firebaseapp.com",
  projectId: "codefusion-49c5b",
  storageBucket: "codefusion-49c5b.firebasestorage.app",
  messagingSenderId: "537454391445",
  appId: "1:537454391445:web:8d36fdbcc808599d62ab9c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
  experimentalForceLongPolling: true,
});

export { auth, db };