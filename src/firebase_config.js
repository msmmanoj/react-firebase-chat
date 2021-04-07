import firebase from 'firebase/app';

const config = {
    apiKey: "AIzaSyDgFG6npILcyixEjb-MUjuf5tBrw2dUTzg",
    authDomain: "react-firebase-chat-a7221.firebaseapp.com",
    projectId: "react-firebase-chat-a7221",
    storageBucket: "react-firebase-chat-a7221.appspot.com",
    messagingSenderId: "356316568421",
    appId: "1:356316568421:web:d41e35bf3ff96b8cdcdf8c",
    measurementId: "G-M860FG15VC"
}

!firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default firebase