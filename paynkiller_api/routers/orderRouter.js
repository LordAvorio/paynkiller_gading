const router = require('express').Router()
const {orderController} = require('../controllers')

router.post('/addCart/:id_customer', orderController.addToCart)
router.get('/userCart/:id_customer', orderController.getCartUser)
router.patch('/editQty/:id_produk', orderController.editQty)
router.delete('/delete/:id_produk', orderController.delete)

module.exports = router