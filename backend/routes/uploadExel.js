const path =  require('path')
const express = require('express')
const multer = require('multer')
const router = express.Router()
const vendors = require('../models/vendors')
var xlsxtojson = require("xlsx-to-json");
var xlstojson = require("xls-to-json");






const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/exel')
    },
    filename(req, file, cb) {
        cb(
            null,
            `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
        )
    },
});


const upload = multer({
    storage,
})


// -> Express Upload RestAPIs
router.post('/', upload.single("uploadfile"), async (req, res) =>{
    console.log(req.file.filename)
    await xlsxtojson({
        input: `uploads/exel/${req.file.filename}`,  // input xls
        output: null, // output json
        lowerCaseHeaders:true
    }, function(err, result) {
        if(err) {
            res.json(err);
        } else {
            console.log(result)
            //res.json(result);
            return vendors.collection.insertMany(result, function (err, resul) {
                if (err) {
                    console.log(err)
                } else {
                    res.json(resul)
                    console.log(resul)
                }
            })
        }
    });

});






module.exports = router