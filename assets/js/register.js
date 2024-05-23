let username = document.getElementById("exampleInputUsername1")
let email = document.getElementById("exampleInputEmail1")
let country = document.getElementById("exampleFormControlSelect2")
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
const signUpButton = document.getElementById('register-btn');

signUpButton.addEventListener("click", () => {
    console.log(email.value)
    signUpUsingCustom(username.value, email.value, password.value)
})


function signUpUsingCustom(username, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            console.log(user)
            createCustomer(username, email).then(response => response.json())
                .then(response => {
                    alert(response.data.message);
                    console.log(response);

                }).catch(error => alert(error));
            // ...
            // Add a new document in collection "cities"
            window.location = "http://127.0.0.1:5500"

        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(errorMessage)
            // ..
        });
}

function createCustomer(username, email) {
    var options = {
        cust_name: username,
        cust_email: email,
        cust_country: country.value,
        cust_password: password.value
    }
    db.collection("users").doc(email).set(options)
    .then(() => {
        localStorage['user'] = options
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

function loginFirebase(email, password) {
    console.log(email)
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user)
            getUserByEmail(email).then(response => response.json())
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error)
        });
}