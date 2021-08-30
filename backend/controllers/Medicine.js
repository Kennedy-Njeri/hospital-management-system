const Medicine = require('../models/Medicine')
const asyncHandler  = require( 'express-async-handler')






exports.medicineById = async (req, res, next, id) => {

    await Medicine.findById(id).exec((err, medicine) => {
        if (err || !medicine) {
            return res.status(400).json({
                error: 'Medicine does not exist'
            });
        }
        req.medicine = medicine;
        next();
    });
};


exports.getMedicine = asyncHandler(async (req, res) => {
    const medicine = await Medicine.findById(req.params.id).populate("vendors")

    if (medicine) {
        res.json(medicine)
    } else {
        res.status(404)
        throw new Error('Medicine not found')
    }
})



exports.createMedicine = asyncHandler(async (req, res) => {
    console.log(req.body)
    const med = new Medicine(req.body);
    await med.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.medicine);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const med = await Medicine.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!med) {
            return res.status(404).send()
        }

        await med.save()

        res.send(med)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await Medicine.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Medicine removed' })
    } else {
        res.status(404)
        throw new Error('Medicine not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await Medicine.find({}).populate("vendor ").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})



exports.getTypeValues = (req, res) => {
    res.json(Medicine.schema.path('type').enumValues);
};