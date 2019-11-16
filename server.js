const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const apiRoutes = require('./routes')
const bcrypt = require('bcrypt')
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken')

require('dotenv').config();
const PORT = process.env.PORT || 3001;

app.use(passport.initialize());

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactproj");
const {User} = require('./models/User')
passport.use('employee', new LocalStrategy((username, password, done) => {
  console.log(password)
  User.findOne({
      employeeNum: username
  }).then(data => {
    console.log(data);
      const pw = data.password;
      bcrypt.compare(password, pw, (err, response) => {
          if (err) {
              console.log(err);
              return done(null, false, { message: 'Incorrect username or password' });
          }
          return done(null, data);
      })
  }).catch(err=>{
    res.status(501).json(err)
  })
}))



// Define API routes here
app.post('/login', (req,res)=>{
  passport.authenticate('employee', {session: false}, (err, user, info)=>{
    if (err || !user) {
      return res.status(401).json({
          err
      });
  }
  req.login(user, {session: false}, (err) => {
     if (err) {
         res.send(err);
     }
     console.log(user)
     // generate a signed son web token with the contents of user object and return it in the response
     const token = jwt.sign({id:user._id, position: user.position, employeeNum: user.employeeNum, firstName: user.firstName, lastName: user.lastName}, 'timeismoney');
     return res.json({token});
  });

  })(req,res)
  
})

app.use(apiRoutes)
// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});
