const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;




const expenses = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        department: {
            type: ObjectId,
            required: true,
            ref: 'department',
        },
        amount: {
            type: Number,
            required: true,
            default: 0.0,
        },
        description: {
            type: String,
            required: true
        },
        fromDate: {
            type: String,
            required: true
        },
        to: {
            type: String,
            required: true
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
    }
)





module.exports = mongoose.model('expenses', expenses);