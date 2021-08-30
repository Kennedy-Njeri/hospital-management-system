const VaccineAppointment = require('../models/VaccineAppointment')
const asyncHandler  = require( 'express-async-handler')






exports.vaccineAppointById = async (req, res, next, id) => {

    await VaccineAppointment.findById(id).exec((err, appointment) => {
        if (err || !appointment) {
            return res.status(400).json({
                error: 'VaccineAppointment does not exist'
            });
        }
        req.appointment = appointment;
        next();
    });
};


exports.getVaccineApp = asyncHandler(async (req, res) => {
    const appointment = await VaccineAppointment.findById(req.params.id).populate("user vaccine")

    if (appointment) {
        res.json(appointment)
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }
})



exports.createVaccineApp = asyncHandler(async (req, res) => {
    console.log(req.body)
    const appointment = new VaccineAppointment(req.body);
    await appointment.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.appointment);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const appointment = await VaccineAppointment.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!appointment) {
            return res.status(404).send()
        }

        await appointment.save()

        res.send(appointment)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await VaccineAppointment.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Vaccine Appointment removed' })
    } else {
        res.status(404)
        throw new Error('Vaccine Appointment not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await VaccineAppointment.find({}).populate("patient nurse vaccine").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})



exports.getTakenValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('taken').enumValues);
};


exports.getDayValues = (req, res) => {
    res.json(VaccineAppointment.schema.path('day').enumValues);
};