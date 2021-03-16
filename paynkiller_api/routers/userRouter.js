const router = require('express').Router()
const {userController} = require('../controllers')
const {verifyToken} = require('../helpers/jwt')

router.post('/login',userController.login)
router.post('/keeplogin', verifyToken, userController.keeplogin)

module.exports = router