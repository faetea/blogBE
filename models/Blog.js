/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title:  String,
  body:   String,
  createdAt: { type: Date },
  hidden: Boolean,
  author: String,
  comments: [{ body: String, date: Date, author: String }],
  meta: {votes: Number, favs:  Number},
});

var blogSchema = new Schema({
  title:  String,
  author: String,
  description: String,
  posts: [postSchema],
});

module.exports = blogSchema;

// Finding a sub-document
// Each document has an _id. DocumentArrays have a special id method for looking up a document by its _id.
// var doc = parent.children.id(id);
