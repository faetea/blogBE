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
    res.json({blogs:blogs});
  });
});

/* POST /blogs */
// creates a new blog object
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

// /* DELETE /blogs/:id */
// router.delete('/:id', function (req, res, next) {
//   var userID = req.session.passport.user;
//   req.body.author = userID;

//   Blog.findByIdAndRemove(req.params.id, req.body, function (err, blog) {
//     if (err) return next(err);
//     res.json(blog);
//   });
// });


// need to show all posts of a specific blog
// need to show single post of blog

/* GET /blogs/:id/posts */
// show a post object
// router.get('/:id/posts', function (req, res, next) {
//   var userID = req.session.passport.user;
//   User.findById(userID).exec().then(function (user) {
//     // does current-user exist
//     if (user._id == userID) {
//       Blog.findById(req.params.id).exec().then(function (blog) {
//         // does current-blog belong to current-user
//         if (blog.author == userID) {
//           // wrap -- content
//           // content -- wrap
//         } else { res.sendStatus(403); }
//       }).catch(console.error);
//     }
//   }).catch(console.error);
// });



/* POST /blogs/:id/posts */
// creates a new post object
router.post('/:id/posts', function (req, res, next) {
  var userID = req.session.passport.user;
  User.findById(userID).exec().then(function (user) {
    // does current-user exist
    if (user._id == userID) {
      Blog.findById(req.params.id).exec().then(function (blog) {
        // does current-blog belong to current-user
        if (blog.author == userID) {
          // wrap -- content
          Blog.findByIdAndUpdate(req.params.id, {
            $push: {
              posts: {
                title: req.body.title,
                content: req.body.content,
              }
            }
          }, { new: true }
          ).exec().then(function (post) {
            //console.log(post.toJSON());
            //res.json(post);
            res.sendStatus(418);
          }).catch(console.error);
          // content -- wrap
        } else { res.sendStatus(403); }
      }).catch(console.error);
    }
  }).catch(console.error);
});


module.exports = router;
