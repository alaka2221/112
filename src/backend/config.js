require("dotenv").config();

const CONFIG = {
  API_URL: process.env.API_URL || "http://127.0.0.1:19995",
};

module.exports = CONFIG;