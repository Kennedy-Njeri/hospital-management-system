const Vaccine = require('../models/vaccineCat')
const asyncHandler  = require( 'express-async-handler')






exports.vaccineCatById = async (req, res, next, id) => {

    await Vaccine.findById(id).exec((err, vaccine) => {
        if (err || !vaccine) {
            return res.status(400).json({
                error: 'Vaccine Cat does not exist'
            });
        }
        req.vaccine = vaccine;
        next();
    });
};


exports.getVaccineCat = asyncHandler(async (req, res) => {
    const vaccine = await Vaccine.findById(req.params.id).populate("Medicine")

    if (vaccine) {
        res.json(vaccine)
    } else {
        res.status(404)
        throw new Error('Vaccine not found')
    }
})



exports.createVaccineCat = asyncHandler(async (req, res) => {
    console.log(req.body)
    const vaccine = new Vaccine(req.body);
    await vaccine.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.vaccine);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const vaccine = await Vaccine.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!vaccine) {
            return res.status(404).send()
        }

        await vaccine.save()

        res.send(vaccine)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await Vaccine.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Vaccine removed' })
    } else {
        res.status(404)
        throw new Error('Vaccine not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await Vaccine.find({}).populate("medicine").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})



exports.getTypeValues = (req, res) => {
    res.json(Vaccine.schema.path('type').enumValues);
};