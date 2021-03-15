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
                username: rows[0].username
            })

            res.status(200).send(token)
        }
        catch(err){
            console.log(err)
            res.status(400).send(err)
        }
    }
}

