const express = require('express');
const router = express.Router();

const { createTestCategory, testcategoryById, read, update, remove, list  } = require('../controllers/testCategoryController');


const { protect, admin } = require('../middleware/authMiddleware.js')


router.get('/test-category/:categoryTestId', read);

//router.post("/test-category/create/:userId", protect, admin, create)

router.put('/test-category/:categoryTestId/:userId', protect, admin, update);

router.delete('/test-category/:categoryTestId/:userId', protect, admin,  remove);

router.get('/test-categories', list);


router.post("/test-category/create/:userId", protect, admin, createTestCategory)


router.param('categoryTestId', testcategoryById);


module.exports = router;







