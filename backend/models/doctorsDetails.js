const mongoose =  require('mongoose')
const { ObjectId } = mongoose.Schema;






const doctorsDetails = mongoose.Schema(
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
        specialization: {
            type: ObjectId,
            required: true,
            ref: 'specialization',
        },
        department: {
            type: ObjectId,
            required: true,
            ref: 'department',
        },
        designation: {
            type: ObjectId,
            required: true,
            ref: 'designation',
        },
        residence: {
            type: String
        },
        email: {
            type: String
        },
        gender: {
            type: String,
            default: "Male",
            enum: ["Male", "Female"] // enum means string objects
        },
        duty: {
            type: String,
            default: "Morning",
            enum: ["Evening", "Morning"],
            required: true,
        },
        room: {
            type: String,
            required: true,

        },
        fee: {
            type: Number,
            required: true,

        },
        time_in: {
            type: String
        },
        time_out: {
            type: String
        },
        days: {
            type: String,
            default: "Monday",
            enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            required: true,
        },
        image: {
            type: String
        },

    }
)





module.exports = mongoose.model('doctorsDetails', doctorsDetails);