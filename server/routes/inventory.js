const express = require("express");
const router = express.Router();
const {
    getAllInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
} = require("../controllers/inventory");

router.route("/").get(getAllInventories).post(createInventory);
router.route("/:id").get(getInventory).patch(updateInventory).delete(deleteInventory);

module.exports = router;
