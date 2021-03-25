const router = require('express').Router()
const {upload} = require('../helpers/multer')
const uploader = upload() 
const {customOrderController} = require('../controllers')


router.post('/customOrder/:id', uploader, customOrderController.customOrder)
router.get('/getall',customOrderController.getCustomOrder)
router.get('/getcustomorderdetail/:id', customOrderController.getCustomOrderDetail)
router.post('/customorderacc/:id', customOrderController.acceptOrder)
router.post('/customordernoacc/:id', customOrderController.rejectedOrder)
router.post('/addcustomorderdetail/:id', customOrderController.addCustomOrderDetail)
router.post('/customordertocart/:id', customOrderController.addCustomOrderToCart)


module.exports = router