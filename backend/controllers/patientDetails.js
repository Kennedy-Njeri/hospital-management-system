const patientDetails = require('../models/patientDetails')
const asyncHandler  = require( 'express-async-handler')










exports.patientsById = asyncHandler (async (req, res, next, id) => {

    await patientDetails.findById(id).populate("user").exec((err, patient) => {
        if (err || !patient) {
            return res.status(400).json({
                error: ' Patient does not exist'
            });
        }
        req.patient = patient;
        next();
    });
})



exports.creatPatientDetails = asyncHandler(async (req, res) => {
    //console.log(req.body)
    const patient = new patientDetails(req.body);
    await patient.save((err, data) => {
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
        const patient = await patientDetails.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        })

        if (!patient) {
            return res.status(404).send()
        }

        await patient.save()

        res.send(patient)

    } catch (e) {
        res.status(400).send(e)
    }

})


exports.getPatientDetail = asyncHandler(async (req, res) => {

    const patient = await patientDetails.findById(req.params.id).populate("user")

    if (patient) {
        res.json({
            _id: patient._id,
            user: patient.user._id,
            lastName: patient.lastName,
            idNumber: patient.idNumber,
            regDate: patient.regDate,
            address: patient.address,
            cell: patient.cell,
            birthDate: patient.birthDate,
            residence: patient.residence,
            email: patient.email,
            guardian: patient.guardian,
            relation: patient.relation,
            gender: patient.gender,
            statusPatient: patient.statusPatient,
            patientType: patient.patientType,
            image: patient.image
        })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }
})




exports.getPatientDetailUser = asyncHandler(async (req, res) => {

    const patient = await patientDetails.find({ user: req.params.id }).populate("user")

    if (patient) {
        res.json(patient)
        // res.json({
        //     _id: patient._id,
        //
        //     lastName: patient.lastName,
        //     idNumber: patient.idNumber,
        //     regDate: patient.regDate,
        //     address: patient.address,
        //     cell: patient.cell,
        //     birthDate: patient.birthDate,
        //     residence: patient.residence,
        //     email: patient.email,
        //     guardian: patient.guardian,
        //     relation: patient.relation,
        //     gender: patient.gender,
        //     statusPatient: patient.statusPatient,
        //     patientType: patient.patientType,
        //     image: patient.image
        // })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }
})




exports.remove = asyncHandler(async (req, res) => {

    const { patient } = req.params

    const result = await patientDetails.findById(patient)

    if (result) {
        await result.remove()
        res.json({ message: 'Patient removed' })
    } else {
        res.status(404)
        throw new Error('Patient not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await patientDetails.find({}).populate("user").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})




exports.getGenderValues = (req, res) => {
    res.json(patientDetails.schema.path('gender').enumValues);
};

exports.getStatusValues = (req, res) => {
    res.json(patientDetails.schema.path('statusPatient').enumValues);
};


exports.getPatientTypeValues = (req, res) => {
    res.json(patientDetails.schema.path('patientType').enumValues);
};
