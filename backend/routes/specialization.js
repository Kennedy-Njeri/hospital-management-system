const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { getSpecialize, createSpecialize, update, remove, list  } = require('../controllers/specialization');


const { protect, admin } = require('../middleware/authMiddleware.js')




router.get('/specialize-detail/:id/:userId', protect, admin, getSpecialize);


router.put('/specialize-update/:id/:userId', protect, admin, update);

router.delete('/specialize-remove/:id/:userId', protect, admin,  remove);

router.get('/specialize-list/:userId', protect, admin, list);


router.post("/specialize-create/:userId", protect, admin, createSpecialize)




router.param('userId', userById);

module.exports = router;