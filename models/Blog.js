/*jshint node: true */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  title:  String,
  content: String,
  author: Schema.ObjectId,
  authorName: String,
  updated_at: { type: Date, default: Date.now },
}, { minimize: false });

module.exports = mongoose.model('Blog', blogSchema);
