const db = require('../database')
const {createToken} = require('../helpers/jwt')
const {asyncQuery} = require('../helpers/queryHelp')

var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

module.exports = {
    login: async(req,res) => {

        let username = req.body.username
        let password = req.body.password
        
        try{
            let sql = `SELECT * FROM data_customer WHERE username = '${username}' `
            let rows = await asyncQuery(sql)

            if(rows.length === 0) return res.status(400).send("Username salah !")

            let hash = rows[0].password

            let hasil = await bcrypt.compare(password, hash)
            
            if(hasil === false) return res.status(400).send("Password salah !")
            
            const token = createToken({
                username: rows[0].username,
                id_user: rows[0].id_customer
            })

            let data = {
                username: rows[0].username,
                id_customer: rows[0].id_customer
            }

            data.token = token

            res.status(200).send(data)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    },
    keeplogin : async(req, res) => {   
        const {username, id_user} = req.user
        try{
            const sql = `SELECT * FROM data_customer WHERE username = '${username}' AND id_customer = '${id_user}' `
            const rows = await asyncQuery(sql)
            const data = {
                username: rows[0].username,
                id_customer: rows[0].id_customer
            }
            res.status(200).send(data)
        }
        catch(err){
            res.status(400).send('error' + err)
        }
    }
}

