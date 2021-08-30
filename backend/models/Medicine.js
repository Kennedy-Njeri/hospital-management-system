const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const Medicine = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        genericName: {
            type: String,
            required: true,
        },
        batchNo: {
            type: Number,
            required: true
        },
        barCode: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true,

        },
        quantity: {
            type: Number,
            required: true
        },
        unitWeight: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            default: "Tablet",
            enum: ["Inj", "Capsule", "Tablet"] // enum means string objects
        },
        manDate: {
            type: String,
            required: true
        },
        expDate: {
            type: String,
            required: true
        },
        cost: {
            type: Number,
            required: true
        },
        retailCost: {
            type: Number,
            required: true
        },
        effects: {
            type: String,
            required: true,

        },
        vendor: {
            type: ObjectId,
            required: true,
            ref: 'vendors',
        },
    }
)





module.exports = mongoose.model('Medicine', Medicine);