const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')



const { createPrescription, presById, getPrescriptionDetail, update, remove, list, getTakeValues  } = require('../controllers/prescription');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/pres-detail/:presId/:userId', protect, admin, getPrescriptionDetail);


router.put('/pres-update/:id/:userId', protect, admin, update);

router.delete('/pres-remove/:prescription', protect, admin,  remove);

router.get('/pres-list/:userId', protect, admin, list);


router.post("/pres-create/:userId", protect, admin, createPrescription)

router.get("/pres/take-values/:userId", protect, admin, getTakeValues );


router.param('presId', presById);

router.param('userId', userById);

module.exports = router;