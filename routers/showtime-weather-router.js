require("dotenv").config();
const express = require("express");
const https = require("https");

const router = express.Router();

const { PORT, CLIENT_ORIGIN, DARK_SKY_API_KEY } = process.env;

let SHOWTIME_WEATHER_URL;

const getDateTime = (req, res, next) => {
  console.log("Getting the date");
  //Getting weather for todays date...
  const date = new Date();
  const year = date.getFullYear().toString();
  //Month is 0-indexed
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  //Make sure single digit values have a leading '0'
  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }
  //...at this time
  const hr = "19";
  const min = "00";
  const sec = "00";
  //Insert date and time into request url (not hard-coding in so it can be flexible)
  SHOWTIME_WEATHER_URL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/37.8092,-85.4669,${year}-${month}-${day}T${hr}%3A${min}%3A${sec}`;
  next();
};

const getShowWeather = (req, res, next) => {
  let initialData = "";
  https
    .get(SHOWTIME_WEATHER_URL, response => {
      response.on("data", data => {
        initialData += data;
      });
      response.on("end", () => {
        res.locals.body = initialData;
        next();
      });
    })
    .end();
};

router.use(getDateTime, getShowWeather);

router.get("/", (req, res) => {
  console.log("All is well");
  res.send(res.locals.body);
});

module.exports = router;
