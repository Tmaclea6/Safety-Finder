import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAP9oLzSa4xGUf23KN9ztYV22E1i21qzHg",
    authDomain: "safety-finder.firebaseapp.com",
    projectId: "safety-finder",
    storageBucket: "safety-finder.appspot.com",
    messagingSenderId: "933321313540",
    appId: "1:933321313540:web:8ac8c220ccf5772e455451",
    measurementId: "G-Q0WRNHYG68"
  };

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  export {db}