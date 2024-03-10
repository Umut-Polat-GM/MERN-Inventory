const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const inventory = require("../controllers/inventory");

const authMiddleware = require('../middleware/authentication')

router.route("/login").post(login);
router.route("/inventory").get(authMiddleware, inventory);

module.exports = router;
