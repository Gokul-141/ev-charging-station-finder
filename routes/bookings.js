const express = require("express");
const router = express.Router();

const {
getBookings,
createBooking
} = require("../controllers/bookingcontroller");

// GET all bookings
router.get("/", getBookings);

// POST booking
router.post("/", createBooking);

module.exports = router;