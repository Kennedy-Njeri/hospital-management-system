const mongoose =  require('mongoose')




const conslCat = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,

        },
        cost: {
            type: Number,
            required: true,
            default: 0.0,
        }
    }
)





module.exports = mongoose.model('conslCat', conslCat);