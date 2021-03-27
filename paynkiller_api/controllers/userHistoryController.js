const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')

module.exports = {
    userHistory: async(req, res) => {
        const id = parseInt(req.params.id)
        try{
            const sql = `SELECT o.order_number, o.grandTotal_checkout,o.keterangan, o.tanggal_transaksi, o.tanggal_bayar, dc.username, os.status, op.jenis_pembayaran, o.id_status FROM orders o
                         INNER JOIN data_customer AS dc ON o.id_customer = dc.id_customer
                         INNER JOIN order_status os ON o.id_status = os.id
                         LEFT JOIN opsi_pembayaran op ON op.id = o.opsi_pembayaran
                         WHERE o.id_customer = ${db.escape(id)};`
            const hasil = await asyncQuery(sql)
            const data = [{
                id_status: 8
            }]
            res.status(200).send(hasil)
        }
        catch(err){
            res.status(400).send(err)
        }
    },
    getDetailHistory : async(req, res) => {
        const orderNumber = req.params.orderNumber

        try{
            const sql = `SELECT od.total_harga, od.qty, p.nama_produk, co.kode_custom_order, b.nama_brand, c.nama_category
                         FROM  order_details od 
                         LEFT JOIN produk AS p ON od.id_produk = p.id_produk
                         LEFT JOIN custom_order AS co ON od.id_custom_order = co.id_custom_order
                         LEFT JOIN brands AS b ON p.id_brand = b.id_brand
                         LEFT JOIN category AS c ON p.id_kategori = c.id_category
                         WHERE order_number = ${db.escape(orderNumber)}
                         GROUP BY id_details`
            const hasil = await asyncQuery(sql)
            res.status(200).send(hasil)
        }
        catch(err){
            res.status(400).send(err)
        }
    },
    reuploadBuktiTransaksi : async(req, res) => {
        const ordernumber = req.params.orderNumber
        if (!req.file) return res.status(400).send('No Image Uploaded')
        
        const imageUpload = `images/${req.file.filename}`
        try{
            const today = new Date()
            const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() 
            console.log(date)

            const pay = `UPDATE orders SET id_status = 3, bukti_bayar = '${imageUpload}', tanggal_bayar='${date}' WHERE order_number = ${ordernumber}`
            await asyncQuery(pay)
            res.status(200).send('Your Transaction Evidence has been Re-Upload')
        }
        catch(err){
            res.status(400).send(err)
        }
    },
    cancelOrders : async(req, res) => {
        const orderNumber = req.params.orderNumber
        try{
            const check_produk = `SELECT od.total_harga, od.qty, p.nama_produk, p.id_produk, co.kode_custom_order, b.nama_brand, c.nama_category
                         FROM  order_details od 
                         LEFT JOIN produk AS p ON od.id_produk = p.id_produk
                         LEFT JOIN custom_order AS co ON od.id_custom_order = co.id_custom_order
                         LEFT JOIN brands AS b ON p.id_brand = b.id_brand
                         LEFT JOIN category AS c ON p.id_kategori = c.id_category
                         WHERE order_number = ${db.escape(orderNumber)}
                         GROUP BY id_details`
            const hasil = await asyncQuery(check_produk)
            hasil.map(async(item, index) => { 
                try{
                    if(item.kode_custom_order){
                        let checkygdibeli = `SELECT sbk.id_bahan, sbk.total_bahan, cod.total_beli_satuan FROM custom_order_detail cod
                        LEFT JOIN custom_order co ON co.id_custom_order = cod.id_custom_order
                        LEFT JOIN stok_bahan_baku sbk ON sbk.id_bahan = cod.id_bahan_baku
                        WHERE co.kode_custom_order = '${item.kode_custom_order}'`
                        let hasilcheck1 = await asyncQuery(checkygdibeli)
                        hasilcheck1.map(async(itm, idx) => { 
                            try{
                                let updateCancel1 = `UPDATE stok_bahan_baku SET total_bahan = '${parseFloat(itm.total_bahan + itm.total_beli_satuan)}' WHERE id_bahan = '${itm.id_bahan}'`
                                await asyncQuery(updateCancel1)
                                let checkBahanbaku = `SELECT bb.total_kapasitas, sbk.total_bahan, sbk.jumlah_botol, sbk.id_bahan FROM bahan_baku bb
                                                      LEFT JOIN stok_bahan_baku sbk ON sbk.id_bahan = bb.id_bahan_baku
                                                      WHERE sbk.id_bahan = '${itm.id_bahan}'`
                                let hasilcheck2 = await asyncQuery(checkBahanbaku)
                                hasilcheck2.map(async(it, id) => {
                                    try{
                                        let botol = it.jumlah_botol
                                        let kapasitasTemp = parseInt(it.total_kapasitas * botol)
                                        let hasilTemp = parseFloat(it.total_bahan - kapasitasTemp)
                                        if(hasilTemp >= 0.1 && hasilTemp <= it.total_kapasitas){
                                            botol += 1
                                            let updateBotol = `UPDATE stok_bahan_baku SET jumlah_botol = '${botol}' WHERE id_bahan = '${it.id_bahan}'`
                                            await asyncQuery(updateBotol)
                                        }
                                    }
                                    catch(err){
                                        console.log(err)
                                    }
                                })
                            }
                            catch(err){
                                console.log(err)
                            }
                        })
                    }
                    if(!item.kode_custom_order) {
                        let checkStokProduk = `SELECT sp.id_produk, sp.jumlah_produk, od.qty FROM stok_produk sp
                                               LEFT JOIN order_details od ON od.id_produk = sp.id_produk
                                               WHERE od.order_number = '${orderNumber}'`
                        let hasilchekproduk = await asyncQuery(checkStokProduk)
                        hasilchekproduk.map(async(itm, idx) => {
                            try{
                                let updateStokProduk = `UPDATE stok_produk SET jumlah_produk = '${itm.jumlah_produk + itm.qty}' WHERE id_produk = '${itm.id_produk}'`
                                await asyncQuery(updateStokProduk)
                            }
                            catch(err){
                                console.log(err)
                            }
                        })
                    }

                }
                catch(err){
                    console.log(err)
                }

             })
             const update_status = `UPDATE orders SET id_status = 7 WHERE order_number = '${orderNumber}'`
             await asyncQuery(update_status)

             res.status(200).send('Your Order Canceled')
        }
        catch(err){
            res.status(400).send(err)
        }
    }
}