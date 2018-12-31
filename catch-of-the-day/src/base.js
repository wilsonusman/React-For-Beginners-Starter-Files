import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA-OI8BX-8cgakXUxiyg49mNp_svTxsTaM",
  authDomain: "catch-of-the-day-wilson-usman.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-wilson-usman.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

// this is a named export
export { firebaseApp };

// this is a default export
export default base;