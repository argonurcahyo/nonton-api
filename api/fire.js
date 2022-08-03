var firebase = require('firebase-admin')

const firebaseConfig = {
    apiKey: "AIzaSyAHBd6SNWNBOmAUvVnyys2yZYSdgrA5i10",
    authDomain: "nonton-apa-ya.firebaseapp.com",
    projectId: "nonton-apa-ya",
    storageBucket: "nonton-apa-ya.appspot.com",
    messagingSenderId: "712758983517",
    appId: "1:712758983517:web:3e772672c1a96482ad86b4",
    measurementId: "G-ZY4T4TEKQ9"
};

const serviceAccount = require('../key.json')

// Initialize Firebase
const fire = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount)
});

module.exports = fire