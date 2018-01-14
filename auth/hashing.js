var bcrypt = require('bcrypt');
// Utils
var logging = require('../util/logging');

const saltRounds = 10;

/* Public functions */
// Hashes a plain password with bcrypt
function hashPassword(password){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err)
                return logging.error(err);
            
            resolve(hash);
        });
    })
}

module.exports = {
    hashPassword: hashPassword
}