var express = require('express');
var router = express.Router();

/* GET blog */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next){
  var blogContent = req.body;
  var blogId = req.body._id;
  var blogTitle = req.body.title;
  var description = req.body.description;
});

module.exports = router;
