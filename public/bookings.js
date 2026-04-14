async function loadBookings(){

const res = await fetch("/api/bookings");

const bookings = await res.json();

const table = document.getElementById("bookingTable");

table.innerHTML = "";

bookings.forEach((booking,index) => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${index + 1}</td>
<td>${booking.station}</td>
<td>${booking.type}</td>
<td>${booking.date}</td>
<td>${booking.time}</td>
`;

table.appendChild(row);

});

}

loadBookings();