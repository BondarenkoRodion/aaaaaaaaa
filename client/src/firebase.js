import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCIzjcFSjM0QNYs7yFQw69-8bZg2qbhEZ0',
  authDomain: 'video-72b36.firebaseapp.com',
  projectId: 'video-72b36',
  storageBucket: 'video-72b36.appspot.com',
  messagingSenderId: '1026017736703',
  appId: '1:1026017736703:web:3099abf4d56a337a3899ca',
}

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
