var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var movieSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
    },
    actors: [{
        type: ObjectId,
        ref: 'Actor'
    }]
});

module.exports = mongoose.model('Movie', movieSchema);