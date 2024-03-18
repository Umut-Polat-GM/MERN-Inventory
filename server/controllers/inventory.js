const Inventory = require("../models/Inventory");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError, NotFoundError } = require("../errors");

const getAllInventories = async (req, res) => {
    const inventories = await Inventory.find({ createdBy: req.user.userId }).sort("createdAt");
    res.status(StatusCodes.OK).json({ inventories, count: inventories.length });
};
const getInventory = async (req, res) => {
    const inventory = await Inventory.findOne({ _id: req.params.id, createdBy: req.user.userId });
    if (!inventory) {
        throw new BadRequestError("Inventory does not exist");
    }
    res.status(StatusCodes.OK).json({ inventory });
};

const createInventory = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const inventory = await Inventory.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ inventory });
};

const updateInventory = async (req, res) => {
    const { id } = req.params;
    const { name, price, quantity, description, responsible } = req.body;
    if (
        name === "" ||
        price === "" ||
        quantity === "" ||
        description === "" ||
        responsible === ""
    ) {
        throw new BadRequestError(
            "name, price, quantity, description, responsible fields are required"
        );
    }
    const inventory = await Inventory.findOneAndUpdate(
        { _id: id, createdBy: req.user.userId },
        req.body,
        { new: true, runValidators: true }
    );
    if (!inventory) {
        throw new UnauthenticatedError("Inventory does not exist or you are not authorized");
    }
    res.status(StatusCodes.OK).json({ inventory });
};

const deleteInventory = async (req, res) => {
    const { id } = req.params;
    const inventory = await Inventory.findByIdAndDelete({ _id: id, createdBy: req.user.userId });
    if (!inventory) {
        throw new NotFoundError("Inventory does not exist or you are not authorized");
    }
    res.status(StatusCodes.OK).send();
};

module.exports = {
    getAllInventories,
    getInventory,
    createInventory,
    updateInventory,
    deleteInventory,
};
