const router = require("express").Router();
const punchController = require("../controllers/punch");
const passport = require('passport');
const {mgrJwtStrategy} = require('../middleware/manager-jwt')
const {protected, jwtStrategy} = require('../middleware/jwt')
passport.use('mgr', mgrJwtStrategy);
passport.use(jwtStrategy);

// Matches with "/api/punch"
router.route("/")
  .post(passport.authenticate('mgr', { session: false }), punchController.create);

// Matches with "/api/punch/:id"
router
  .route("/:id")
  .put(protected, punchController.update)
  .delete(passport.authenticate('mgr', { session: false }), punchController.remove);
router
  .route('/upsert/:timesheetId')
  .put(passport.authenticate('mgr', {session: false}), punchController.upsert)
module.exports = router;