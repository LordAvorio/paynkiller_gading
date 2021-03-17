const {asyncQuery, generateQuery} = require('../helpers/queryHelp')

module.exports = {
    getAllCate: async (req, res) => {
        try {
            const queryCate = 'SELECT * FROM category_obat'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    add: async (req, res) => {
        const {isi, parent_id} = req.body
        const parent_baru = parent_id || null
        try {
            const addQuery = `INSERT INTO category_obat (title, parent_id) VALUES ('${isi}', ${parent_baru})`
            await asyncQuery(addQuery)

            const queryCate = 'SELECT * FROM category_obat'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    delete: async (req, res) => {
        try {
            const deleteQuery = `DELETE FROM category_obat WHERE id_category = ${parseInt(req.params.id)}`
            await asyncQuery(deleteQuery)

            const queryCate = 'SELECT * FROM category_obat'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    editCate: async (req , res) => {
        try {
            const editQuery = `UPDATE category_obat SET${generateQuery(req.body)} where id_category = ${parseInt(req.params.id)}`
            await asyncQuery(editQuery)

            const queryCate = 'SELECT * FROM category_obat'
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    topNode: async (req , res) => {
        try {
            const nodeQuery = 'SELECT id_category, title FROM category_obat WHERE parent_id IS NULL'
            const result = await asyncQuery(nodeQuery)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
}