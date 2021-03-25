const {
    asyncQuery,
    generateQueryBody
} = require('../helpers/queryHelp')

module.exports = {
    getStokRawMaterial: async(req,res) => {
        try{
            let sql = `SELECT a.*,
            b.kode_bahan_baku,b.nama_bahan_baku,b.harga_bahan_baku,b.deskripsi_bahan,b.total_kapasitas,
            c.nama_uom
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom`

            let rows =  await asyncQuery(sql)

            res.status(200).send(rows)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    addStokRawMaterial: async(req,res) => {

        const {id_bahan,jumlah_botol} = req.body

        try{
            let sql = `SELECT * FROM stok_bahan_baku WHERE id_bahan = ${id_bahan}`
            let rows = await asyncQuery(sql)
            if(rows.length === 1) return res.status(400).send("Stok sudah ada !")

            let sql2 = `SELECT a.*, b.nama_uom FROM bahan_baku a
            LEFT JOIN uom AS b ON a.id_uom = b.id_uom
            WHERE id_bahan_baku = ${id_bahan}`
            let rows2 = await asyncQuery(sql2)
            
            let total_bahan = rows2[0].total_kapasitas*parseInt(jumlah_botol)

            let sql3 = `INSERT INTO stok_bahan_baku (id_bahan,jumlah_botol,total_bahan) VALUES (${id_bahan},${jumlah_botol},${total_bahan})`
            let rows3 = await asyncQuery(sql3)

            res.status(200).send(rows3[0])
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    deleteStokRawMaterial: async(req,res) => {
        
        let id_stok_bahan = parseInt(req.params.id)

        try{
            let sql = `DELETE FROM stok_bahan_baku WHERE id_stok_bahan = ${id_stok_bahan}`
            let rows = await asyncQuery(sql)

            res.status(200).send("Delete Berhasil !")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    editStokRawMaterial: async(req,res) => {

        let id_stok_bahan = parseInt(req.params.id)


        try{

            let sql = `SELECT a.*,
            b.kode_bahan_baku,b.nama_bahan_baku,b.harga_bahan_baku,b.deskripsi_bahan,b.total_kapasitas,
            c.nama_uom
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom
            WHERE id_stok_bahan = ${id_stok_bahan}`
            let rows = await asyncQuery(sql)

            let tempStok = rows[0].jumlah_botol + parseInt(req.body.jumlah_botol)
            let total_bahan = parseInt(tempStok)*rows[0].total_kapasitas

            let sql2 = `UPDATE stok_bahan_baku set 
            jumlah_botol = ${tempStok},
            total_bahan = ${total_bahan}
            WHERE id_stok_bahan = ${id_stok_bahan}`
            let rows2 = await asyncQuery(sql2)

            res.status(200).send("Update Berhasil !")
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    selectPickerRawMaterial: async(req,res) => {
        try{
            let sql = `SELECT a.*,
            b.nama_bahan_baku,b.total_kapasitas,
            c.nama_uom,
            CONCAT(b.nama_bahan_baku," (",c.nama_uom,")") AS bahan_baku_keterangan
            FROM stok_bahan_baku a
            INNER JOIN bahan_baku AS b ON a.id_bahan = b.id_bahan_baku
            INNER JOIN uom AS c ON b.id_uom = c.id_uom`

            let rows = await asyncQuery(sql)

            res.status(200).send(rows)

        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}
