/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
  title:  String,
  content:   String,
  updated_at: { type: Date, default: Date.now },
}, { minimize: false });

var blogSchema = new Schema({
  title:  String,
  description: String,
  author: Schema.ObjectId,
  posts: [postSchema],
}, { minimize: false });

module.exports = mongoose.model('Blog', blogSchema);
