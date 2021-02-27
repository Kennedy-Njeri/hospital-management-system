const specialization = require('../models/specialization')
const asyncHandler  = require( 'express-async-handler')






exports.specializeById = async (req, res, next, id) => {

    await specialization.findById(id).exec((err, specialize) => {
        if (err || !specialize) {
            return res.status(400).json({
                error: 'Specialization does not exist'
            });
        }
        req.specialize = specialize;
        next();
    });
};


exports.getSpecialize = asyncHandler(async (req, res) => {
    const specialize = await specialization.findById(req.params.id)

    if (specialize) {
        res.json({
            _id: specialize._id,
            name: specialize.name,
            description: specialize.description
        })
    } else {
        res.status(404)
        throw new Error('Specialization not found')
    }
})



exports.createSpecialize = asyncHandler(async (req, res) => {
    console.log(req.body)
    const specialize = new specialization(req.body);
    await specialize.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.specialize);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const specialize = await specialization.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!specialize) {
            return res.status(404).send()
        }

        await specialize.save()

        res.send(specialize)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await specialization.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Specialization removed' })
    } else {
        res.status(404)
        throw new Error('Specialization not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await specialization.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})