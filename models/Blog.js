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

module.exports = mongoose.model('Blog', blogSchema);
