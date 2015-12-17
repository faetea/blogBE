var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../models/Blog');
var User = require('../models').model('User');

/* GET /blogs */
// list of all blogs from all authors, no auth
router.get('/', function (req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
    res.json(blogs);
  });
});


/* GET /blogs/mine */
// list of all blogs where author matches current-user
router.get('/mine', function (req, res, next) {
  var userID = req.session.passport.user;
  Blog.find().where({
    author: userID
  }).exec().then(function (blogs) {
    res.json(blogs);
  });
});


/* POST /blogs */
// creates a new blog object, how to make author_id current-user?
router.post('/', function (req, res, next) {
  var userID = req.session.passport.user;
  req.body.author = userID;
  Blog.create(req.body, function (err, blog) {
    if (err) return next(err);
    // Then push the Ref ID of the NEW Blog Obj onto the User Obj
    User.findByIdAndUpdate(userID, {
      $push: {
        blogs: blog._id
      }
    }).exec();
    res.json(blog);
  });
});


/* GET /blogs/id */
// shows specific blog
router.get('/:id', function (req, res, next) {
  Blog.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /blogs/:id */
// updates specific blog
router.put('/:id', function (req, res, next) {
  Blog.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


module.exports = router;
