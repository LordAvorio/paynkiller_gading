const router = require('express').Router()
const {upload} = require('../helpers/multer')
const uploader = upload() 
const {userHistoryController} = require('../controllers')

router.get('/userHistory/:id', userHistoryController.userHistory)
router.get('/getDetailHistory/:orderNumber', userHistoryController.getDetailHistory)

module.exports = router