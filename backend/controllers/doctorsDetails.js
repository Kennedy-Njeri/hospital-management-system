const doctorsDetails = require('../models/doctorsDetails')
const asyncHandler  = require( 'express-async-handler')










exports.doctorsById = asyncHandler (async (req, res, next, id) => {

    await doctorsDetails.findById(id).populate("user").exec((err, doctor) => {
        if (err || !doctor) {
            return res.status(400).json({
                error: ' Patient does not exist'
            });
        }
        req.doctor = doctor;
        next();
    });
})



exports.createDoctorsDetails = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const doctor = new doctorsDetails(req.body);
    await doctor.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const doctor = await doctorsDetails.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        if (!doctor) {
            return res.status(404).send()
        }

        await doctor.save()

        res.send(doctor)

    } catch (e) {
        res.status(400).send(e)
    }

})


exports.getDoctorDetail = asyncHandler(async (req, res) => {

    const doctor = await doctorsDetails.findById(req.params.id).populate("user specialization designation department")

    if (doctor) {
        res.json({
            _id: doctor._id,
            user: doctor.user._id,
            lastName: doctor.lastName,
            idNumber: doctor.idNumber,
            regDate: doctor.regDate,
            address: doctor.address,
            cell: doctor.cell,
            specialization: doctor.specialization._id,
            department: doctor.department._id,
            designation: doctor.designation._id,
            residence: doctor.residence,
            email: doctor.email,
            gender: doctor.gender,
            duty: doctor.duty,
            room: doctor.room,
            fee: doctor.fee,
            time_in: doctor.time_in,
            time_out: doctor.time_out,
            days: doctor.days,
            image: doctor.image
        })
    } else {
        res.status(404)
        throw new Error('Doctor not found')
    }
})


exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await doctorsDetails.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Doctor removed' })
    } else {
        res.status(404)
        throw new Error('Doctor not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await doctorsDetails.find({}).populate("user specialization designation department").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})




exports.getGenderValues = (req, res) => {
    res.json(doctorsDetails.schema.path('gender').enumValues);
};

exports.getDutyValues = (req, res) => {
    res.json(doctorsDetails.schema.path('duty').enumValues);
};


exports.getDaysValues = (req, res) => {
    res.json(doctorsDetails.schema.path('days').enumValues);
}