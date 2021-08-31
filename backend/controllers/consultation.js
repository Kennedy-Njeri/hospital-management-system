const conSult = require('../models/consultation')
const asyncHandler  = require( 'express-async-handler')




exports.createConsul = asyncHandler(async (req, res) => {

    const cons = new conSult(req.body);

    await cons.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.createUserConsul = asyncHandler(async (req, res) => {

    const cons = new conSult({
        ...req.body,
        user: req.user._id
    });

    await cons.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.consById = asyncHandler (async (req, res, next, id) => {

    await conSult.findById(id).exec((err, consl) => {
        if (err || !consl) {
            return res.status(400).json({
                error: 'Consultation does not exist'
            });
        }
        req.cons = consl;
        next();
    });
})


exports.getConsDetail = asyncHandler(async (req, res) => {
    const cons = await conSult.findById(req.cons._id).populate("user testName doc")

    if (cons) {
        res.json(cons)
    } else {
        res.status(404)
        throw new Error('Consultation not found')
    }
})


exports.getConsDetailUser = asyncHandler(async (req, res) => {
    const cons = await conSult.find({ user: req.params.id }).populate("user testName doc")

    if (cons) {
        res.json(cons)
    } else {
        res.status(404)
        throw new Error('Consultation of user not found')
    }
})


exports.update = asyncHandler(async (req, res) => {
    try {
        console.log(req.body)
        const cons = await conSult.findByIdAndUpdate({_id: req.test._id}, req.body, {
            new: true,
            runValidators: true
        })


        await cons.save()

        res.send(cons)

    } catch (e) {
        res.status(400).send(e)
    }

})

// exports.update = asyncHandler(async (req, res) => {
//
//
// })


exports.remove = asyncHandler(async (req, res) => {

    const { cons } = req.params

    const result = await conSult.findById(cons)

    if (result) {
        await result.remove()
        res.json({ message: 'Consultation removed' })
    } else {
        res.status(404)
        throw new Error('Consultation not found')
    }

})


exports.list = asyncHandler(async (req, res) => {
    await conSult.find({}).populate("user testName doc").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})


exports.getPaidValues = (req, res) => {
    res.json(conSult.schema.path('paid').enumValues);
};