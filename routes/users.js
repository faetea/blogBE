var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
var Blog = require('../models/Blog');
//var User = require('../models').model('User');

// /* GET users */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

/* GET /users/blogs */
// list of all blogs where author matches current-user
router.get('/blogs', function (req, res, next) {
  var userID = req.session.passport.user;
  Blog.find().where({
    author: userID
  }).exec().then(function (blogs) {
    res.json(blogs);
  });
});

module.exports = router;
