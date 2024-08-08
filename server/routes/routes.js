const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const register = require("../controllers/register");
const inventoryRoutes = require("./inventory");

const authMiddleware = require("../middleware/authentication");

router.route("/login").post(login);
router.route("/register").post(register);
router.use("/inventory", authMiddleware, inventoryRoutes);

module.exports = router;
