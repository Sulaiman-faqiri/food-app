// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: 'gs://pizza-49082.appspot.com',
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
}

// Initialize Firebase

export const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)
