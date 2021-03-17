const bcrypt = require('bcrypt')
var salt = bcrypt.genSaltSync(10);

try {
    console.log( bcrypt.hash('mxdmxd', 10))
}
catch (err) {
    console.log(err)
}