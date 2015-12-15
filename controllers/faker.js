/* jshint node: true */
'use strict';

var passport = require('passport');

var faker = {
    blogs : {
        get : function (req, res) {
          var fakeBlogs = [
            {
              id: 1,
              title: "My First Blog",
              category: "cooking",
              description: "A new recipe walk through each week",
              username: "cookingmamma",
            },
            {
              id: 2,
              title: "Space Lizards",
              category: "sci-fi",
              description: "My favorite books and video games",
              username: "rocketgirl",
            },
            {
              id: 3,
              title: "Board Games",
              category: ["horror", "collector", "nerdy"],
              description: "Board Game reviews",
              username: "classicGamer",
            },
          ];
          res.json(fakeBlogs);
        },
    },
};

module.exports = faker;


// Ember.$.getJSON('http://localhost:3000/fake').then(function(data) {
//     console.log(data);
// });
