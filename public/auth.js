async function signup(){

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const res = await fetch("/api/users/signup",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({
  name,
  email,
  password,
  role: "user"
})
});

const data = await res.json();

alert(data.message);

window.location.href = "login.html";
}


async function login(){

const email = document.getElementById("loginEmail").value;
const password = document.getElementById("loginPassword").value;

const btn = document.getElementById("loginBtn");

// loading state
btn.innerHTML = `<div class="spinner"></div>`;
btn.classList.add("loading");

const res = await fetch("/api/users/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body: JSON.stringify({email,password})
});

const data = await res.json();

// restore button
btn.innerHTML = "Login";
btn.classList.remove("loading");

if(data.success){

localStorage.setItem("user", JSON.stringify(data.user));

const msg = document.getElementById("loginMsg");
msg.classList.add("show");

setTimeout(()=>{
window.location.href = "index.html";
},2000);

}else{
alert("Invalid credentials");
}
}

function togglePassword(){
const pass = document.getElementById("loginPassword");

if(pass.type === "password"){
pass.type = "text";
}else{
pass.type = "password";
}
}
