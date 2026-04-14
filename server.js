const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// serve public folder
app.use(express.static("public"));

const stationRoutes = require("./routes/stations");
const bookingsRoute = require("./routes/bookings");

app.use("/api/stations", stationRoutes);
app.use("/api/bookings", bookingsRoute);


// temporary bookings API (demo data)

app.get("/api/bookings", (req, res) => {

const bookings = [
{
station: "Tesla Station",
type: "Supercharger",
date: "2026-03-11",
time: "11:00 - 12:00"
},
{
station: "Aether Energy Station",
type: "Fast charger",
date: "2026-03-11",
time: "10:00 - 11:00"
},
{
station: "Mahindra Electric Charging",
type: "Supercharger",
date: "2026-03-17",
time: "09:00 - 10:00"
}
];

res.json(bookings);

});


app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});