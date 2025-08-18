/** @type { import("drizzle-kit").Config } */
require('dotenv').config();

module.exports = {
  schema: [
    "./models/user.js",
    "./models/contact.js"
  ], 
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};
