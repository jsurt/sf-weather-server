"use strict";
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const morgan = require("morgan");
const unirest = require("unirest");

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(morgan("common"));

app.listen(8080);
