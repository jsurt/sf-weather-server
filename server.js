"use strict";
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const https = require("https");
const morgan = require("morgan");

const app = express();

const { PORT, CLIENT_ORIGIN, DARK_SKY_API_KEY } = process.env;

console.log(`CORS enabled for port ${CLIENT_ORIGIN}`);

//app.use(express.static("public"));
app.use(express.json());
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(morgan("common"));

const currentWeatherRouter = require("./routers/current-weather-router");
const showtimeWeatherRouter = require("./routers/showtime-weather-router");

app.use("/weather", currentWeatherRouter);
app.use("/showtime_weather", showtimeWeatherRouter);

app.listen(PORT, () => console.log(`Server listening at port ${PORT}`));
