const passport    = require('passport');
const passportJWT = require("passport-jwt");
const {User} = require('../models/User')
const {ExtractJwt} = require('passport-jwt')
const JWTStrategy = require('passport-jwt').Strategy;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "timeismoney",
  };

const jwtStrategy = new JWTStrategy(jwtOptions,
function (jwtPayload, cb) {
    //find the user in db if needed
    return User.findById(jwtPayload.id)
    .exec()
        .then(user => {
            return cb(null, user);
        })
        .catch(err => {
            return cb(err);
        });
}
)

const protected = passport.authenticate('jwt', { session: false });

module.exports = {jwtStrategy, protected}
