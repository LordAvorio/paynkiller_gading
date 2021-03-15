const router = require('express').Router()
const {userController} = require('../controllers')

router.get('/login',userController.login)

module.exports = router