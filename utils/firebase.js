import firebase  from 'firebase/app'
//'../node_modules/@firebase/app' 
import 'firebase/firestore'
//'../node_modules/@firebase/firestore'

  const firebaseConfig = {
    apiKey: "AIzaSyAAAPmHWfEgLku7IOAFDek3oMwNXhedtBM",
    authDomain: "restaurants-eaf7c.firebaseapp.com",
    projectId: "restaurants-eaf7c",
    storageBucket: "restaurants-eaf7c.appspot.com",
    messagingSenderId: "1011003065775",
    appId: "1:1011003065775:web:6214674047c701e9a89b5a"
  }

export const firebaseApp = firebase.initializeApp(firebaseConfig);
