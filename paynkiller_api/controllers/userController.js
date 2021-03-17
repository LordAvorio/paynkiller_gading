const bcrypt = require('bcrypt')
const {validationResult} = require ('express-validator')
const fs = require('fs')
const handlebars = require('handlebars')
const {asyncQuery, generateQuery} = require('../helpers/queryHelp')
const transporter = require('../helpers/nodeMailer')
const {createToken, verifyToken} = require('../helpers/jwt')

var salt = bcrypt.genSaltSync(10);

const db = require('../database')

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
   register: async (req, res) => {
        const {username, email, password} = req.body
        
        const errors = validationResult(req)
        if(!errors.isEmpty()) return res.status(400).send(errors.array()[0].msg)
        // data_customer
        try {
            const cek = `SELECT * FROM data_customer WHERE username='${username}' 
            OR email='${email}'`
            const qcek = await asyncQuery(cek)
            if (qcek.length !== 0) return res.status(400).send('username/email has already been used')
            
            const hash = await bcrypt.hash(password, salt)
            const regis  = `INSERT INTO data_customer (username, password, email)
            VALUES ('${username}', '${hash}','${email}')`
            const qregis = await asyncQuery(regis)
            
            const token = createToken({username: username, id_user: qregis.insertId})
            const result = `SELECT id_customer, username, email, '${token}' as token FROM data_customer WHERE username='${username}'`
            const qresult = await asyncQuery(result)
            
            const option = {
                    from : 'admin <ezrayamin16@gmail.com>',
                    to : `${email}`,
                    subject: 'account verification',
                    text: ''
                }
                
                const emailFile = fs.readFileSync('./email/verify.html').toString()
                const template = handlebars.compile(emailFile)
                option.html = template({token: token, name: username})
                const info = await transporter.sendMail(option)
                // res.status(200).send(info.response)
                res.status(200).send(qresult[0])
            }
            catch (err) {
                res.status(400).send(err)
                console.log(err)
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
