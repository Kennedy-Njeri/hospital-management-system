const testResult = require('../models/test')
const asyncHandler  = require( 'express-async-handler')




exports.createTest = asyncHandler(async (req, res) => {
    const test = new testResult(req.body);
    await test.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.testById = asyncHandler (async (req, res, next, id) => {

    await testResult.findById(id).exec((err, test) => {
        if (err || !test) {
            return res.status(400).json({
                error: ' Test does not exist'
            });
        }
        req.test = test;
        next();
    });
})


exports.getTestDetail = asyncHandler(async (req, res) => {
    const test = await testResult.findById(req.test._id)

    if (test) {
        res.json({
            _id: test._id,
            testName: test.testName,
            result: test.result,
            description: test.description
        })
    } else {
        res.status(404)
        throw new Error('Test not found')
    }
})


exports.update = async (req, res) => {
    try {
        const test = await testResult.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },)

        if (!test) {
            return res.status(404).send()
        }

        await test.save()

        res.send(test)

    } catch (e) {
        res.status(400).send(e)
    }

};


exports.remove = asyncHandler(async (req, res) => {

    const { test } = req.params

    const result = await testResult.findById(test)

    if (result) {
        await result.remove()
        res.json({ message: 'Test removed' })
    } else {
        res.status(404)
        throw new Error('Test not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await testResult.find({}).populate("user testName").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})