const router = require("express").Router();
const path = require('path');
const userRoutes = require('./user')
const timesheetRoutes = require('./timesheet')
const punchRoutes = require('./punch')
const passport = require('passport');


router.use("/api/user", userRoutes)
router.use('/api/timesheet', timesheetRoutes)
router.use('/api/punch', punchRoutes)
// router.use('/login', loginRoute)

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  })

module.exports = router;
