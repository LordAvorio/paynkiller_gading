const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')
const transporter = require('../helpers/nodemailer')
const handlebars = require('handlebars')
const fs = require('fs')


module.exports = {
    customOrder: async (req, res) => {
        const id = parseInt(req.params.id)

        if (!req.file) return res.status(400).send('No Image Uploaded')
        let imageUpload = `images/${req.file.filename}`

        let generateCode = Math.random().toString(36).substring(7)
        let codeKapital = generateCode.toUpperCase()
        let hari = new Date()
        let day = hari.getDate()
        let bulan = hari.getMonth()
        let tahun = hari.getFullYear()
        let finalCode = `CO-${tahun}${bulan}${day}-${codeKapital}`
        try {
            const sql = `INSERT INTO custom_order (gambar_resep, id_user, status, kode_custom_order) VALUES ('${imageUpload}', '${id}', 1, '${finalCode}')`
            await asyncQuery(sql)

            res.status(200).send('Your Medical Prescription has been Uploaded')
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
    getCustomOrder: async (req,res) => {
        try{
            let sql = `SELECT a.*,
            b.username,b.email,
            c.nama_status_custom_order 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            INNER JOIN status_custom_order AS c ON a.status = c.id_status_custom_order`
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            res.status(400).send(err)
        }
    },
    getCustomOrderDetail: async (req,res) => {
        let id = req.params.id
        
        try{
            let sql = `SELECT a.*,
            b.kode_bahan_baku,b.nama_bahan_baku,b.harga_bahan_baku,b.total_kapasitas,
            c.nama_uom
            FROM custom_order_detail AS a
            INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom
            WHERE id_custom_order = ${id}
            `
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            res.status(400).send(err)
        }
    },
    acceptOrder: async (req,res) => {
        let id = req.params.id
        
        try{
            let sql = `UPDATE custom_order SET status = 2 WHERE id_custom_order = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT a.*,
            b.username,b.email 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            WHERE id_custom_order = ${id}`
            let rows2 = await asyncQuery(sql2)

            console.log(rows2[0].email)

            const option = {
                from: `admin <andhika.jeremia@gmail.com>`,
                to: `${rows2[0].email}`,
                subject: 'Custom Order Accepted',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid:'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/customOrderAccept.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({username: rows2[0].username})

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')

        }
        catch(err){
            res.status(400).send(err)
        }
    },
    rejectedOrder: async(req,res) => {
        let id = req.params.id

        try{
            let sql = `UPDATE custom_order SET status = 3 WHERE id_custom_order = ${id}`
            let rows = await asyncQuery(sql)

            let sql2 = `SELECT a.*,
            b.username,b.email 
            FROM custom_order a
            INNER JOIN data_customer AS b ON a.id_user = b.id_customer
            WHERE id_custom_order = ${id}`
            let rows2 = await asyncQuery(sql2)

            console.log(rows2[0].email)

            const option = {
                from: `admin <andhika.jeremia@gmail.com>`,
                to: `${rows2[0].email}`,
                subject: 'Custom Order Accepted',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid:'paynkiller'
                }],
            }

            const fileEmail = fs.readFileSync('./email/customOrderReject.html').toString()
            const template = handlebars.compile(fileEmail)
            option.html = template({username: rows2[0].username, keterangan: req.body.keterangan})

            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')


        }catch(err){
            res.status(400).send(err)
        }
    },
    addCustomOrderDetail: async(req,res) => {

        let id = parseInt(req.params.id)

        let idBahan = parseInt(req.body.idBahanBaku)
        let jumlahBeli = parseFloat(req.body.kuantitasBahan)

        try{
            let sql = `SELECT a.*,
            b.harga_bahan_baku
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            WHERE id_bahan = ${idBahan}`
            let rows = await asyncQuery(sql)

            let hargaBahanBaku = parseFloat(rows[0].harga_bahan_baku)

            if(jumlahBeli > 0 && jumlahBeli < 1){
               jumlahBeli = Math.ceil(jumlahBeli)
            }else{
               jumlahBeli = Math.round(jumlahBeli)
            }

            let totalHarga = parseFloat(jumlahBeli * hargaBahanBaku)

            console.log(`${jumlahBeli} * ${hargaBahanBaku} = ${totalHarga}`)
            
            let sql2 = `INSERT INTO custom_order_detail (id_custom_order,id_bahan_baku,total_beli_satuan,total_harga) VALUES (${id},${idBahan},${parseFloat(req.body.kuantitasBahan)},${totalHarga})`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send("Insert Data Berhasil")

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addCustomOrderToCart: async(req,res) => {
        let id = parseInt(req.params.id)

        const {id_custom_order} = req.body

        try{    
            let cek = `SELECT * FROM orders WHERE id_customer = ${id} AND id_status = 1`
            let qcek = await asyncQuery(cek)

            let current_order_number = qcek.length !== 0 ? qcek[0].order_number : Date.now()

            if (qcek.length === 0) {

                const addOrders = `INSERT INTO orders (order_number, id_customer, id_status) VALUES
                (${current_order_number}, ${id}, 1)`
                await asyncQuery(addOrders)

                let totalSum = `SELECT SUM(a.total_harga) AS grandTotal
                FROM custom_order_detail AS a
                INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
                INNER JOIN uom AS c ON b.id_uom = c.id_uom
                WHERE id_custom_order = ${id_custom_order}`
                let rowSum = await asyncQuery(totalSum)

                let grandTotal = parseFloat(rowSum[0].grandTotal)
                console.log(grandTotal)

                let queryInsert = `INSERT INTO order_details (order_number,id_produk,id_custom_order,qty,total_harga) VALUES (${current_order_number},0,${id_custom_order},1,${grandTotal})`
                let rowsQueryInsert = await asyncQuery(queryInsert)

            }else{
                let totalSum2 = `SELECT SUM(a.total_harga) AS grandTotal
                FROM custom_order_detail AS a
                INNER JOIN bahan_baku AS b ON a.id_bahan_baku = b.id_bahan_baku
                INNER JOIN uom AS c ON b.id_uom = c.id_uom
                WHERE id_custom_order = ${id_custom_order}`
                let rowSum2 = await asyncQuery(totalSum2)

                let grandTotal2 = parseFloat(rowSum2[0].grandTotal)

                let queryInsert2 = `INSERT INTO order_details (order_number,id_produk,id_custom_order,qty,total_harga) VALUES (${current_order_number},0,${id_custom_order},1,${grandTotal2})`
                let rowsQueryInsert2 = await asyncQuery(queryInsert2)
            }

            let changeStatus = `UPDATE custom_order set status = 4 WHERE id_custom_order = ${id_custom_order} `
            let rowsChangeStatus = await asyncQuery(changeStatus)

            res.status(200).send("Custom Order berhasil ditambah !")

        }catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    showCustomOrder: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const sql = `SELECT co.id_custom_order, co.gambar_resep, co.kode_custom_order, soc.nama_status_custom_order as status FROM custom_order co
                         LEFT JOIN status_custom_order soc ON co.status = soc.id_status_custom_order
                         WHERE co.id_user = ${db.escape(id)};`
            const rows = await asyncQuery(sql)

            res.status(200).send(rows)
        }
        catch (err) {
            res.status(400).send(err)
        }
    },
}