var express = require('express');
var router = express.Router();
var authCtrl = require('../controllers/auth');
var ctrl = require('../controllers/main');
var faker = require('../controllers/faker');

/* GET home page. */
router.get('/', authCtrl.root.get);
// router.route('/').
//   get(ctrl.root.get);

/* AUTH ROUTES
 * a login route using `passport.authenticate`
 * a register route NOT using passport */

router.route('/login').
  get(authCtrl.deny).
  post(authCtrl.login.post).
  all(authCtrl.login.all);

router.route('/logout').
  all(authCtrl.logout.all);

router.route('/changePassword').
  get(authCtrl.deny).
  patch(authCtrl.changePassword.patch);

router.route('/signup').
  get(authCtrl.deny).
  post(authCtrl.signup.post);

router.route('/doStuff').
  get(ctrl.doStuff.get).
  put(ctrl.doStuff.put).
  patch(ctrl.doStuff.patch).
  delete(ctrl.doStuff.delete).
  all(ctrl.doStuff.default);

router.route('/fake').
  get(faker.blogs.get);

module.exports = router;

