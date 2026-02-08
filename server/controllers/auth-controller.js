const User = require("../models/auth-model");
const { signupSchema, loginSchema } = require("../validators/auth-validator");


// Home route controller
const home = async (req, res) => {
  res.send("Welcome to the Auth API");
};

// Register controller
const register = async (req, res, next) => {
  try {
    console.log("Incoming registration data:", req.body);

    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      const error = new Error("Validation failed");
      error.status = 400;
      error.extraDetails = result.error.errors.map((err) => ({
        field: err.path?.[0] || "unknown",
        message: err.message,
      }));
      return next(error);
    }

    const { username, email, phone, password } = result.data;

    const userExist = await User.findOne({ email });
    if (userExist) {
      const error = new Error("Email already exists");
      error.status = 400;
      error.extraDetails = "Try a different email address";
      return next(error);
    }

    const userCreated = await User.create({ username, email, phone, password });

    if (!userCreated.generateToken || typeof userCreated.generateToken !== "function") {
      const error = new Error("Token generation method not defined on User model");
      error.status = 500;
      return next(error);
    }

    const token = await userCreated.generateToken();

    if (!token) {
      const error = new Error("Token generation failed");
      error.status = 500;
      return next(error);
    }

    return res.status(201).json({
      msg: "Registration Successful",
      token,
      userId: userCreated._id.toString(),
    });

  } catch (error) {
    console.error("❌ Registration failed:", error);
    return next(error);
  }
};

// Login controller (Placeholder)
const login = async (req, res, next) => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {   
      const error = new Error("Login validation failed");
      error.status = 400;
      error.extraDetails = result.error.errors.map((err) => ({
        field: err.path?.[0] || "unknown",
        message: err.message,
      }));
      return next(error);
    }

    const { email, password } = result.data;

    const user = await User.findOne({email});
    if (!user) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      error.extraDetails = "User not found with this email";
      return next(error);
    }

   const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      const error = new Error("Invalid credentials");
      error.status = 401;
      error.extraDetails = "Incorrect password";
      return next(error);
    }

    const token = await user.generateToken();
    if (!token) {
      const error = new Error("Token generation failed");
      error.status = 500;
      return next(error);
    }

    return res.status(200).json({
      msg: "Login successful",
      token,
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("❌ Login failed:", error);
    return next(error);
  }
};

// Protected user route
const user = async (req, res) => {
  res.status(200).json({ msg: "Welcome to user page", user: req.user });
};

module.exports = {
  home, register,login, user
};
