require("dotenv").config();
const express = require("express");
const https = require("https");

const router = express.Router();

const { DARK_SKY_API_KEY } = process.env;

const CURRENT_WEATHER_URL = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/37.8092,-85.4669`;

const getWeather = (req, res, next) => {
  let initialData = "";
  https
    .get(CURRENT_WEATHER_URL, response => {
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

router.use(getWeather);

router.get("/", (req, res) => {
  res.send(res.locals.body);
});

module.exports = router;
