const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getCatConslDetail, createConsulCategory, update, remove, list  } = require('../controllers/conslCat');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/consul-detail/:id/:userId', protect, admin, getCatConslDetail);


router.put('/consul-update/:id/:userId', protect, admin, update);

router.delete('/consul-remove/:id/:userId', protect, admin,  remove);

router.get('/consul-list/:userId', protect, admin, list);


router.post("/consul-create/:userId", protect, admin, createConsulCategory)




router.param('userId', userById);



module.exports = router;