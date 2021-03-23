const mongoose = require("mongoose");

const Review = mongoose.Schema(
    {
        content: String,
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service"
        }
    },
    { timestamps: true }
)

module.exports = Review;