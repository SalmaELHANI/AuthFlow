const mongoose = require("mongoose");
const SchamasModel = require("../models/Schamas.model");
const bcrypt =require('bcrypt');
const jwt = require("jsonwebtoken");
const Joi = require('joi');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;


const db = {};
db.Joi = Joi;
db.secretKey= secretKey;
db.SchamasModel = SchamasModel;
db.mongoose = mongoose;
db.url = process.env.DB_CONNECTION_STRING;
db.bcrypt= bcrypt;
db.jwt=jwt;

// Exporting
module.exports = db;