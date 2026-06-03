const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/*
  CHURCH LIVE STATE
*/
let live = false;
let viewers = 0;
let streamTitle = "New Life Worship Center";

/*
  SCHEDULE (optional auto live)
*/
const schedule = {
  sunday: "10:25",
  wednesday: "18:55"
};

function checkSchedule() {
  const now = new Date();

  const time =
    now.getHours().toString().padStart(2, "0") +
    ":" +
    now.getMinutes().toString().padStart(2, "0");

  if (time === schedule.sunday || time === schedule.wednesday) {
    live = true;
  }
}

setInterval(checkSchedule, 30000);

/*
  DASHBOARD PAGE
*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

/*
  API
*/
app.get("/status", (req, res) => {
  res.json({
    live,
    viewers,
    title: streamTitle
  });
});

app.post("/live/on", (req, res) => {
  live = true;
  res.json({ success: true, live });
});

app.post("/live/off", (req, res) => {
  live = false;
  res.json({ success: true, live });
});

app.post("/title", (req, res) => {
  streamTitle = req.body.title || streamTitle;
  res.json({ success: true, title: streamTitle });
});

app.post("/viewers", (req, res) => {
  viewers = req.body.viewers || viewers;
  res.json({ success: true, viewers });
});

/*
  START SERVER (IMPORTANT for network access)
*/
const PORT = 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Church backend running on http://192.168.50.48:" + PORT);
});