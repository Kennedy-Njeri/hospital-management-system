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
    userById,
    registerUsers
} = require( '../controllers/user.js')
const { protect, admin } = require('../middleware/authMiddleware.js')






router.get('/user/:userId', protect, getUserProfile);

router.get('/users/other/:id/:userId', protect, admin, getUserById);

router.put('/user/update/:userId', protect, updateUserProfile);

router.get('/users/get', protect, admin, getUsers);

router.put('/user/:userId', protect, updateUserProfile);

router.put('/users/update/:id/:userId', protect, admin, updateUser);

router.delete('/users/delete/:user', protect, admin, deleteUser);

router.post('/signup', registerUser)

router.post('/register-users/:userId', protect, admin, registerUsers)


router.post('/signin', authUser)


//router.param("user", getUserById)
router.param('userId', userById);



module.exports = router