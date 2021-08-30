const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const testResult = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        consName: {
            type: ObjectId,
            required: true,
            ref: 'testSchema',
        },
        description: {
            type: String,
            required: true
        },
        paid: {
            type: String,
            default: "Un-paid",
            enum: ["Un-paid", "Paid"]
        },
        approved: {
            type: Boolean,
            default: false
        },
        doc: {
            type: ObjectId,
            required: true,
            ref: 'User',
        }
    }
)





module.exports = mongoose.model('testResult', testResult);