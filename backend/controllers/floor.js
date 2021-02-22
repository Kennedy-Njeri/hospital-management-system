const floor = require('../models/floor')
const asyncHandler  = require( 'express-async-handler')






exports.floorById = async (req, res, next, id) => {

    await floor.findById(id).exec((err, floor) => {
        if (err || !floor) {
            return res.status(400).json({
                error: 'Floor does not exist'
            });
        }
        req.floor = floor;
        next();
    });
};


exports.getFloor = asyncHandler(async (req, res) => {
    const flo = await floor.findById(req.params.id)

    if (flo) {
        res.json({
            _id: flo._id,
            name: flo.name,
            floorcode: flo.floorcode,
            building: flo.building._id
        })
    } else {
        res.status(404)
        throw new Error('Floor not found')
    }
})



exports.createFloor = asyncHandler(async (req, res) => {
    const flor = new floor(req.body);
    await flor.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.floor);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const flo = await floor.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },).populate("building")

        if (!flo) {
            return res.status(404).send()
        }

        await flo.save()

        res.send(flo)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await floor.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Floor removed' })
    } else {
        res.status(404)
        throw new Error('Floor not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await floor.find({}).populate("building").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})