const bcrypt = require('bcrypt')
const {validationResult} = require ('express-validator')
const fs = require('fs')
const handlebars = require('handlebars')
const {asyncQuery, generateQuery} = require('../helpers/queryHelp')
const transporter = require('../helpers/nodeMailer')
const {createToken, verifyToken} = require('../helpers/jwt')

var salt = bcrypt.genSaltSync(10);

module.exports = {
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
    }