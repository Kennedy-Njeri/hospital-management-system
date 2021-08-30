const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createTestCategory, testcategoryById, update, remove, list, getCatTestDetail  } = require('../controllers/testCategoryController');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/test-category-detail/:categoryTestId/:userId', protect, admin, getCatTestDetail);

router.put('/test-category-update/:id', protect, admin, update);

router.delete('/test-category/:category', protect, admin,  remove);

router.get('/test-categories/:userId', list);


router.post("/test-category/create/:userId", protect, admin, createTestCategory)


router.param('categoryTestId', testcategoryById);

router.param('userId', userById);

module.exports = router;







