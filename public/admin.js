const user = JSON.parse(localStorage.getItem("user"));

// protect admin page
if(!user || user.role !== "admin"){
window.location.href = "login.html";
}

// show admin name
document.getElementById("adminName").innerText =
"👤 " + user.name + " (Admin)";

// ================= DASHBOARD =================
async function showDashboard(){

const bookingsRes = await fetch("/api/bookings");
const bookings = await bookingsRes.json();

const stationsRes = await fetch("/api/stations");
const stations = await stationsRes.json();

// ===== CALCULATIONS =====

// total bookings
const totalBookings = bookings.length;

// total stations
const totalStations = stations.length;

// bookings per date
const bookingsPerDay = {};

bookings.forEach(b=>{
bookingsPerDay[b.date] = (bookingsPerDay[b.date] || 0) + 1;
});

// station popularity
const stationCount = {};
let totalRevenue = 0;
bookings.forEach(b=>{

stationCount[b.station] = (stationCount[b.station] || 0) + 1;

totalRevenue += (b.price || 0);

});

// ===== HTML =====

document.getElementById("adminContent").innerHTML = `
<h3>📊 Analytics Dashboard</h3>

<div style="display:flex; gap:20px; margin-bottom:20px;">
  <div class="card">📖 Bookings: ${totalBookings}</div>
  <div class="card">⚡ Stations: ${totalStations}</div>
  <div class="card">💰 Revenue: $${totalRevenue}</div>
</div>

<canvas id="bookingChart" height="100"></canvas>
<br>
<canvas id="stationChart" height="100"></canvas>
`;

// ===== CHART 1 (Bookings Over Time) =====
new Chart(document.getElementById("bookingChart"), {
type: "line",
data: {
labels: Object.keys(bookingsPerDay),
datasets: [{
label: "Bookings per Day",
data: Object.values(bookingsPerDay),
borderWidth: 2
}]
}
});

// ===== CHART 2 (Station Popularity) =====
new Chart(document.getElementById("stationChart"), {
type: "bar",
data: {
labels: Object.keys(stationCount),
datasets: [{
label: "Station Usage",
data: Object.values(stationCount),
borderWidth: 2
}]
}
});
}
// ================= LOAD STATIONS =================
async function loadStations(){

const res = await fetch("/api/stations");
const stations = await res.json();

let html = `
<h3>⚡ Manage Stations</h3>

<div style="margin-bottom:15px;">
<input id="newName" placeholder="Station Name">
<input id="newPorts" placeholder="Ports">
<input id="newPrice" placeholder="Price">
<button onclick="addStation()">Add Station</button>
</div>
`;

stations.forEach((s, index) => {
html += `
<div class="station-row">
<div>${s.name}</div>
<div>${s.ports}</div>
<div>$${s.price}</div>
<div>
<button onclick="deleteStation(${index})">Delete</button>
</div>
</div>
`;
});

document.getElementById("adminContent").innerHTML = html;
}

// ================= ADD STATION =================
async function addStation(){

const name = document.getElementById("newName").value;
const ports = document.getElementById("newPorts").value;
const price = document.getElementById("newPrice").value;

await fetch("/api/stations",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({name,ports,price})
});

loadStations();
}

// ================= DELETE STATION =================
async function deleteStation(index){

await fetch(`/api/stations/${index}`,{
method:"DELETE"
});

loadStations();
}

// ================= BOOKINGS =================
async function loadBookings(){

const res = await fetch("/api/bookings");
const data = await res.json();

let html = "<h3>📖 All Bookings</h3>";

data.forEach(b => {
html += `
<div class="station-row">
<div>${b.station}</div>
<div>${b.date}</div>
<div>${b.time}</div>
</div>
`;
});

document.getElementById("adminContent").innerHTML = html;
}

// ================= LOGOUT =================
function logout(){
localStorage.removeItem("user");
window.location.href = "login.html";
}

// load dashboard first
showDashboard();