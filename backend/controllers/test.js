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
    const test = await testResult.findById(req.test._id).populate("user testName")

    if (test) {
        res.json({
            _id: test._id,
            user: test.user._id,
            testName: test.testName._id,
            result: test.result,
            description: test.description,
            paid: test.paid
        })
    } else {
        res.status(404)
        throw new Error('Test not found')
    }
})


exports.getTestDetailUser = asyncHandler(async (req, res) => {
    const test = await testResult.find({ user: req.params.id }).populate("user testName")

    if (test) {
        res.json(test)
    } else {
        res.status(404)
        throw new Error('Test not found')
    }
})


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const test = await testResult.findByIdAndUpdate({_id: req.test._id}, {user: req.body.user, testName: req.body.testName,
            result: req.body.result,
            description: req.body.description, paid: req.body.paid}, {
            new: true,
            runValidators: true
        })

        // if (!test) {
        //     return res.status(404).send()
        // }

        await test.save()

        res.send(test)

    } catch (e) {
        res.status(400).send(e)
    }

})

// exports.update = asyncHandler(async (req, res) => {
//    
//
// })


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


exports.getPaidValues = (req, res) => {
    res.json(testResult.schema.path('paid').enumValues);
};