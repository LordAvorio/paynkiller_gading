const router = require('express').Router()
const {verifyToken} = require('../helpers/jwt')
const {orderController} = require('../controllers')

router.post('/addCart/:idcustomer', orderController.addToCart)
router.get('/userCart/:idcustomer', orderController.getCartUser)
router.patch('/editQty/:idproduk', orderController.editQty)
router.delete('/delete/:iddetails', orderController.delete)

module.exports = router