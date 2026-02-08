const Service = require("../models/service-model");

const service = async (req, res) => {
  try {
    const response = await Service.find();

    if (!response || response.length === 0) {
      return res.status(200).json({ msg: "No services found" });
    }

    res.status(200).json({ services: response });
  } catch (error) {
    console.error("Service fetch error:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = service;
