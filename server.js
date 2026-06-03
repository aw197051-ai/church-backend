const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// =======================
// BASIC STATUS (HOME)
// =======================
app.get("/", (req, res) => {
  res.json({
    status: "online",
    message: "Church backend running"
  });
});

// =======================
// LIVE STATUS SYSTEM
// =======================
// true = live, false = offline
let isLive = false;

// viewer counter (real-time placeholder)
let viewers = 0;

// =======================
// GET LIVE STATUS
// =======================
app.get("/api/status", (req, res) => {
  res.json({
    live: isLive,
    viewers: isLive ? viewers : 0
  });
});

// =======================
// START LIVE (ADMIN)
// =======================
app.post("/api/start", (req, res) => {
  isLive = true;
  viewers = 1;

  console.log("🔴 LIVE STARTED");
  res.json({ success: true, live: true });
});

// =======================
// STOP LIVE (ADMIN)
// =======================
app.post("/api/stop", (req, res) => {
  isLive = false;
  viewers = 0;

  console.log("⚫ LIVE STOPPED");
  res.json({ success: true, live: false });
});

// =======================
// SIMULATE VIEWERS (REAL SYSTEM LATER)
// =======================
setInterval(() => {
  if (isLive) {
    // small random growth
    viewers += Math.floor(Math.random() * 3);
    if (viewers < 1) viewers = 1;
  }
}, 5000);

// =======================
// SCHEDULE SYSTEM (BASIC)
// Sunday 10:25 AM / Wed 6:55 PM (placeholder logic)
// =======================
function checkSchedule() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hour = now.getHours();
  const minute = now.getMinutes();

  // Sunday 10:25
  if (day === 0 && hour === 10 && minute === 25) {
    isLive = true;
  }

  // Wednesday 6:55 PM (18:55)
  if (day === 3 && hour === 18 && minute === 55) {
    isLive = true;
  }
}

setInterval(checkSchedule, 60000);

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Church backend running on port " + PORT);
});