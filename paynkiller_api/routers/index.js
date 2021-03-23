const userRouter = require('./userRouter')
const orderRouter = require('./orderRouter')
const categoryRouter = require('./categoryRouter')
const produkRouter = require('./produkRouter')
const brandRouter = require('./brandRouter')
const uomRouter = require('./uomRouter')
const adminRouter = require('./adminRouter')
const productRouter = require('./productRouter')
const rawMaterialRouter = require('./rawMaterialRouter')
const stokProdukRouter = require('./stokProdukRouter')
const stokRawMaterialRouter = require('./stokRawMaterialRouter')

module.exports = {
    userRouter,
    categoryRouter,
    brandRouter,
    uomRouter,
    adminRouter,
    productRouter,
    rawMaterialRouter,
    stokProdukRouter,
    stokRawMaterialRouter,
    orderRouter,
    produkRouter
}