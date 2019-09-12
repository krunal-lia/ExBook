import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBFvJDR-rgkTAJeno9kIWkALO-9trAvjqQ",
    authDomain: "exbook-ac4e3.firebaseapp.com",
    databaseURL: "https://exbook-ac4e3.firebaseio.com",
    projectId: "exbook-ac4e3",
    storageBucket: "",
    messagingSenderId: "794575363898",
    appId: "1:794575363898:web:d462d906faa83b036cba03"
};

firebase.initializeApp(config);

export default firebase;
export const auth = firebase.auth();
export const database = firebase.database();
