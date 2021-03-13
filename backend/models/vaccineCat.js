const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const Vaccine = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "Subcutaneous",
            enum: ["Intramuscular", "Intravenous", "Subcutaneous"] // enum means string objects
        },
        description: {
            type: String,
            required: true,

        },
        medicine: {
            type: ObjectId,
            required: true,
            ref: 'Medicine',
        },
        effects: {
            type: String,
            required: true,

        }
    }
)





module.exports = mongoose.model('Vaccine', Vaccine);