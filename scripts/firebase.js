const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAcyP9KteGGFP5u9V4zThIW0fptNnyA6k0",
    authDomain: "easygroceries-bc1d7.firebaseapp.com",
    projectId: "easygroceries-bc1d7",
    storageBucket: "easygroceries-bc1d7.appspot.com",
    messagingSenderId: "197259401754",
    appId: "1:197259401754:web:8a21d65972d63dae938fa3",
    measurementId: "G-0BWS2MD539",
    databaseURL: "https://easygroceries-bc1d7-default-rtdb.firebaseio.com/"
});

// const myAppDB = firebaseApp.firestore();
const myAppDB = firebaseApp.database();
const auth = firebaseApp.auth();
const persistence=firebase.auth.Auth.Persistence
