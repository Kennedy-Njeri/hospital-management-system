const express = require('express');
const router = express.Router();

const {
    userById
} = require( '../controllers/user.js')
const { createDepart, getDepart, update, remove, list  } = require('../controllers/department');


const { protect, admin } = require('../middleware/authMiddleware.js')



router.get('/depart-detail/:id/:userId', protect, admin, getDepart);


router.put('/depart-update/:id/:userId', protect, admin, update);

router.delete('/depart-remove/:id/:userId', protect, admin,  remove);

router.get('/depart-list/:userId', protect, admin, list);


router.post("/depart-create/:userId", protect, admin, createDepart)




router.param('userId', userById);



module.exports = router;