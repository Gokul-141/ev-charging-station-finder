// global map variable
let map;
let markers = [];
let stationList = [];
let userLat;
let userLon;
let selectedStation = "";


const user = JSON.parse(localStorage.getItem("user"));

if(!user){
window.location.href = "login.html";
}else if(user.role === "admin"){
window.location.href = "admin.html";
}else{

const nameDisplay = document.getElementById("userNameDisplay");

if(nameDisplay){
nameDisplay.innerText = `👤 Welcome, ${user.name}`;
}
}

// initialize map
function initMap(){

map = L.map('map').setView([20, 78], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
maxZoom:19
}).addTo(map);

getLocation();
loadStations();
}

// get user location
function getLocation(){

navigator.geolocation.getCurrentPosition(position => {

userLat = position.coords.latitude;
userLon = position.coords.longitude;

document.getElementById("userLocation").innerText =
`Lat: ${userLat.toFixed(4)}, Lon: ${userLon.toFixed(4)}`;

map.setView([userLat,userLon],13);

L.marker([userLat,userLon])
.addTo(map)
.bindPopup("You are here")
.openPopup();

});
}

// load stations
async function loadStations(){

const res = await fetch("/api/stations");
const stations = await res.json();

stationList = stations;

displayStations(stations);
renderStationList(stations);
}

// display stations on map
function displayStations(stations){

markers.forEach(marker => map.removeLayer(marker));
markers = [];

stations.forEach(station => {

const status = station.ports > 2 ? "Available" : "Busy";

const marker = L.marker([station.lat, station.lon])
.addTo(map)
.bindPopup(`
<b>${station.name}</b><br>
⚡ ${station.power} ${station.type}<br>
🔌 Ports: ${station.ports}<br>
💰 $${station.price}/kWh<br><br>

<button onclick="drawRouteToStation(${station.lat}, ${station.lon})">
🚗 Show Route
</button>
`);
markers.push(marker);
});
}

// 🔍 SEARCH FUNCTION (CONNECTED TO INPUT)
function filterStations(){

const query = document
.getElementById("searchInput")
.value
.toLowerCase();

const filtered = stationList.filter(station =>
station.name.toLowerCase().includes(query)
);

displayStations(filtered);
renderStationList(filtered);
}

// render station list
function renderStationList(stations){

const container = document.getElementById("stationList");
container.innerHTML = "";

stations.forEach(station => {

const status = station.ports > 2 ? "Available" : "Busy";

const row = document.createElement("div");
row.className = "station-row";

row.innerHTML = `
<div class="station-name">
⚡ <b>${station.name}</b>
</div>

<div class="${status === 'Available' ? 'green' : 'red'}">
${status}
</div>

<div>${station.ports}</div>

<div>$${station.parkingFee}</div>

<div>$${station.price}</div>

<div>
<button class="book-btn"
onclick="openBooking('${station.name}')"
${status === "Busy" ? "disabled" : ""}>
Book
</button>
</div>
`;

container.appendChild(row);

});
}

// booking popup
function openBooking(stationName){

selectedStation = stationList.find(s => s.name === stationName);

document.getElementById("bookingStation").innerText =
"Station: " + stationName;

const modal = document.getElementById("bookingModal");

modal.style.display = "flex";

setTimeout(()=>{
modal.classList.add("show");
},10);
}

// close booking
function closeBooking(){

const modal = document.getElementById("bookingModal");

modal.classList.remove("show");

setTimeout(()=>{
modal.style.display="none";
},200);
}

// confirm booking
function confirmBooking(){

const date = document.getElementById("bookingDate").value;
const time = document.getElementById("bookingTime").value;

if(!date || !time){
alert("Please select date and time");
return;
}

fetch("/api/bookings",{

method:"POST",
headers:{"Content-Type":"application/json"},

body: JSON.stringify({
  station: selectedStation.name,
  type: selectedStation.type || "Standard",
  date: date,
  time: time,
  price: selectedStation.price || 0
})

})
.then(res=>res.json())
.then(()=>{

const msg = document.getElementById("successMsg");
msg.classList.add("show");

setTimeout(() => {
msg.classList.remove("show");
}, 3000);

closeBooking();
});
}

