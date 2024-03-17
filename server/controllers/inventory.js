const Inventory = require("../models/Inventory");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const getAllInventories = async (req, res) => {
    const inventories = await Inventory.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ inventories, count: inventories.length });
};
const getInventory = async (req, res) => {
    res.status(200).json({ msg: "getInventory" });
};

const createInventory = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const inventory = await Inventory.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ inventory });
};

const updateInventory = async (req, res) => {
    res.status(200).json({ msg: "updateInventory" });
};

const deleteInventory = async (req, res) => {
    res.status(200).json({ msg: "deleteInventory" });
};

module.exports = {
    getAllInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
};
