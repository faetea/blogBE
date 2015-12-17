/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title:  String,
  content:   String,
  updated_at: { type: Date, default: Date.now },
});

var blogSchema = new Schema({
  title:  String,
  description: String,
  author: Schema.ObjectId,
  posts: [postSchema],
});

// var Blog = mongoose.model('Blog', blogSchema);
// module.exports = Blog;
module.exports = mongoose.model('Blog', blogSchema);


// Finding a sub-document
// Each document has an _id. DocumentArrays have a special id method for looking up a document by its _id.
// var doc = parent.children.id(id);
