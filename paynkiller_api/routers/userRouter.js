const router = require('express').Router()
const {body} = require('express-validator')
const {userController} = require('../controllers')


const registerValidation = [
    body('username')
    .notEmpty()
    .withMessage('username cannot be empty')
    .isLength({min: 6})
    .withMessage('username must have 6 characters or more'),
    body('password')
    .notEmpty()
    .withMessage('password cannot be empty')
    .isLength({min: 8})
    .withMessage('password must have 8 characters or more') 
    .matches(/[0-9]/)
    .withMessage('password must include a number & a symbol') 
    .matches(/[?><:;"'.,!@#$%^*]/)
    .withMessage('password must include a number & a symbol'),
    body('email')
    .isEmail()
    .withMessage('invalid email') 
]

router.post('/register', registerValidation, userController.register)
module.exports = router