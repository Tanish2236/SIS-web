<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBiDE3alBUAP3rot3RZ0esTw-55a5kMtMA",
    authDomain: "sis1-6b0d7.firebaseapp.com",
    projectId: "sis1-6b0d7",
    storageBucket: "sis1-6b0d7.appspot.com",
    messagingSenderId: "529878937468",
    appId: "1:529878937468:web:adeabd8d378793e9107ef9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const submit = document.getElementById('submit');
  submit.addEventListener("click", function(event){
    event.preventDefault()
    alert(5)
  })
</script>