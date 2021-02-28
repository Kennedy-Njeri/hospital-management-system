const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const testResult = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        testName: {
            type: ObjectId,
            required: true,
            ref: 'testSchema',
        },
        result: {
            type: String,
            required: true,

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
    }
)





module.exports = mongoose.model('testResult', testResult);




