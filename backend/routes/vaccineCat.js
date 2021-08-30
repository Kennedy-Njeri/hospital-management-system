const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getVaccineCat, createVaccineCat, update, remove, list, getTypeValues  } = require('../controllers/vaccineCat');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/vaccine-detail/:id/:userId', protect, admin, getVaccineCat);


router.put('/vaccine-update/:id/:userId', protect, admin, update);

router.delete('/vaccine-remove/:id/:userId', protect, admin,  remove);

router.get('/vaccine-list/:userId', protect, admin, list);


router.post("/vaccine-create/:userId", protect, admin, createVaccineCat)

router.get("/vaccine/vaccine-type-values/:userId", protect, admin, getTypeValues);


router.param('userId', userById);



module.exports = router;