const express = require('express')
const router = express.Router()

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');

const { userById, read, update } = require('../controllers/user')



router.get("/secret/:userId", requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({ user: req.profile })
})

router.get('/user/:userId', requireSignin, read);
router.put('/user/:userId', requireSignin, update);
//router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHist);

// every time there is router parameter "userId" in the route, we execute userById method
router.param('userId', userById);


module.exports = router