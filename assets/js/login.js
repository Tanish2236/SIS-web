let email = document.getElementById("exampleInputEmail1")
let password = document.getElementById("exampleInputPassword1")

console.log(sessionStorage['id']);
if(localStorage['user'] != null && localStorage['user'] != undefined) {
    window.location = "http://127.0.0.1:5501/index.html"
}

const firebaseConfig = {
    apiKey: "AIzaSyDhOQOd-PFPppup9q0o1D3l5EgQKaeqbLI",
    authDomain: "smartirrigationsystem-8f903.firebaseapp.com",
    databaseURL: "https://smartirrigationsystem-8f903-default-rtdb.firebaseio.com",
    projectId: "smartirrigationsystem-8f903",
    storageBucket: "smartirrigationsystem-8f903.appspot.com",
    messagingSenderId: "283725897276",
    appId: "1:283725897276:web:09520460bb773cdfb82d39",
    measurementId: "G-Z29B72GEX6"
  };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const signUpButton = document.getElementById('auth-btn');

signUpButton.addEventListener("click", () => {
    console.log(email.value)
    loginFirebase(email.value, password.value)
})

function loginFirebase(email, password) {
    console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            var docRef = db.collection("users").doc(email);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    console.log("Document data:", doc.data());
                    localStorage['user'] = doc.data
                    window.location = "http://localhost:5501/index.html"
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}