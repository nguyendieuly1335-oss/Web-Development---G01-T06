require("dotenv").config();

const config = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false
  },
  scraper: {
    baseUrl: process.env.SCRAPER_BASE_URL,
  }
};
module.exports = config;