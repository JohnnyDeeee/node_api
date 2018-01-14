// Utils
var logging = require('./logging');
// Auth
var hashing = require('../auth/hashing');
// Models
var Group = require('../models/group');
var User = require('../models/user');

const groupNames = ['Group 1', 'Group 2', 'Group 3'];
const userNames = ["JohnDoe", "JaneDoe"];

/* Private functions */
// Creates default groups
function createDefaultGroup(){
    return new Promise(resolve => {
        groupNames.forEach(item => {
            Group.findOne({name: item}, (err, result) => { // Checks if the group doesnt already exists
                if(result) return resolve(logging.log("Default group '"+item+"' already exists!")); // Info
            
                new Group({
                  name: item
                }).save(err => { // Save new group to DB
                  if(err) return resolve(logging.error(err)); // Error
                  return resolve(logging.log("Created default group '"+item+"'!")); // Info
                });
            });
        })
    })
}

// Creates default users
function createDefaultUsers(){
    return new Promise(resolve => {
        Group.findOne({name: groupNames[0]}, (err, group) => {
            if(err) return resolve(logging.error(err)); // Error
            if(!group) return resolve(logging.error("Could not find group '"+groupNames[0]+"'"));
    
            userNames.forEach(item => {
                User.findOne({username: item}, (err, user) => { // Checks if user doesnt already exists
                    if(user) return resolve(logging.log("Default user "+item+" already exists!")); // Info
                    
                    hashing.hashPassword('password').then(password => { // Create password hash
                        new User({
                            username: item,
                            password: password,
                            group: group
                        }).save(err => { // Save new user to DB
                            if(err) return resolve(logging.error(err)); // Error`
                            return resolve(logging.log("Created default user "+item+"!")); // Info
                        });
                    });
                });
            });
        });
    });
}

/* Public functions */
// Creates some default documents for in the DB
function createDefaultInserts(){
    createDefaultGroup().then(
        createDefaultUsers
    );
}

module.exports = {
    createDefaultInserts: createDefaultInserts
}