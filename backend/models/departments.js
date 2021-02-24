const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;




const department = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        head: {
            type: String,
            required: true,

        },
        address: {
            type: String,
            required: true
        },
        floor: {
            type: ObjectId,
            required: true,
            ref: 'floor',
        },
        phone: {
            type:String,
            required: true
        }
    }
)





module.exports = mongoose.model('department', department);