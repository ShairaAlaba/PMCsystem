import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBzhbx-v1Y68aW37V3dX9fgvxJpHfYG0Ek",
  authDomain: "pmcsystem-914f5.firebaseapp.com",
  databaseURL: "https://pmcsystem-914f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pmcsystem-914f5",
  storageBucket: "pmcsystem-914f5.firebasestorage.app",
  messagingSenderId: "133519268850",
  appId: "1:133519268850:web:421bb068b391f86089e96b"
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)