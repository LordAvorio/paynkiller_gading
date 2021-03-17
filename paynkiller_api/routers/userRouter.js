const router = require('express').Router()
const {userController} = require('../controllers')
const {verifyToken} = require('../helpers/jwt')
const {body} = require('express-validator')

const passValidation = [
    body('password')
    .isStrongPassword({minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1,})
    .withMessage('password not strong (use symbol (!#$%^&*()_+=:;?/.><,~`) ex: ExamplePassword2!)')
]

router.post('/login',userController.login)
router.post('/keeplogin', verifyToken, userController.keeplogin)
router.post('/forgotPass', userController.forgotPass)
router.post('/changepass', passValidation, verifyToken, userController.changePass)
module.exports = router