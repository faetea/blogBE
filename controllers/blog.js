/* jshint node: true */
'use strict';

var passport = require('passport');
var User = require('../models').model('User');

var blog = {
  actions : {
    // GET
    // vistors can view all users blogs
    allBlogs : function (req, res) {
      User.find().limit(30).exec().then(function (users) {
        // var allBlogs = [];
        // for (var i = 0; i < users.length; i++) {
        //   for (var j = 0; j < users[i].blogs.length; j++) {
        //     allBlogs.push(users[i].blogs[j]);
        //   }
        // }
        res.json(users);
      }).catch(console.error);
    },

    // GET
    // user view all their own blogs
    myBlogs : function (req, res) {
      var objID = req.session.passport.user;
      User.findById(objID).exec().then(function (user) {
        console.log(user.blogs);
        res.json(user.blogs);
      }).catch(console.error);
    },

    // POST
    createBlog : function (req, res) {
      var objID = req.session.passport.user;
      User.findByIdAndUpdate(objID, {
        $push: {
          blogs: {
            title: req.body.title,
            description: req.body.description,
          }
        }
      }, {
        new: true
      }).exec().then(function (user) {
        console.log(user.toJSON());
      }).catch(console.error).then(res.sendStatus(200));
    }, // end createBlog

    // PATCH
    // user can edit description of their blog
    editBlog : function (req, res) {
      var objID = req.session.passport.user;
      var description = req.body.description;
      var itemID = req.body._id;
      User.update( {
        _id: objID, 'blogs._id': itemID
      }, {
        '$set': {
          'blogs.$.description': description
        }
      }).exec().then(function (user) {
        console.log(user);
      }).catch(console.error).then(res.sendStatus(200));
    }, // end editBlog

    // DELETE
    // user can delete their blog
    trash : function (req, res) {
      var objID = req.session.passport.user;
      var itemID = req.body._id;
      User.findByIdAndUpdate(objID, {
        $pull: {
          blogs: {
            _id: itemID
          }
        }
      }).exec().then(function (user) {
        console.log(user.toJSON());
      }).catch(console.error).then(res.sendStatus(204));
    } // end trash
  } // end blog actions
};

module.exports = blog;
