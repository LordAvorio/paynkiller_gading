const {
    asyncQuery,
    generateQueryBody
} = require('../helpers/queryHelp')

module.exports = {
    getStokProduk: async(req,res) => {
        try{
            let sql = `SELECT a.*,
            b.nama_produk,b.kode_produk,b.indikasi_umum,b.aturan_pakai,b.gambar_obat,b.harga_produk,b.keterangan_obat,b.komposisi,
            c.nama_category,
            d.nama_brand
            FROM stok_produk a
            INNER JOIN produk AS b ON a.id_produk = b.id_produk
            INNER JOIN category AS c ON b.id_kategori = c.id_category
            INNER JOIN brands AS d ON b.id_brand = d.id_brand`
            
            let rows = await asyncQuery(sql)

            res.status(200).send(rows)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addStokProduk: async(req,res) => {

        const {id_produk,jumlah_produk} = req.body

        try{
            let sql = `SELECT * from stok_produk WHERE id_produk = ${id_produk}`
            let rows = await asyncQuery(sql)
            
            if(rows.length) return res.status(400).send('Data Sudah Ada !')

            let sql2 = `INSERT INTO stok_produk(id_produk,jumlah_produk) VALUES(${id_produk},${jumlah_produk})`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send("Add Telah Berhasil !")

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteStokProduk: async(req,res) => {
        
        let id_stok_produk = parseInt(req.params.id)
        
        try{
            let sql = `DELETE FROM stok_produk WHERE id_stok_produk = ${id_stok_produk}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Delete Berhasil !")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editStokProduk: async(req,res) => {
        let id_stok_produk = parseInt(req.params.id)
        
        try{

            let sql = `SELECT * FROM stok_produk WHERE id_stok_produk = ${id_stok_produk}`
            let rows = await asyncQuery(sql)

            let tempStok = rows[0].jumlah_produk + parseInt(req.body.jumlah_produk)

            let sql2 = `UPDATE stok_produk set jumlah_produk = ${tempStok} WHERE id_stok_produk = ${id_stok_produk}`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send("Update Berhasil !")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}
