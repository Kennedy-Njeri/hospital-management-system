const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTest, testById, getTestDetail, update, remove, list, getPaidValues , getTestDetailUser } = require('../controllers/test');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/test-detail/:testId/:userId', protect, admin, getTestDetail);


router.get('/test-detail-user/:id/:userId', protect, admin, getTestDetailUser);


router.put('/test-update/:testId', protect, admin, update);

router.delete('/test-remove/:test', protect, admin,  remove);

router.get('/test-list/:userId', protect, admin, list);


router.post("/test-create/:userId", protect, admin, createTest)

router.get("/test/paid-values/:userId", protect, admin, getPaidValues);

router.param('testId', testById);

router.param('userId', userById);

module.exports = router;