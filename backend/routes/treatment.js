const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTreatmentCategory,
    treatmentCatById,
    update,
    remove,
    list,
    getCatTreatmentDetail  } = require('../controllers/treatment');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/treatment-cat-detail/:id/:userId', protect, admin, getCatTreatmentDetail);

router.put('/treatment-cat-update/:id', protect, admin, update);

router.delete('/treatment-cat/:category', protect, admin,  remove);

router.get('/treatment-cat-list/:userId', protect, admin, list);


router.post("/treatment-cat/create/:userId", protect, admin, createTreatmentCategory)


router.param('treatmentId', treatmentCatById);

router.param('userId', userById);

module.exports = router;