/* jshint node: true */
'use strict';

var passport = require('passport');
var User = require('../models').model('User');
var Blog = require('../models').model('Blog');

var post = {
  actions : {
    // GET
    // vistors can view all users posts
    allPosts : function (req, res) {
      // User.find().limit(30).exec().then(function (users) {
      //   // var allposts = [];
      //   // for (var i = 0; i < users.length; i++) {
      //   //   for (var j = 0; j < users[i].posts.length; j++) {
      //   //     allposts.push(users[i].posts[j]);
      //   //   }
      //   // }
      //   res.json(users);
      // }).catch(console.error);
    },

    // GET
    // user view all their own posts
    myPosts : function (req, res) {
    },

    // POST
    createPost : function (req, res) {
      var userID = req.session.passport.user;
      User.findById(userID).exec().then(function (user) {
        for (var i = 0; i < user.blogs.length; i++) {
          // console.log("this: " + req.body._id);
          if (user.blogs[i]._id == req.body._id) {
            console.log("found match!");
            Blog.findByIdAndUpdate( req.body._id, {
              $push: {
                posts: {
                  title: req.body.title,
                  text: req.body.text,
                }
              }
            }, {
              new: true
            }).exec();
            console.log("post published");
          } // end IF
        } // end FOR loop
      }).catch(function (e) {
        console.log(e);
      }).then(res.sendStatus(200));
    }, // end createPost

    // // POST
    // createPost : function (req, res) {
    //   var objID = req.session.passport.user;
    //   User.findById(objID).exec().then(function (user) {
    //     for (var i = 0; i < user.blogs.length; i++) {
    //       // console.log("this: " + req.body._id);
    //       if (user.blogs[i]._id == req.body._id) {
    //         console.log("found match!");
    //         Blog.findByIdAndUpdate( req.body._id, {
    //           $push: {
    //             posts: {
    //               title: req.body.title,
    //               text: req.body.text,
    //             }
    //           }
    //         }, {
    //           new: true
    //         }).exec();
    //         console.log("post published");
    //       } // end IF
    //     } // end FOR loop
    //   }).catch(function (e) {
    //     console.log(e);
    //   }).then(res.sendStatus(200));
    // }, // end createPost

    // PATCH
    // user can edit text of their post
    editPost : function (req, res) {
    }, // end editPost

    // DELETE
    // user can delete their post
    trash : function (req, res) {
    } // end trash
  } // end actions
};

module.exports = post;
