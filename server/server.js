require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const authroute = require("./routes/auth-route");
const contactRoute = require("./routes/contact-route");
const serviceRoute = require("./routes/service-route");
const adminRoute = require("./routes/admin-route");
const connectDb = require("./connect");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();
const corsOptions = {
  origin: "*", 
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", authroute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/user", adminRoute);

app.use(errorMiddleware);

connectDb();

module.exports = app;
