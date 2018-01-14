var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

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
    },
    group: [{
        type: ObjectId,
        ref: 'Group'
    }]
});

module.exports = mongoose.model('User', userSchema);