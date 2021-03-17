const nodemailer = require('nodemailer')
const code = process.env.NODEMAILER

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth: {
        user: 'ezrayamin16@gmail.com',
        pass: code
    },
    tls : {
        rejectUnauthorized: true
    }
})

module.exports = transporter