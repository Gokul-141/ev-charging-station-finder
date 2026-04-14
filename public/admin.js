// form submit event
document.getElementById("stationForm").addEventListener("submit", addStation);

// function to add charging station
async function addStation(e){

e.preventDefault();

const station = {

name: document.getElementById("name").value,
lat: parseFloat(document.getElementById("lat").value),
lon: parseFloat(document.getElementById("lon").value),
type: document.getElementById("type").value,
power: document.getElementById("power").value,
ports: parseInt(document.getElementById("ports").value)

};

const res = await fetch("/api/stations",{

method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify(station)

});

const data = await res.json();

document.getElementById("message").innerText = data.message;

}