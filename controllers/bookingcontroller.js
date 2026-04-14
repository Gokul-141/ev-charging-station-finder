const fs = require("fs");

const bookingsFile = "./data/bookings.json";

// GET all bookings
exports.getBookings = (req, res) => {
const bookings = JSON.parse(fs.readFileSync(bookingsFile));
res.json(bookings);
};

// POST new booking
exports.createBooking = (req, res) => {

const bookings = JSON.parse(fs.readFileSync(bookingsFile));

const newBooking = req.body;

bookings.push(newBooking);

fs.writeFileSync(bookingsFile, JSON.stringify(bookings, null, 2));

res.json({
message: "Booking saved",
booking: newBooking
});

};