const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createFloor, getFloor, update, remove, list  } = require('../controllers/floor');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/floor-detail/:id/:userId', protect, admin, getFloor);


router.put('/floor-update/:id/:userId', protect, admin, update);

router.delete('/floor-remove/:id/:userId', protect, admin,  remove);

router.get('/floor-list/:userId', protect, admin, list);


router.post("/floor-create/:userId", protect, admin, createFloor)




router.param('userId', userById);

module.exports = router;