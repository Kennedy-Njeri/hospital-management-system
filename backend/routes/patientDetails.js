const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')

const {
    addPatientToUserHistory
} = require( '../controllers/user.js')


const { creatPatientDetails, getPatientDetail, update, remove, list, getStatusValues, getGenderValues, getPatientTypeValues, patientsById} = require('../controllers/patientDetails');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/patient-detail/:id/:userId', protect, admin, getPatientDetail);


router.put('/patient-update/:id/:userId', protect, admin, update);

router.delete('/patient-remove/:patient', protect, admin,  remove);

router.get('/patient-list/:userId', protect, admin, list);


router.post("/patient-create/:userId", protect, admin, addPatientToUserHistory, creatPatientDetails)

router.get("/patient/status-values/:userId", protect, admin, getStatusValues);

router.get("/patient/gender-values/:userId", protect, admin, getGenderValues);

router.get("/patient/patient-type-values/:userId", protect, admin, getPatientTypeValues);


router.param('userId', userById);

router.param('patientsById', patientsById);


module.exports = router;