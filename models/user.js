var bcrypt = require('bcrypt');
var logging = require('../util/logging');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const saltRounds = 10;

var userSchema = new Schema({
    id: ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Creates a password hash from the given stringf
userSchema.methods.createPasswordHash = function(plainPassword) {
    return bcrypt.hashSync(plainPassword, saltRounds);
}

// Compares a string with its hash
userSchema.methods.checkPassword = function(passwordHash) {
    return bcrypt.compareSync(passwordHash, this.password);
}

module.exports = mongoose.model('User', userSchema);