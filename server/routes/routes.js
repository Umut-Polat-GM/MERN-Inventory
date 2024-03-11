const express = require("express");
const router = express.Router();

const login = require("../controllers/login");
const register = require("../controllers/register");
const {
    getAllInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
} = require("../controllers/inventory");

const authMiddleware = require("../middleware/authentication");

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/inventory").get(authMiddleware, getAllInventories).post(authMiddleware, createInventory);
router.route("/inventory/:id").get(authMiddleware, getInventory).patch(authMiddleware, updateInventory).delete(authMiddleware, deleteInventory);

module.exports = router;
