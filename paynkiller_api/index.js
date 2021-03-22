const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static('./public'))

const db = require('./database')

db.connect((err) => {
    if (err) return console.log('error connecting')
    console.log('connected as id' + db.threadId)
})

app.get('/', (req, res) => {
    res.status(200).send('<h1>Test masuk route utama</h1>')
})

app.use(express.static('./public'))

const {
    userRouter,
    categoryRouter,
    produkRouter,
    orderRouter,
    brandRouter,
    uomRouter,
    productRouter,
    rawMaterialRouter,
    stokProdukRouter,
    stokRawMaterialRouter,
    adminRouter
} = require('./routers')

app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/category', categoryRouter)
app.use('/produk', produkRouter)
app.use('/brand', brandRouter)
app.use('/uom', uomRouter)
app.use('/admin', adminRouter)
app.use('/product', productRouter)
app.use('/rawmaterial', rawMaterialRouter)
app.use('/stokproduk', stokProdukRouter)
app.use('/stokrawmaterial', stokRawMaterialRouter)

const port = 2000
app.listen(port, () => console.log('Connected to Port = ' + port))