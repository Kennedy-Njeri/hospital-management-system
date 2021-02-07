import mongoose from 'mongoose'



const testResult = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        test: {
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



const testResult = mongoose.model('testResult', testResult)

export default testResult




