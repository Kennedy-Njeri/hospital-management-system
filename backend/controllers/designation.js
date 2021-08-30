const designation = require('../models/designation')
const asyncHandler  = require( 'express-async-handler')






exports.designateById = async (req, res, next, id) => {

    await designation.findById(id).exec((err, designate) => {
        if (err || !designate) {
            return res.status(400).json({
                error: 'Specialization does not exist'
            });
        }
        req.designate = designate;
        next();
    });
};


exports.getDesignate = asyncHandler(async (req, res) => {
    const designate = await designation.findById(req.params.id)

    if (designate) {
        res.json({
            _id: designate._id,
            name: designate.name,
            description: designate.description
        })
    } else {
        res.status(404)
        throw new Error('Designation not found')
    }
})



exports.createDesignate = asyncHandler(async (req, res) => {
    console.log(req.body)
    const designate = new designation(req.body);
    await designate.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.designate);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const designate = await designation.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!designate) {
            return res.status(404).send()
        }

        await designate.save()

        res.send(designate)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await designation.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Designation removed' })
    } else {
        res.status(404)
        throw new Error('Designation not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await designation.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})