const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')

const {

} = require( '../controllers/user.js')


const { createDoctorsDetails, getDoctorDetail, update, remove, list, getDaysValues, getGenderValues, getDutyValues} = require('../controllers/doctorsDetails');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/doctor-detail/:id/:userId', protect, admin, getDoctorDetail);


router.put('/doctor-update/:id/:userId', protect, admin, update);

router.delete('/doctor-remove/:id', protect, admin,  remove);

router.get('/doctor-list/:userId', protect, admin, list);



router.post("/doctor-create/:userId", protect, admin, createDoctorsDetails)

router.get("/doctor/days-values/:userId", protect, admin, getDaysValues);

router.get("/doctor/gender-values/:userId", protect, admin, getGenderValues);

router.get("/doctor/duty-values/:userId", protect, admin, getDutyValues);




router.param('userId', userById);




module.exports = router;