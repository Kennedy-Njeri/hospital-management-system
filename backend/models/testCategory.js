const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
    {
        testName: {
            type: String,
            required: true
        },
        minValue: {
            type: Number,
            required: true,
            default: 0.0,
        },
        maxValue: {
            type: Number,
            required: true,
            default: 100.0,
        },
        cost: {
            type: Number,
            required: true,
            default: 0.0,
        },
        description: {
            type: String,
            required: true
        }
    }
)



module.exports = mongoose.model('testSchema', testSchema)

