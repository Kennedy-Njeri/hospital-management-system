const department = require('../models/departments')
const asyncHandler  = require( 'express-async-handler')






exports.departById = async (req, res, next, id) => {

    await department.findById(id).exec((err, depart) => {
        if (err || !depart) {
            return res.status(400).json({
                error: 'Department does not exist'
            });
        }
        req.depart = depart;
        next();
    });
};


exports.getDepart = asyncHandler(async (req, res) => {
    const depart = await department.findById(req.params.id)

    if (depart) {
        res.json({
            _id: depart._id,
            name: depart.name,
            head: depart.head,
            address: depart.address,
            floor: depart.floor._id,
            phone: depart.phone
        })
    } else {
        res.status(404)
        throw new Error('Department not found')
    }
})



exports.createDepart = asyncHandler(async (req, res) => {
    const depart = new department(req.body);
    await depart.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json({ data });
    });
})


exports.read = (req, res) => {
    return res.json(req.depart);
};


exports.update = asyncHandler(async (req, res) => {
    try {
        const depart = await department.findByIdAndUpdate({_id: req.params.id}, req.body, {
            new: true,
            runValidators: true
        },).populate("floor")

        if (!depart) {
            return res.status(404).send()
        }

        await depart.save()

        res.send(depart)

    } catch (e) {
        res.status(400).send(e)
    }

})



exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await department.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Department removed' })
    } else {
        res.status(404)
        throw new Error('Department not found')
    }
})


exports.list = asyncHandler(async (req, res) => {
    await department.find({}).populate("floor").exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})