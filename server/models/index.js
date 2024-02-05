const mongoose = require("mongoose");
require('dotenv').config();

const db = {};

db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION_STRING;

// Exporting
module.exports = db;