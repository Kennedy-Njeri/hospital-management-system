const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const consultation = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        name: {
            type: ObjectId,
            required: true,
            ref: 'conslCat',
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





module.exports = mongoose.model('consultation', consultation);