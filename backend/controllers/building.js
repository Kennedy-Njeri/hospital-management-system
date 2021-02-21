const building = require('../models/buildings')
const asyncHandler  = require( 'express-async-handler')






exports.buildingById = async (req, res, next, id) => {

    await building.findById(id).exec((err, building) => {
        if (err || !building) {
            return res.status(400).json({
                error: 'Building does not exist'
            });
        }
        req.building = building;
        next();
    });
};


exports.getBuilding = asyncHandler(async (req, res) => {
    const build = await building.findById(req.params.id)

    if (build) {
        res.json({
            _id: build._id,
            name: build.name,
            code: build.code,
            description: build.description
        })
    } else {
        res.status(404)
        throw new Error('Building not found')
    }
})



exports.createBuilding = asyncHandler(async (req, res) => {
    console.log(req.body)
    const build = new building(req.body);
    await build.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.building);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const build = await building.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!build) {
            return res.status(404).send()
        }

        await build.save()

        res.send(build)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await building.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Building removed' })
    } else {
        res.status(404)
        throw new Error(' Building not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await building.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})