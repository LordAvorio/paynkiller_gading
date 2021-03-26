const { asyncQuery } = require('../helpers/queryHelp')
const db = require('../database')

module.exports = {
    userHistory: async(req, res) => {
        const id = parseInt(req.params.id)
        try{
            const sql = `SELECT o.order_number, o.grandTotal_checkout,o.keterangan, o.tanggal_transaksi, o.tanggal_bayar, dc.username, os.status, op.jenis_pembayaran FROM orders o
                         INNER JOIN data_customer AS dc ON o.id_customer = dc.id_customer
                         INNER JOIN order_status os ON o.id_status = os.id
                         LEFT JOIN opsi_pembayaran op ON op.id = o.opsi_pembayaran
                         WHERE o.id_customer = ${id};`
            const hasil = await asyncQuery(sql)
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
    }
}