const express = require("express");
const router = express.Router();

let stations = require("../data/stations.json");

// get all stations
router.get("/", (req,res)=>{

res.json(stations);

});


// add new charging station
router.post("/", (req,res)=>{

const station = req.body;

stations.push(station);

res.json({
message:"Charging station added successfully"
});

});

module.exports = router;