const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getBuilding, createBuilding, update, remove, list  } = require('../controllers/building');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/building-detail/:id/:userId', protect, admin, getBuilding);


router.put('/building-update/:id/:userId', protect, admin, update);

router.delete('/building-remove/:id/:userId', protect, admin,  remove);

router.get('/building-list/:userId', protect, admin, list);


router.post("/building-create/:userId", protect, admin, createBuilding)




router.param('userId', userById);

module.exports = router;