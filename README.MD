# ⚡ EV Charging Station Finder

## 📌 Project Overview

The **EV Charging Station Finder** is a full-stack web application that helps users locate nearby electric vehicle (EV) charging stations, view availability, book charging slots, and get real-time route directions.

This project demonstrates integration of frontend UI, backend APIs, geolocation, and mapping services.

---

## 🚀 Features

* 📍 Detect user location (Latitude & Longitude)
* 🗺️ Display EV charging stations on map (Leaflet.js)
* 🔍 Search stations dynamically
* ⚡ Show station details (ports, pricing, availability)
* 📊 Availability status (Available / Busy)
* 📅 Book charging slots
* 📁 Store bookings in JSON database
* 📍 Find nearest charging station
* 🚗 Route navigation with distance & time (Leaflet Routing Machine)
* ❌ Clear route option
* 🔔 Toast notification (Booking confirmation)
* 📄 View bookings page

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3 (Modern UI, animations, gradients)
* JavaScript (Vanilla JS)

### Backend

* Node.js
* Express.js

### Other Tools & Libraries

* Leaflet.js (Maps)
* Leaflet Routing Machine (Routing)
* Nodemon (Development server)
* JSON (Data storage)

---

## 📁 Project Structure

```
ev-charging-finder/
│
├── controllers/        # Business logic
│   ├── bookingcontroller.js
│   └── stationcontroller.js
│
├── routes/             # API routes
│   ├── bookings.js
│   └── stations.js
│
├── data/               # JSON database
│   ├── bookings.json
│   └── stations.json
│
├── public/             # Frontend files
│   ├── index.html
│   ├── bookings.html
│   ├── script.js
│   └── style.css
│
├── utils/              # Utility functions
│   └── distance.js
│
├── server.js           # Main server file
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

1. User location is fetched using browser geolocation.
2. Charging stations are loaded from JSON data.
3. Stations are displayed on map using Leaflet.
4. User can:

   * Search stations
   * View availability
   * Book slots
   * Find nearest station
5. Booking data is stored in `bookings.json`.
6. Routes are generated dynamically using Leaflet Routing Machine.

---

## 🧠 Concepts Used

* REST API design
* MVC architecture (Routes + Controllers)
* Geolocation API
* Distance calculation (Haversine formula)
* DOM manipulation
* Event handling
* Async operations (fetch API)

---

## 🎯 Future Improvements

* User authentication (Login/Register)
* Real-time availability updates
* Payment integration
* Database integration (MongoDB/MySQL)
* Mobile responsiveness
* Admin dashboard

---

## 👨‍💻 Author

* Name: Gokul S
* Project: EV Charging Station Finder

---

## 📌 Conclusion

This project demonstrates a real-world application of web development concepts by combining maps, APIs, and backend logic to solve EV charging station discovery and booking problems.

---
