const util = require('util')
const db = require('../database')

module.exports = {
    asyncQuery: util.promisify(db.query).bind(db),
    generateQuery: (query) => {
        let result = ''
        for(let property in query){
            result += ` ${property} = ${db.escape(query[property])},`
        }
        return result.slice(0, -1)
    }
}