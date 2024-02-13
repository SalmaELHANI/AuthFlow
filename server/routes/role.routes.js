const express = require("express");
const router = express.Router();
const userController = require("../controllers/role.controller");
const { verifyAdmin } = require("../middleware/authmiddleware");



router.get('/getRoles' ,verifyAdmin,userController.getRole);
router.post('/rolePost',verifyAdmin, userController.PostRole);

module.exports = router;