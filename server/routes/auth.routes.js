const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth.controller");
const { verifyToken } = require("../middleware/authmiddleware");

router.post('/register', authControllers.SaveUser);
router.post('/login', authControllers.login); 
router.post('/logout',verifyToken, authControllers.logout);
router.get(`/profile`,verifyToken,authControllers.Profile);
router.get('/verify-email/:token',authControllers.verifyEmail);

// Exporting router
module.exports = router;