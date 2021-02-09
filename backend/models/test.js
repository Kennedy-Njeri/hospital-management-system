const mongoose =  require('mongoose')



const testResult = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        testName: {
            type: mongoose.Schema.Types.ObjectId,
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
        }
    }
)





module.exports = mongoose.model('testResult', testResult);




