const faker = require("faker");

const testUsername = faker.internet.userName();
const testPassword = "12";

const PORT = 8080;
const API_URL = `http://localhost:${PORT}/graphql`;
const MONGODB_URI = process.env.MONGODB_URI || "<MONGO_DB_CONNECTION_URL>";
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "JWT_SECRET_KEY";

module.exports = {
  testUsername,
  testPassword,
  PORT,
  API_URL,
  MONGODB_URI,
  JWT_SECRET_KEY
};
