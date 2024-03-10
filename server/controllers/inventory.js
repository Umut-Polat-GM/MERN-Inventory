const CustomAPIError = require("../errors/custom-error");
const jwt = require("jsonwebtoken");

const inventory = async (req, res) => {
    res.status(200).json({ msg: "inventory" });
};

module.exports = inventory;
