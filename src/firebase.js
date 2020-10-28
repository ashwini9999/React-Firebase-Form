import firebase from "firebase";

var firebaseApp = firebase.initializeApp({
  // firebase credentials
  
});

var db = firebaseApp.firestore();

export { db };
