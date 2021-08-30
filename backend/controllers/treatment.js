const Treatment = require('../models/treatment')
const asyncHandler  = require( 'express-async-handler')






exports.treatmentCatById = (req, res, next, id) => {

    Treatment.findById(id).exec((err, treatment) => {
        if (err || !category) {
            return res.status(400).json({
                error: ' Treatment Category does not exist'
            });
        }
        req.treatment = treatment;
        next();
    });
};


exports.getCatTreatmentDetail = asyncHandler(async (req, res) => {
    const cat = await Treatment.findById(req.params.id)

    if (cat) {
        res.json({
            _id: cat._id,
            name: cat.name,
            cost: cat.cost
        })
    } else {
        res.status(404)
        throw new Error('Treatment Category not found')
    }
})



exports.createTreatmentCategory = asyncHandler(async (req, res) => {
    const category = new Treatment(req.body);
    await category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.treatment);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const treatmentCategory = await Treatment.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!treatmentCategory) {
            return res.status(404).send()
        }

        await treatmentCategory.save()

        res.send(treatmentCategory)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { category } = req.params

    const result = await Treatment.findById(category)

    if (result) {
        await result.remove()
        res.json({ message: 'Treatment Category removed' })
    } else {
        res.status(404)
        throw new Error(' Treatment Category not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await Treatment.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})