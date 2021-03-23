const mongoose = require("mongoose");

const Service = mongoose.model(
    "Service",
    new mongoose.Schema(
        {
            title: String,
            description: String,
            client: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            technicien: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            status: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Status"
            },
            note: String,
        },
        { timestamps: true }
    )
);

module.exports = Service;