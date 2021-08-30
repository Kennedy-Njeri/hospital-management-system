const vendors = require('../models/vendors')
const asyncHandler  = require( 'express-async-handler')




exports.getVendors = asyncHandler(async (req, res) => {
    const vendor = await vendors.findById(req.params.id)

    if (vendor) {
        res.json({
            _id: vendor._id,
            name: vendor.name,
            address: vendor.address,
            email: vendor.email,
            number: vendor.number
        })
    } else {
        res.status(404)
        throw new Error('Vendor not found')
    }
})


exports.remove = asyncHandler(async (req, res) => {

    const { id } = req.params

    const result = await vendors.findById(id)

    if (result) {
        await result.remove()
        res.json({ message: 'Vendor removed' })
    } else {
        res.status(404)
        throw new Error('Vendor not found')
    }

})



exports.list = asyncHandler(async (req, res) => {
    await vendors.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(data);
    });
})