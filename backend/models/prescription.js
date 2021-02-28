const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const Prescription = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        treatment: {
            type: ObjectId,
            required: true,
            ref: 'Treatment',
        },
        medicine: {
            type: String,
            required: true,

        },
        time: {
            type: Number,
            required: true
        },
        days: {
            type: Number,
            required: true
        },
        take: {
            type: String,
            default: "Morning",
            enum: ["Morning", "Midday", "Evening"] // enum means string objects
        },
        test: {
            type: ObjectId,
            required: true,
            ref: 'testSchema',
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
        history: {
            type: String,
            required: true,

        }
    }
)





module.exports = mongoose.model('Prescription', Prescription);