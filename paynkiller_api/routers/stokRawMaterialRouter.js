const router = require('express').Router()
const {stokRawMaterialController} = require('../controllers')

router.get('/stokrawmaterials',stokRawMaterialController.getStokRawMaterial)
router.post('/addstokrawmaterial',stokRawMaterialController.addStokRawMaterial)
router.post('/editstokrawmaterial/:id',stokRawMaterialController.editStokRawMaterial)
router.post('/deletestokrawmaterial/:id',stokRawMaterialController.deleteStokRawMaterial)

module.exports = router