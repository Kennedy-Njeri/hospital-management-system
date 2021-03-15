const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;



const patientDetails = mongoose.Schema(
    {
        user: {
            type: ObjectId,
            required: true,
            ref: 'User',
        },
        lastName: {
            type: String
        },
        idNumber: {
            type: Number,
            required: true,

        },
        regDate: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        cell: {
            type: String
        },
        birthDate: {
            type: String
        },
        residence: {
            type: String
        },
        email: {
            type: String
        },
        guardian: {
            type: String
        },
        relation: {
            type: String
        },
        gender: {
            type: String,
            default: "Male",
            enum: ["Male", "Female"], // enum means string objects
            required: true,
        },
        statusPatient: {
            type: String,
            default: "Cured",
            enum: ["Cured", "Under Treatment"],
            required: true,
        },
        patientType: {
            type: String,
            default: "In Patient",
            enum: ["In Patient", "Out Patient"],
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        
    }
)





module.exports = mongoose.model('patientDetails', patientDetails);