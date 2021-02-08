const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTestCategory, testcategoryById, read, update, remove, list  } = require('../controllers/testCategoryController');


const { protect, admin } = require('../middleware/authMiddleware.js')


router.get('/test-category/:categoryTestId', read);

//router.post("/test-category/create/:userId", protect, admin, create)

router.put('/test-category/:categoryTestId/:userId', protect, admin, update);

router.delete('/test-category/:categoryTestId/:userId', protect, admin,  remove);

router.get('/test-categories/:userId', list);


router.post("/test-category/create/:userId", protect, admin, createTestCategory)


router.param('categoryTestId', testcategoryById);

router.param('userId', userById);

module.exports = router;







