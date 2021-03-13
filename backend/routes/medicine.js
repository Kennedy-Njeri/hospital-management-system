const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getMedicine, createMedicine, update, remove, list, getTypeValues  } = require('../controllers/Medicine');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/medicine-detail/:id/:userId', protect, admin, getMedicine);


router.put('/medicine-update/:id/:userId', protect, admin, update);

router.delete('/medicine-remove/:id/:userId', protect, admin,  remove);

router.get('/medicine-list/:userId', protect, admin, list);


router.post("/medicine-create/:userId", protect, admin, createMedicine)

router.get("/medicine/medicine-type-values/:userId", protect, admin, getTypeValues);


router.param('userId', userById);



module.exports = router;