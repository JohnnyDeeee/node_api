var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Actor = require('../models/actor');
var logging = require('../util/logging');
var movieController = require('./movie');

// Returns all actors
exports.listAll = (req, res) => {
    Actor.find({}, (err, actors) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(actors);
        }
    })
}

// Return specific actor
exports.listOne = (req, res) => {
    Actor.find({ _id: req.params.actorID }, (err, actor) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(actor);
        }
    });
}

// Creates a new actor
exports.create = (req, res) => {
    // TODO: Param validation

    var newActor = new Actor({
        name: req.body.name // required
    });
    if(req.body.movies) // Update movies
        newActor.movies = updateMovies(req.body.movies, newActor._id.toString());
    newActor.save((err, actor) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(actor);
        }
    });
}

// Update an actor
exports.update = (req, res) => {
    var newActor = new Actor({
        _id: req.params.actorID,
    });
    if(req.body.name) // Update name
        newActor.name = req.body.name;
    if(req.body.movies) // Update movies
        newActor.movies = updateMovies(req.body.movies, newActor._id.toString());
    Actor.findByIdAndUpdate(req.params.actorID, newActor, {new: true}, (err, actor) => {
        if (err){
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(actor);
        }
    });
}

// Delete an actor
exports.delete = (req, res) => {
    Actor.findByIdAndRemove(req.params.actorID, (err, actor) => {
        if (err){
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json({ message: "Actor deleted!" });
        }
    });
}

// Adds movie to an actor (not called from any route, used internal)
exports.addMovieToActor = (actorID, movieID) => {
    Actor.findByIdAndUpdate(actorID, {$push: {movies: movieID}}, (err, actor) => {
        if(err) logging.error(err);
    });
}

/* Private functions */
function updateMovies(movies, actorID){
    movieIDs = [];
    movies.split(',').forEach(movie => {
        const movieID = movie.trim(); // Use trim to remove whitespaces

        // TODO: Check if movie id is a valid movie

        movieIDs.push(actorID); // Add movies to actor 

        // Add actorID to movie's actors[]
        movieController.addActorToMovie(movieID, actorID);
    });

    return movieIDs;
}