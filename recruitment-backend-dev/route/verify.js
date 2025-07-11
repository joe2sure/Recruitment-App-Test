const express = require("express");
const route = express.Router();
const verifyJWT = require("../controllers/verify");

route.get("/", verifyJWT);

module.exports = route;
