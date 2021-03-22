const router = require('express').Router()
const {adminController} = require('../controllers')

router.get('/admins',adminController.getAdmin)
router.get('/loginadmin',adminController.login)
router.post('/adminadd',adminController.tambahAdmin)
router.post('/editadmin/:id',adminController.editAdmin)

module.exports = router