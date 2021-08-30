const mongoose = require("mongoose");

const designation = mongoose.Schema(
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



module.exports = mongoose.model('designation', designation)