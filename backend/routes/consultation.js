const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createConsul, consById, getConsDetail, update, remove, list, getPaidValues , getConsDetailUser, createUserConsul } = require('../controllers/consultation');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/cons-detail/:consId/:userId', protect, admin, getConsDetail);


router.get('/cons-detail-user/:id/:userId', protect, admin, getConsDetailUser);


router.put('/cons-update/:consId', protect, admin, update);

router.delete('/cons-remove/:cons', protect, admin,  remove);

router.get('/cons-list/:userId', protect, admin, list);


router.post("/cons-create/:userId", protect, admin, createConsul)

router.post("/cons-user-create/:userId", protect, createUserConsul)

router.get("/cons/paid-values/:userId", protect, admin, getPaidValues);

router.param('consId', consById);

router.param('userId', userById);

module.exports = router;