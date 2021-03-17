const jwt = require('jsonwebtoken')
const TOKEN_KEY= process.env.TOKEN_KEY

module.exports = {
    createToken: (data) => {
        return jwt.sign(data, TOKEN_KEY)
    },
    verifyToken: (req, res, next) => {
        const token = req.body.token
        // console.log('jwt token:', token)
        if (!token) return res.status(400).send('no token available')
        try {
            // verify token
            const result = jwt.verify(token, TOKEN_KEY)
            console.log('result:', result)
            // add token to req.user
            req.user = result
            // lanjut ke proses berikutnya
            next()
        }
        catch(err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}