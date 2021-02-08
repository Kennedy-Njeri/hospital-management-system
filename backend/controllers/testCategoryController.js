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
    try {
        const cat = await TestCat.findOneAndDelete({_id: req.params.id })

        if (!cat) {
            res.status(404).send()
        }
        res.send(cat)
    } catch (e) {
        res.status(500).send()
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