// SUPPORT MODAL
function openSupport(){
document.getElementById("supportModal").style.display = "flex";
}

function closeSupport(){
document.getElementById("supportModal").style.display = "none";
}

// close modal on outside click
window.onclick = function(event){

const bookingModal = document.getElementById("bookingModal");
const supportModal = document.getElementById("supportModal");

if(event.target === bookingModal){
bookingModal.style.display = "none";
}

if(event.target === supportModal){
supportModal.style.display = "none";
}
}

// calendar
function showCalendar(){

const now = new Date();

const options = {
weekday:'long',
year:'numeric',
month:'long',
day:'numeric'
};

document.getElementById("calendar")
.innerText = now.toLocaleDateString(undefined, options);
}

if(document.getElementById("calendar")){
showCalendar();
}

// initialize
window.onload = initMap;

let routingControl = null;

function drawRouteToStation(lat, lon){

if(!userLat || !userLon){
alert("Location not detected");
return;
}

if(routingControl){
map.removeControl(routingControl);
}

routingControl = L.Routing.control({
waypoints: [
L.latLng(userLat, userLon),
L.latLng(lat, lon)
],
routeWhileDragging:false
}).addTo(map);

routingControl.on("routesfound", function(e){

const route = e.routes[0];

const distance = (route.summary.totalDistance / 1000).toFixed(2);
const time = (route.summary.totalTime / 60).toFixed(1);

document.getElementById("routeInfo").innerText =
`Distance: ${distance} km | Time: ${time} mins`;

});

}

function clearRoute(){

if(routingControl){
map.removeControl(routingControl);
routingControl = null;
}

// clear text
document.getElementById("routeInfo").innerText = "";

}

function findNearestStation(){

if(!userLat || !userLon){
alert("Location not detected yet!");
return;
}

let nearestStation = null;
let minDistance = Infinity;

stationList.forEach(station => {

const distance = getDistance(
userLat,
userLon,
station.lat,
station.lon
);

if(distance < minDistance){
minDistance = distance;
nearestStation = station;
}

});

if(nearestStation){
drawRouteToStation(nearestStation.lat, nearestStation.lon);
}

}

function getDistance(lat1, lon1, lat2, lon2){

const R = 6371;

const dLat = (lat2 - lat1) * Math.PI/180;
const dLon = (lon2 - lon1) * Math.PI/180;

const a =
Math.sin(dLat/2) * Math.sin(dLat/2) +
Math.cos(lat1*Math.PI/180) *
Math.cos(lat2*Math.PI/180) *
Math.sin(dLon/2) *
Math.sin(dLon/2);

const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return R * c;
}

function logout(){
localStorage.removeItem("user");
window.location.href = "login.html";
}

function calculateRange(){

const capacity = parseFloat(document.getElementById("batteryCapacity").value);
const percent = parseFloat(document.getElementById("batteryPercent").value);
const efficiency = parseFloat(document.getElementById("efficiency").value);

if(!capacity || !percent || !efficiency){
document.getElementById("rangeResult").innerText = "Enter all values";
return;
}

const range = capacity * (percent/100) * efficiency;

document.getElementById("rangeResult").innerText =
`Estimated Range: ${range.toFixed(2)} km`;
}


function calculateCost(){

const capacity = parseFloat(document.getElementById("costCapacity").value);
const percent = parseFloat(document.getElementById("chargePercent").value);
const price = parseFloat(document.getElementById("pricePerKwh").value);

if(!capacity || !percent || !price){
document.getElementById("costResult").innerText = "Enter all values";
return;
}

const cost = capacity * (percent/100) * price;

document.getElementById("costResult").innerText =
`Estimated Cost: $${cost.toFixed(2)}`;
}