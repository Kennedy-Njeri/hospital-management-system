const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const VaccineAppointment = mongoose.Schema(
    {
        patient: {
            type: String,
            required: true,
            ref: 'User',
        },
        nurse: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        vaccine: {
            type: ObjectId,
            required: true,
            ref: 'Vaccine',
        },
        date: {
            type: String,
            required: true
        },
        time_in: {
            type: String
        },
        taken: {
            type: String,
            default: "Yes",
            enum: ["Yes", "No"] // enum means string objects
        },
        day: {
            type: String,
            default: "Morning",
            enum: ["Evening", "Morning"]
        },
        room: {
            type: String,
            required: true,

        },
        remarks: {
            type: String,
            required: true,

        }
    }
)





module.exports = mongoose.model('VaccineAppointment', VaccineAppointment);