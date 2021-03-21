const db = require('../database')
const transporter = require('../helpers/nodemailer')
const { validationResult } = require('express-validator')

const bcrypt = require('bcrypt')
const fs = require('fs')
const handlebars = require('handlebars')
const {asyncQuery, generateQuery} = require('../helpers/queryHelp')
const {createToken, verifyToken} = require('../helpers/jwt')

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
    },
    forgotPass: async(req, res) => {
        const {email} = req.body
        try{
            const sql = `SELECT * FROM data_customer WHERE email = '${email}'`
            const rows = await asyncQuery(sql)
            if (rows.length === 0) return res.status(400).send('email tidak di temukan')
            let username = rows[0].username
            // create token
            const token = createToken({
                username: rows[0].username,
                id_user: rows[0].id_customer
            })
            // send mail forgotPass
            const option = {
                from: `admin <andhika.jeremia@gmail.com>`,
                to: 'emailsampahnyague287@gmail.com',
                subject: 'Forgot Password',
                text: '',
                attachments: [{
                    filename: 'paynkiller.svg',
                    path: __dirname + '/images/logo/paynkiller.png',
                    cid:'paynkiller'
                }],
            }
            const fileEmail = fs.readFileSync('./file_email/index.html').toString()

            const template = handlebars.compile(fileEmail)
            option.html = template({token : token, nama: username})
            const info = await transporter.sendMail(option)
            res.status(200).send('Email Sended')
        }
        catch(err){
            res.status(400).send('error' + err)
        }
    },
    changePass: async(req,res) => {
        const {username, id_user} = req.user
        const {password} = req.body
        let errors = validationResult(req)
        console.log(errors)
        const msg = errors.array().map(
            (item) => item.msg
        )
        if (!errors.isEmpty()) {
            return res.status(400).send(msg)
        }
        try{
            const sql = `SELECT * FROM data_customer WHERE username = '${username}' AND id_customer = '${id_user}' `
            const rows = await asyncQuery(sql)
            if(!rows) return res.status(400).send('there is no account')
            // update password
            const hash = await bcrypt.hashSync(password, salt)
            console.log(hash)
            const sql2 = `UPDATE data_customer SET password = '${hash}' WHERE username = '${rows[0].username}' AND id_customer = '${rows[0].id_customer}'`
            const rows2 = await asyncQuery(sql2)
            res.status(200).send('Password Changed')
        }
        catch(err){
            res.status(400).send('error' + err)
        }
    }
}
