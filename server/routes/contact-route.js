const express = require("express");
const contactRoute = express.Router();

const contactForm = require("../controllers/contact-controller");

contactRoute.route("/contact").post(contactForm);

module.exports = contactRoute;