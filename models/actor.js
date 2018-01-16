var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var actorSchema = new Schema({
    id: ObjectId,
    name: {
        type: String,
        required: true,
    },
    movies: [{
        type: ObjectId,
        ref: 'Movie'
    }]
});

module.exports = mongoose.model('Actor', actorSchema);