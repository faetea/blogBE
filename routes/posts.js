var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Blog = require('../models/Blog');
var User = require('../models').model('User');


/* GET /posts */
// show posts of blog
router.get('/', function (req, res, next) {
  Blog.findById(req.query.blogId, function (err, blog) {
    if (err) return next(err);
    if(blog !== null) {
      res.json({posts: blog.posts});
    } else {
      res.json({posts: []});
    }
  });
});


module.exports = router;
