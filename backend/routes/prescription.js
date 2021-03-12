const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')



const { createPrescription, presById, getPrescriptionDetail, update, remove, list, getTakeValues, getPaidValues, getPrescriptionDetailUser  } = require('../controllers/prescription');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/pres-detail/:presId/:userId', protect, admin, getPrescriptionDetail);

router.get('/pres-detail-user/:id/:userId', protect, admin, getPrescriptionDetailUser);


router.put('/pres-update/:id/:userId', protect, admin, update);

router.delete('/pres-remove/:prescription', protect, admin,  remove);

router.get('/pres-list/:userId', protect, admin, list);


router.post("/pres-create/:userId", protect, admin, createPrescription)

router.get("/pres/take-values/:userId", protect, admin, getTakeValues );

router.get("/pres/paid-values/:userId", protect, admin, getPaidValues);


router.param('presId', presById);

router.param('userId', userById);

module.exports = router;