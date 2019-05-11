"use strict";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const unirest = require("unirest");

const app = express();

//app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(morgan("common"));

//Middleware function for giving response body the weather
const getWeather = (req, res, next) => {
  unirest
    .get("https://dark-sky.p.rapidapi.com/37.8092,-85.4669?lang=en&units=auto")
    .header("X-RapidAPI-Host", "dark-sky.p.rapidapi.com")
    .header("X-RapidAPI-Key", process.env.API_KEY)
    .end(result => {
      res.status = result.status;
      res.headers = result.headers;
      res.body = result.body;
      next();
    });
};

//Invoking middleware function
app.use(getWeather);

app.get("/weather", (req, res) => {
  console.log(res.body);
  res.send(res.body);
});

app.listen(process.env.PORT, () =>
  console.log(`Server listening at port ${process.env.PORT}`)
);
