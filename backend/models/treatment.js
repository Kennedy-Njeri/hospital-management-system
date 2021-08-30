const mongoose = require("mongoose");

const Treatment = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true,
            default: 0.0,
        }
    }
)



module.exports = mongoose.model('Treatment', Treatment)