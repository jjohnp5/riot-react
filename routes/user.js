const router = require("express").Router();
const userController = require("../controllers/user");
const passport = require('passport');
const {mgrJwtStrategy} = require('../middleware/manager-jwt')
const {protected, jwtStrategy} = require('../middleware/jwt')
// const loginRoute = require('./login')
passport.use('mgr', mgrJwtStrategy);
passport.use(jwtStrategy);

// Matches with "/api/user"
router.route("/")
  .get(passport.authenticate('mgr', { session: false }), userController.findAll)
  // .get(userController.findAll)
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(protected,userController.findById)
  .put(protected, userController.update)
  .delete(passport.authenticate('mgr', { session: false }),userController.remove);



module.exports = router;
