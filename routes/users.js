const express = require("express");
const fs = require("fs");
const router = express.Router();

const usersFile = "./data/users.json";

// SIGNUP
router.post("/signup",(req,res)=>{

const users = JSON.parse(fs.readFileSync(usersFile));

const {name,email,password} = req.body;

// check existing
const existing = users.find(u=>u.email===email);

if(existing){
return res.json({message:"User already exists"});
}

const newUser = {name,email,password};

users.push(newUser);

fs.writeFileSync(usersFile, JSON.stringify(users,null,2));

res.json({message:"Signup successful"});
});


// LOGIN
router.post("/login",(req,res)=>{

const users = JSON.parse(fs.readFileSync(usersFile));

const {email,password} = req.body;

const user = users.find(u=>u.email===email && u.password===password);

if(user){
res.json({success:true, user});
}else{
res.json({success:false});
}

});

module.exports = router;