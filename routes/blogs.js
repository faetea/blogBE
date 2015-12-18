var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../models/Blog');
var User = require('../models').model('User');

/* GET /blogs */
// list of all blogs from all authors, not logged in
router.get('/', function (req, res, next) {
  Blog.find(function (err, blogs) {
    if (err) return next(err);
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
  Blog.findById(req.params.id, function (err, blog) {
    if (err) return next(err);
    res.json(blog);
  });
});

/* PUT /blogs/:id */
// updates specific blog
router.put('/:id', function (req, res, next) {
  var userID = req.session.passport.user;
  req.body.author = userID;
  User.findById(userID).exec().then(function (user) {
    // does current-user exist
    if (user._id == userID) {
      Blog.findById(req.params.id).exec().then(function (blog) {
        // does current-blog belong to current-user
        if (blog.author == userID) {
          Blog.update({ _id : blog._id }, req.body ).exec().then(function (blog) {
            console.log('blog being updated:', blog.toJSON());
            res.json(blog);
          }).catch(console.error);
        } else {
          res.sendStatus(403);
        }
      }).catch(console.error);
    }
  }).catch(console.error);
});


module.exports = router;




