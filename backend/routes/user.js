const express = require('express')
const router = express.Router()
const {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser,
    userById
} = require( '../controllers/user.js')
const { protect, admin } = require('../middleware/authMiddleware.js')






router.get('/user/:userId', protect, getUserProfile);

router.put('/user/update/:userId', protect, updateUserProfile);

router.get('/users/get/:userId', protect, admin, getUsers);

router.put('/user/:userId', protect, updateUserProfile);

router.put('/users/update/:userId', protect, admin, updateUser);

router.post('/users/delete/:userId', protect, admin, deleteUser);

router.post('/signup', registerUser)


router.post('/signin', authUser)


router.param('userId', userById);



module.exports = router