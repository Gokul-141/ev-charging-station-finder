# ⚡ EV Charging Station Finder

## 📌 Project Overview

The **EV Charging Station Finder** is a full-stack web application designed to help users locate nearby electric vehicle (EV) charging stations, check availability, book charging slots, and estimate battery range and charging cost.

The project integrates mapping services, authentication, booking management, and analytics into a single platform, demonstrating real-world full-stack development.

---

## 🚀 Key Features

### 🔐 Authentication System

* User Signup & Login
* Role-based access (User / Admin)
* Session management using localStorage

### 📍 Location & Mapping

* Detect user location (Geolocation API)
* Interactive maps using Leaflet.js
* Display charging stations dynamically
* Find nearest charging station

### ⚡ Charging Station Management

* View station details (ports, pricing, availability)
* Availability status (Available / Busy)
* Dynamic search and filtering

### 📅 Booking System

* Book charging slots (date & time)
* Store bookings in JSON database
* Booking confirmation with toast notification
* View bookings history

### 🚗 Navigation & Routing

* Route navigation with distance and time
* Powered by Leaflet Routing Machine
* Clear route functionality

### 📊 Admin Dashboard

* Role-based admin access
* View total bookings and stations
* Revenue estimation
* Charts & analytics (Chart.js)

### 🔋 Smart EV Tools

* Battery Range Prediction
* Charging Cost Estimator

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3 (Modern UI, animations, gradients)
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js

### Libraries & Tools

* Leaflet.js (Interactive Maps)
* Leaflet Routing Machine (Routing)
* Chart.js (Analytics & Charts)
* Nodemon (Development server)

### Database

* JSON (File-based storage)

### Version Control

* Git
* GitHub

---

## 📁 Project Structure

```
ev-charging-finder/
│
├── controllers/
│   ├── bookingcontroller.js
│   └── stationcontroller.js
│
├── routes/
│   ├── bookings.js
│   ├── stations.js
│   └── users.js
│
├── data/
│   ├── bookings.json
│   ├── stations.json
│   └── users.json
│
├── public/
│   ├── index.html
│   ├── admin.html
│   ├── bookings.html
│   ├── login.html
│   ├── signup.html
│   ├── script.js
│   ├── auth.js
│   └── style.css
│
├── utils/
│   └── distance.js
│
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

1. Clone the repository

```
git clone <your-repo-link>
cd ev-charging-finder
```

2. Install dependencies

```
npm install
```

3. Run the server

```
node server.js
```

OR (recommended)

```
npx nodemon server.js
```

4. Open in browser

```
http://localhost:3000
```

---

## 🔄 How It Works

1. User signs up or logs into the system.
2. User location is fetched using Geolocation API.
3. Charging stations are loaded from JSON data.
4. Stations are displayed on the map using Leaflet.
5. User can:

   * Search stations
   * View availability
   * Book slots
   * Get navigation routes
6. Booking data is stored in `bookings.json`.
7. Admin can view analytics and system data.
8. EV tools calculate range and cost dynamically.

---

## 🧠 Concepts Used

* REST API Design
* MVC Architecture (Routes + Controllers)
* Authentication & Role-Based Access
* Geolocation API
* Distance Calculation (Haversine Formula)
* DOM Manipulation
* Event Handling
* Async Programming (Fetch API)
* Data Visualization (Charts)

---

## 📊 Sample Use Cases

* Find nearest EV charging station
* Book charging slot in advance
* Estimate battery range before travel
* Calculate charging cost based on usage
* Admin monitoring and analytics

---

## 🎯 Future Improvements

* Real-time station availability (IoT integration)
* Payment gateway integration
* Database migration (MongoDB / MySQL)
* Mobile responsive UI
* Notifications & alerts system
* Advanced analytics dashboard

---

## 👨‍💻 Author

* Name: Gokul S
* Project: EV Charging Station Finder

---

## 📌 Conclusion

This project demonstrates a complete full-stack application combining frontend, backend, mapping services, authentication, and analytics to solve real-world EV charging challenges efficiently.

---
