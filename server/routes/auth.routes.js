const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/Auth.controllers");
const { verifyToken } = require("../middleware/authmiddleware");

router.post('/register', authControllers.SaveUser);
router.post('/login', authControllers.login); 
router.post('/logout', authControllers.logout);
router.get(`/profile`,verifyToken,authControllers.Profile);


// Exporting router
module.exports = router;