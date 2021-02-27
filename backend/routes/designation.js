const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getDesignate, createDesignate, update, remove, list  } = require('../controllers/designation');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/designate-detail/:id/:userId', protect, admin, getDesignate);


router.put('/designate-update/:id/:userId', protect, admin, update);

router.delete('/designate-remove/:id/:userId', protect, admin,  remove);

router.get('/designate-list/:userId', protect, admin, list);


router.post("/designate-create/:userId", protect, admin, createDesignate)




router.param('userId', userById);

module.exports = router;