const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getVaccineApp, createVaccineApp, update, remove, list, getDayValues, getTakenValues  } = require('../controllers/VaccineAppointment');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/vaccine-app-detail/:id/:userId', protect, admin, getVaccineApp);


router.put('/vaccine-app-update/:id/:userId', protect, admin, update);

router.delete('/vaccine-app-remove/:id/:userId', protect, admin,  remove);

router.get('/vaccine-app-list/:userId', protect, admin, list);


router.post("/vaccine-app-create/:userId", protect, admin, createVaccineApp)

router.get("/vaccine/vaccine-day-values/:userId", protect, admin, getDayValues);

router.get("/vaccine/vaccine-taken-values/:userId", protect, admin, getTakenValues);


router.param('userId', userById);



module.exports = router;