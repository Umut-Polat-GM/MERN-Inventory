const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please provide a name"],
            maxlength: 100,
        },
        price: {
            type: Number,
            required: [true, "Please provide a price"],
        },
        quantity: {
            type: Number,
            required: [true, "Please provide a quantity"],
        },
        description: {
            type: String,
            required: [true, "Please provide a description"],
            maxlength: 500,
        },
        responsible: {
            type: String,
            required: [true, "Please provide a responsible"],
            maxlength: 100,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Inventory", InventorySchema);
