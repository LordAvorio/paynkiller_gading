const {asyncQuery, generateQueryBody} = require('../helpers/queryHelp')

module.exports = {
    addToCart: async (req, res) => {
        const id_customer = parseInt(req.params.id_customer)
        const { order_number, id_produk, qty, komposisi, harga_produk, aturan_pakai, total_harga } = req.body
        try {
            const cek = `SELECT * FROM orders WHERE id_customer = ${id_customer} AND status = 1`
            const qcek = await asyncQuery(cek)

            let current_order_number = qcek.length !== 0 ? qcek[0].order_number : Date.now()
            
            if (qcek.length === 0) {
                
                const addOrders= `INSERT INTO orders (order_number, id_customer, status) VALUES
                (${current_order_number}, ${id_customer}, 1)`
                await asyncQuery(addOrders)
            }
            const cekQty = `select o.id_order, o.order_number, o.id_customer, od.id_produk, od.qty, od.komposisi, 
                            od.harga_produk, od.aturan_pakai, od.total_harga, o.status 
                            from orders o left join order_details od on o.order_number = od.order_number 
                            where od.id_produk=${id_produk} and o.id_customer=${id_customer} having o.status=1;`
            const qcekQty = await asyncQuery(cekQty)
            
            if (qcekQty.length !== 0) {
                const prevQty = qcekQty[0].qty
                const prevTotalHarga = qcekQty[0].total_harga
                const prevOrder = qcekQty[0].order_number
                
                const editCart = `update order_details set qty=${qty + prevQty}, total_harga=${total_harga + prevTotalHarga} 
                where id_produk=${id_produk} and order_number=${prevOrder}`
                await asyncQuery(editCart)
            } else {
                const addDetail = `INSERT INTO order_details (order_number, id_produk, qty, komposisi, harga_produk, aturan_pakai, total_harga) VALUES 
                                    (${current_order_number}, ${id_produk}, ${qty}, '${komposisi}', ${harga_produk},
                                    '${aturan_pakai}', ${total_harga})`
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
        const id = parseInt(req.params.id_customer)
        try {
            const get = `select o.id_customer, o.order_number, p.nama_produk, od.qty, od.komposisi, od.harga_produk, 
                        od.aturan_pakai, p.komposisi, os.status as status_order, od.total_harga 
                        from orders o join order_details od on o.order_number = od.order_number 
                        join produk p on od.id_produk = p.id_produk
                        join order_status os on o.status = os.id
                        where o.status = 1 and o.id_customer = ${id}`
            const qget = await asyncQuery(get)
            res.status(200).send(qget)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
            
        }
    }, 
    editQty: async (req, res) => {
        const id = parseInt(req.params.id_produk)
        const { qty, total_price, order_number } = req.body
        try {
            const edit = `update order_details set qty=${qty}, total_harga=${total_price} 
            where id_produk=${id} and order_number=${order_number}`
            await asyncQuery(edit)
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)

        }
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id_produk)
        const { order_number } = req.body
        try {
            const del = `delete from order_details where id_produk=${id} and order_number=${order_number}`
            await asyncQuery(del)
            res.sendStatus(200)
        }
        catch (err) {
            res.status(400).send(err)
            console.log(err)
        }
    }
}