import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB2pEvILrEWiJYXHmbljKLd5GQ9iiNljEs",
  authDomain: "fir-storagetransaction.firebaseapp.com",
  projectId: "fir-storagetransaction",
  storageBucket: "fir-storagetransaction.appspot.com",
  messagingSenderId: "414359172066",
  appId: "1:414359172066:web:178051b9c6500316f23fbb",
  measurementId: "G-BRX9M3WLMJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };