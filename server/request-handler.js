var bcrypt = require('bcrypt-nodejs');
var util = require('./utility');
var mongoose = require('mongoose');
var request = require('request');
var db = require('./db/database');
var Job = require('./db/models/job');
var Client = require('./db/models/client');
var request = require('request');
var User = require('./db/models/user');
var Task = require('./db/models/task');
var jwt = require('jwt-simple');
var Q = require('q');

exports.fetchTasks = function (req, res) {
  Task.find({job: req.params.id})
     .populate('job')
     .exec(function (err, tasks) {
       if(err) {
        res.send(500, err);
       } else {
        res.send(tasks);
       }
     });
};

exports.addTask = function (req, res) {
  console.log(req);
  var newTask = new Task({
    user: req.session.user._id,
    job: req.body.job,
    name: req.body.name,
    start: Date.now()
  });
  newTask.save(function (err, newTask) {
    if (err) {
      res.send(500, err);
      console.log('error adding/saving task');
    } else {
      console.log('added new task: ', newTask);
      res.send(200, newTask);
    }
  });
};

exports.stopTimer = function (req, res) {
  Task.findOneAndUpdate({_id: req.body._id}, {end: Date.now()}, function (err, task) {
    if (err) return res.send(500, err);
  });
};

/*
fetchClients is called when /clients path receives get request
Finds all clients in the database and responds with result of query
*/
exports.fetchClients = function (req, res) {
  Client.find({user: req.session.user._id})
    .exec(function (err, clients) {
      res.send(200, clients);
  });
};

/*
Builds new Client document with request properties and saves it to the db
*/
exports.addClient = function (req, res) {
  var newClient = new Client({
    user: req.session.user._id,
    name: req.body.name,
    address: req.body.address,
    phone: req.body.phone
  });
  newClient.save(function (err, newClient) {
    if (err) {
      res.send(500, err);
      console.log('error adding/saving client');
    } else {
      console.log('added new client: ', newClient);
      res.send(200, newClient);
    }
  });
};

/*
fetchJobs is called when /jobs path receives get request
Finds all jobs in the database, replaces client_id with an object that include client Id and name
Responds with result of query
*/
exports.fetchJobs = function (req, res) {
  Job.find({user: req.session.user._id})
     .populate('client', 'name')
     .exec(function (err, jobs) {
       if(err) {
        res.send(500, err);
       } else {
        res.send(jobs);
       }
     });
};

/*
Builds new Job document with request properties and saves it to the db
*/
exports.addJob = function (req, res) {
  //call createJobDoc first to find client id to use to create job document
  console.log('req body in addJob: ', req.body);
  //check if id already exists
  Job.findById(req.body._id, function (err, job) {
    if (err) {
      console.error("error");
    } else {
      util.createOrUpdateJob(req, res, job);
    }
  });
};

/*
loginUser is called when /login receives post request
Determines if user exists in db; if not, redirects to /signup
If user exists, sends get request with custom options to toggl api
Receives all toggl info for later use, and creates user session
*/
exports.loginUser = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  // var auth = "Basic " + new Buffer(email + ":" + password).toString("base64");
  // var options = {
  //   url: 'https://www.toggl.com/api/v8/me',
  //   headers: {
  //     "Authorization": auth
  //   }
  // };

  User.findOne({ email: email })
    .exec(function (err, user) {
      if (user === null) {
        res.redirect('/signup');
      } else {
        // request.get(options, function (err, resp, body) {
        //   if (err) {
        //     return console.error('get failed:', err);
        //   }
        //   console.log('Request successful!  Server responded with:', body);
        //   util.createSession(req, res, user);
        // });
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            console.error('Passwords did not match:', err);
            console.log('Redirecting back to login page...');
            res.redirect('/login');
          } else {
            // util.createSession(req, res, user);
            var token = jwt.encode(user, 'nyan cat');
            res.json({token: token});
          }
        })
      }
  });
};

/*
signupUser is called when /signup receives post request
Determines if user exists in db; if not, adds user to db
Post request is then sent to toggle api to register user account
Api token is taken from toggl resp to build new User document, then saves it
If save is successful, new user session is created
If user exists, redirect to /login
*/
exports.signupUser = function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  // var options = {
  //   headers: {'Content-Type': 'application/json'},
  //   url: 'https://www.toggl.com/api/v8/signups',
  //   body: '{"user":{"email":"'+email+'","password":"'+password+'"}}'
  // };
  // console.log('start of signup user req handler ', req.body);

  User.findOne({ email: email })
    .exec(function (err, user) {
      if (user === null) {
        // request.post(options, function (err, resp, body) {
        //   if (err || body.length === 36) {
        //   // If the response body is 'User with this email already exists';
        //   // Won't work any other way, unfortunately
        //     console.error('upload failed:', body);
        //     res.redirect('/login');
        //   } else {
        //     parsed = JSON.parse(body);
        //     console.log('Request successful! Server responded with:', parsed);
        //     var newUser = new User({
        //       email: email,
        //       password: password,
        //       api_token: parsed.data.api_token
        //     });
        //     newUser.save(function (err, newUser) {
        //       if (err) {
        //         return console.error('upload failed:', err);
        //       } else {
        //         console.log(newUser);
        //         util.createSession(req, res, newUser);
        //       }
        //     });
        //   }
        // });
        
        var newUser = new User({
          email: email,
          password: password
        });

        newUser.save(function (err, user) {
          if (err) {
            return console.error('Saving user to db failed');
          } else {
            // console.log(user);
            // util.createSession(req, res, user);
            var token = jwt.encode(user, 'nyan cat');
            res.json({token: token});
          }
        });        
      } else {
        console.log('Account already exists');
        res.redirect('/login');
      }
    });
};

exports.checkAuth = function (req, res, next) {
  // checking to see if the user is authenticated
  // grab the token in the header is any
  // then decode the token, which we end up being the user object
  // check to see if that user exists in the database
  var token = req.headers['x-access-token'];
  if (!token) {
    next(new Error('No token'));
  } else {
    var user = jwt.decode(token, 'nyan cat');
    var findUser = Q.nbind(User.findOne, User);
    findUser({username: user.username})
      .then(function (foundUser) {
        if (foundUser) {
          res.send(200);
        } else {
          res.send(401);
        }
      })
      .fail(function (error) {
        next(error);
      });
  }
};
