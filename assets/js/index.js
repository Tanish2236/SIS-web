if(localStorage['user'] == null || localStorage['user'] == undefined) {
    window.location = "/pages/samples/login.html"
}

// Import the Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, onValue, orderByKey, limitToFirst, query      } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";


// Initialize Firebase
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

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app)

// Reference to the root of your data
const rootRef =  query(ref(database, 'sensorData/'), orderByKey(), limitToFirst(1));;
onValue(rootRef, (snapshot) => {
  // Snapshot contains all data at the root level
  const data = snapshot.val();

  // Iterate through each child node (1715237314155, 1715237415112, etc.)
  snapshot.forEach(function(childSnapshot) {
    // Key of the child node (1715237314155, 1715237415112, etc.)
    const key = childSnapshot.key;

    // Data within the child node (Humidity, Moisture, Sunlight)
    const childData = childSnapshot.val();

    let sunlight = document.getElementById("sunlight")
    let moisture = document.getElementById("moisture")
    let humidity = document.getElementById("humidity")

    let temperature_element = document.getElementById("temperature")

    let sunlight_template = `<circle-progress value="${childData.sunlight.trim()}" max="1000" textFormat="percent"></circle-progress>
    <h3 class="mb-0 font-weight-bold mt-2 text-dark">${childData.sunlight}</h3>`
    let sunDoc = document.createElement("div")
    sunDoc.innerHTML = sunlight_template
    sunlight.appendChild(sunDoc)

    let moisture_template = `<circle-progress value="${childData.moisture.replace("%", "")}" max="100" textFormat="percent"></circle-progress>
    <h3 class="mb-0 font-weight-bold mt-2 text-dark">${childData.moisture}</h3>`
    let moiDoc = document.createElement("div")
    moiDoc.innerHTML = moisture_template
    moisture.appendChild(moiDoc)

    let humidity_template = `<circle-progress value="${childData.humidity.replace("%", "")}" max="100" textFormat="percent"></circle-progress>
    <h3 class="mb-0 font-weight-bold mt-2 text-dark">${childData.humidity}</h3>`
    let humidityDoc = document.createElement("div")
    humidityDoc.innerHTML = humidity_template
    humidity.appendChild(humidityDoc)

    
     let Temperature_template = `<circle-progress value="${childData.temperature.replace("°C", "")}" max="100" textFormat="percent"></circle-progress>
     <h3 class="mb-0 font-weight-bold mt-2 text-dark">${childData.temperature}</h3>`
     let temperature = document.createElement("div")
     temperature.innerHTML = Temperature_template
     temperature_element.appendChild(temperature)

    // Accessing individual properties
    // const humidity = childData.Humidity;
    // const moisture = childData.Moisture;
    // const sunlight = childData.Sunlight;

    // Do whatever you want with the data
    // console.log(`Key: ${key}`);
    // console.log(`Humidity: ${humidity}`);
    // console.log(`Moisture: ${moisture}`);
    // console.log(`Sunlight: ${sunlight}`);
  });
});


let logout = document.getElementById("logout")
logout.addEventListener("click", ()=>{
    localStorage.removeItem("user")
    window.location = "http://127.0.0.1:5501/pages/samples/login.html"
})