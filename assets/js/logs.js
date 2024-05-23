// Import the Firebase SDK
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js";

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
const rootRef =  ref(database, 'sensorData/')
onValue(rootRef, (snapshot) => {
    let rootDoc = document.getElementById("log-table")
  // Snapshot contains all data at the root level
  const data = snapshot.val();
  console.log(data);
  let thead = document.createElement("tbody")
  let final_template = ''
  let i = 0
  // Iterate through each child node (1715237314155, 1715237415112, etc.)
  snapshot.forEach(function(childSnapshot) {
    // Key of the child node (1715237314155, 1715237415112, etc.)
    const key = childSnapshot.key;

    // Data within the child node (Humidity, Moisture, Sunlight)
    const childData = childSnapshot.val();

    let template = `<tr class="table-info">
                        <td> ${i+1} </td>
                        <td>${childData.sunlight}</td>
                        <td>${childData.humidity.replace("%", "")}</td>
                        <td>${childData.moisture.replace("%", "")}</td>
                        <td>${childData.temperature.replace("%", "")}</td>
                        <td>${childData["pumpStatus"].replace(': ', '')}</td>
                    </tr>`

    final_template = final_template + template 
    i = i + 1
  });

  thead.innerHTML = final_template
  rootDoc.appendChild(thead)
});