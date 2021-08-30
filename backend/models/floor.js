const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const floor = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            
        },
        floorcode: {
            type: String,
            required: true,

        },
        building: {
            type: ObjectId,
            required: true,
            ref: 'building',
        },
    }
)





module.exports = mongoose.model('floor', floor);