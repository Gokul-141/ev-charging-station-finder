const express = require("express");
const fs = require("fs");
const router = express.Router();

const file = "./data/stations.json";

// GET
router.get("/", (req,res)=>{
const data = JSON.parse(fs.readFileSync(file));
res.json(data);
});

// POST
router.post("/", (req,res)=>{
const data = JSON.parse(fs.readFileSync(file));

data.push(req.body);

fs.writeFileSync(file, JSON.stringify(data,null,2));

res.json({message:"Station added"});
});

// DELETE
router.delete("/:index",(req,res)=>{
const data = JSON.parse(fs.readFileSync(file));

data.splice(req.params.index,1);

fs.writeFileSync(file, JSON.stringify(data,null,2));

res.json({message:"Deleted"});
});

module.exports = router;