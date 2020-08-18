import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyDKTXMHa-_dt5P3qTQXZSiyasQDhVPdTKI",
    authDomain: "functions-8dde1.firebaseapp.com",
    databaseURL: "https://functions-8dde1.firebaseio.com",
    projectId: "functions-8dde1",
    storageBucket: "functions-8dde1.appspot.com",
    messagingSenderId: "387838493117",
    appId: "1:387838493117:web:905b7a3bcc639388c912d4"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const functions = firebase.functions();

export { db, auth, firebase, functions };
