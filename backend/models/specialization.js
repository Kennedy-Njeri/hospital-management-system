const mongoose = require("mongoose");

const specialization = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }
)



module.exports = mongoose.model('specialization', specialization)