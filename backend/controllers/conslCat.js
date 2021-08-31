const Consul = require('../models/conslCat')
const asyncHandler  = require( 'express-async-handler')






exports.consultcategoryById = (req, res, next, id) => {

    Consul.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Consultation Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};


exports.getCatConslDetail = asyncHandler(async (req, res) => {
    const cat = await Consul.findById(req.category._id)

    if (cat) {
        res.json(cat)
    } else {
        res.status(404)
        throw new Error('Consul Category not found')
    }
})



exports.createConsulCategory = asyncHandler(async (req, res) => {
    const category = new Consul(req.body);
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
    return res.json(req.category);
};


exports.update = async (req, res) => {
    try {
        const consCategory = await Consul.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!consCategory) {
            return res.status(404).send()
        }

        await consCategory.save()

        res.send(consCategory)

    } catch (e) {
        res.status(400).send(e)
    }

};



exports.remove = async (req, res) => {

    const { category } = req.params

    const result = await Consul.findById(category)

    if (result) {
        await result.remove()
        res.json({ message: 'Consultation removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }

};


exports.list = asyncHandler(async (req, res) => {
    await Consul.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})