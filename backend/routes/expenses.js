const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getExpenseDetail, creatExpense, update, remove, list, getPaidValues  } = require('../controllers/expenses');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/expenses-detail/:id/:userId', protect, admin, getExpenseDetail);


router.put('/expenses-update/:id/:userId', protect, admin, update);

router.delete('/expenses-remove/:id/:userId', protect, admin,  remove);

router.get('/expenses-list/:userId', protect, admin, list);


router.post("/expenses-create/:userId", protect, admin, creatExpense)

router.get("/expenses/paid-values/:userId", protect, admin, getPaidValues);




router.param('userId', userById);


module.exports = router;