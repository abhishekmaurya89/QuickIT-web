require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken")
const cors = require('cors')
const app = express();
const authroute= require("./routes/auth-route");
const connectDb = require("./connect");
const errorMiddleware = require("./middlewares/error-middleware");
const contactRoute = require("./routes/contact-route");
const serviceRoute=require("./routes/service-route");
const adminRoute = require("./routes/admin-route");
app.use(cors());
app.use(express.json());

app.use("/api/auth", authroute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/user", adminRoute);

app.use(errorMiddleware);

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port: ${PORT}`);
  });
});