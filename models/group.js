var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var groupSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Group', groupSchema);