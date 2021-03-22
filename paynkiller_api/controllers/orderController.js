const { asyncQuery, generateQueryBody } = require('../helpers/queryHelp')
const db = require('../database')
module.exports = {
    addToCart: async (req, res) => {
        const id_customer = parseInt(req.params.idcustomer)
        const { order_number, id_produk, qty, komposisi, harga_produk, aturan_pakai, total_harga } = req.body
        console.log(req.body)
        try {
            const cek = `SELECT * FROM orders WHERE id_customer = ${id_customer} AND status = 1`
            const qcek = await asyncQuery(cek)

            let current_order_number = qcek.length !== 0 ? qcek[0].order_number : Date.now()

            if (qcek.length === 0) {

                const addOrders = `INSERT INTO orders (order_number, id_customer, status) VALUES
                (${current_order_number}, ${id_customer}, 1)`
                await asyncQuery(addOrders)
            }
            // console.log(id_produk)
            const cekQty = `select o.id_order, o.order_number, o.id_customer, od.id_produk, od.qty, od.komposisi, 
                            od.harga_produk, od.aturan_pakai, od.total_harga, o.status 
                            from orders o left join order_details od on o.order_number = od.order_number 
                            where od.id_produk=${db.escape(req.body.id_produk)} and o.order_number=${current_order_number} having o.status=1;`
            const qcekQty = await asyncQuery(cekQty)

            if (qcekQty.length !== 0) {
                const prevQty = qcekQty[0].qty
                const prevTotalHarga = qcekQty[0].total_harga
                const prevOrder = qcekQty[0].order_number

                const editCart = `update order_details set qty=${qty + prevQty}, total_harga=${total_harga + prevTotalHarga} 
                where id_produk=${db.escape(id_produk)} and order_number=${prevOrder}`
                await asyncQuery(editCart)
            } else {
                const addDetail = `INSERT INTO order_details (order_number, id_produk, qty, komposisi, harga_produk, aturan_pakai, total_harga) VALUES 
                                    (${current_order_number}, ${db.escape(id_produk)}, ${db.escape(qty)}, ${db.escape(komposisi)}, ${db.escape(harga_produk)},
                                    ${db.escape(aturan_pakai)}, ${db.escape(total_harga)})`
                await asyncQuery(addDetail)
            }
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    },
    getCartUser: async (req, res) => {
        // console.log(req.user)
        const id = parseInt(req.params.idcustomer)
        console.log('id customer', id)
        try {
            const get = `select o.id_customer, o.order_number, p.id_produk, p.nama_produk, p.gambar_obat, od.id_details, od.qty, sp.jumlah_produk as stock, od.komposisi, od.harga_produk, 
                        od.aturan_pakai, p.komposisi, os.status as status_order, od.total_harga 
                        from orders o join order_details od on o.order_number = od.order_number 
                        join produk p on od.id_produk = p.id_produk
                        join stok_produk sp on p.id_produk = sp.id_produk
                        join order_status os on o.status = os.id
                        where o.status = 1 and o.id_customer = ${db.escape(id)}`
            // console.log(get)
            const qget = await asyncQuery(get)

            // const grandTotal = `select sum(od.harga_produk) as grand_total from orders o join order_details od on o.order_number = od.order_number 
            // join produk p on od.id_produk = p.id_produk
            // join order_status os on o.status = os.id
            // where o.status = 1 and o.id_customer = ${req.user.id_user}`
            // const qgrandTotal =await asyncQuery(grandTotal)
            res.status(200).send(qget)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)

        }
    },
    editQty: async (req, res) => {
        const id = parseInt(req.params.idproduk)
        console.log(req.body)
        const { qty, total_harga, id_details } = req.body
        try {
            const edit = `update order_details set qty=${qty}, total_harga=${total_harga} 
                        where id_details=${id_details}`
            await asyncQuery(edit)
            console.log('berhasil edit qty')
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
            
        }
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.iddetails)
        console.log('ini reqbody', req.body)
        const { order_number } = req.body
        try {
            const del = `delete from order_details where id_details=${id}`
            await asyncQuery(del)
            console.log(del)
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    }
}