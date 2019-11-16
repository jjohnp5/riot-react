const passport    = require('passport');
const passportJWT = require("passport-jwt");
const {User} = require('../models/User')
const {ExtractJwt} = require('passport-jwt')
const JWTStrategy = require('passport-jwt').Strategy;


const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "timeismoney",
  };

const mgrJwtStrategy = new JWTStrategy(jwtOptions,
function (jwtPayload, cb) {
    console.log(jwtPayload);
    //find the user in db if needed
    return User.findById(jwtPayload.id)
        .exec()
        .then(user => {
            if(jwtPayload.position < 2){
                return cb(null, false)
            }else{
                return cb(null, user)
            }
                
        })
        .catch(err => {
            return cb(err);
        });
}
)



module.exports = {mgrJwtStrategy}
