const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyAdmin ,verifyToken } = require("../middleware/authmiddleware");


router.get('/get-all', verifyAdmin,userController.getAllUsers);
router.post('/assign-roles',verifyAdmin, userController.updateRoleUser);

router.put(`/:id`,verifyToken,userController.updateUser);
router.delete(`/:id`,verifyToken,userController.deleteUser);

module.exports = router;