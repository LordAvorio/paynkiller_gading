const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

const db = require('./database')

    db.connect((err) => {
        if(err) return console.log('error connecting')
        console.log('connected as id' + db.threadId)
    })

app.get('/',(req, res) => {
    res.status(200).send('<h1>Test masuk route utama</h1>')
})

const port = 2000
app.listen(port, () => console.log('connected to port' + port))