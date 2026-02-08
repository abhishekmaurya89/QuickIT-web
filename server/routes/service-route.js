const express = require("express");
const serviceRoute = express.Router();

const contactForm = require("../controllers/service-controller");

serviceRoute.route("/service").get(contactForm);

module.exports = serviceRoute;