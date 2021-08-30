const mongoose =  require('mongoose')




const vendors = mongoose.Schema(
    {
        name: {
            type: String,
            required: true

        },
        address: {
            type: String,
            required: true,

        },
        email: {
            type: String,
            required: true,

        },
        number: {
            type: Number,
            required: true
        }
    }
)





module.exports = mongoose.model('vendors', vendors);