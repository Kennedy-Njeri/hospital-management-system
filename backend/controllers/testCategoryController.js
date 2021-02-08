const TestCat = require('../models/testCategory')
const asyncHandler  = require( 'express-async-handler')






exports.testcategoryById = (req, res, next, id) => {
    
    TestCat.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: ' Test Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};


exports.getCatTestDetail = asyncHandler(async (req, res) => {
    const cat = await TestCat.findById(req.category._id)

    if (cat) {
        res.json({
            _id: cat._id,
            minValue: cat.minValue,
            maxValue: cat.maxValue,
            testName: cat.testName,
            cost: cat.cost,
            description: cat.description
        })
    } else {
        res.status(404)
        throw new Error('Test Category not found')
    }
})



exports.createTestCategory = asyncHandler(async (req, res) => {
    const category = new TestCat(req.body);
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
        const testcategory = await TestCat.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!testcategory) {
            return res.status(404).send()
        }

        await testcategory.save()

        res.send(testcategory)
        
    } catch (e) {
        res.status(400).send(e)
    }

};



exports.remove = async (req, res) => {
    
    const { category } = req.params

    const result = await TestCat.findById(category)

    if (result) {
        await result.remove()
        res.json({ message: 'Category removed' })
    } else {
        res.status(404)
        throw new Error('Category not found')
    }

};


exports.list = asyncHandler(async (req, res) => {
    await TestCat.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})