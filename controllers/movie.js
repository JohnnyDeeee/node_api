var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var Movie = require('../models/movie');
var actorController = require('./actor');
var logging = require('../util/logging');

// Returns all users
exports.listAll = (req, res) => {
    Movie.find({}, (err, movies) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            res.json(movies);
        }
    })
}

// Returns movies with specific actor
exports.findByActor = (req, res) => {
    Movie.find({actors: req.params.actorID}, (err, actor) => {
        if(err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(actor);
        }
    });
}

// Creates a new movie
exports.create = (req, res) => {
    // TODO: Param validation

    var newMovie = new Movie({
        name: req.body.name // required
    });
    if(req.body.actors) // TODO: Make actors required
        newMovie.actors = updateActors(req.body.actors, newMovie._id.toString());
    newMovie.save((err, movie) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(movie);
        }
    });
}

// Updates movie info
exports.update = (req, res) => {
    // TODO: Param validation
    var newMovie = new Movie({
        _id: req.params.movieID
    });
    if(req.body.name) // Update name
        newMovie.name = req.body.name;
    if(req.body.actors) // Update actors
        newMovie.actors = updateActors(req.body.actors, newMovie._id.toString());
    Movie.findByIdAndUpdate(req.params.movieID, newMovie, {new: true}, (err, movie) => {
        if (err) {
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json(movie);
        }
    });
}

// Delete a movie
exports.delete = (req, res) => {
    Movie.findByIdAndRemove(req.params.movieID, (err, movie) => {
        if (err){
            logging.error(err);
            return res.status(400).json({ message: err });
        }else{
            return res.json({ message: "Movie deleted!" });
        }
    })
}

// Adds actor to an movie (not called from any route, used internal)
exports.addActorToMovie = (movieID, actorID) => {
    Movie.findByIdAndUpdate(movieID, {$push: {actors: actorID}}, (err, movie) => {
        if(err) logging.error(err);
    });
}

/* Private functions */
function updateActors(actors, movieID){
    actorIDs = [];
    actors.split(',').forEach(actor => {
        const actorID = actor.trim(); // Use trim to remove whitespaces

        // TODO: Check if actor id is a valid movie

        actorIDs.push(actorID); // Add actors to movie 

        // Add this movie to actor(s)
        actorController.addMovieToActor(actorID, movieID);
    });

    return actorIDs;
}