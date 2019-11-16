const {User} = require('../models/User');
const Timesheet = require('../models/Timesheet')
const {ExtractJwt} = require('passport-jwt');
const jwt = require('jsonwebtoken')


module.exports = {
    findAll: function(req, res) {
      User
        .findOne({employeeNum: req.params.id}).populate(
          {
            path: 'timesheets',
            populate: {
              path: 'punch'
            }

        })        
        .then(user=>{
          res.json(user.timesheets)
        })
        
        .catch(err => res.status(422).json(err));
    },
    findById: function(req,res){
      const currentUser = jwt.verify(req.headers.authorization.split(' ')[1], 'timeismoney')
      if(parseInt(req.params.id) === currentUser.employeeNum){
        User
        .findOne({employeeNum: req.params.id}).populate(
          {
            path: 'timesheets',
            populate: {
              path: 'punch'
            }

        })        
        .then(user=>{
          console.log(user)
          res.json(user.timesheets)
        })
        
        .catch(err => res.status(422).json(err));
      }else{
        res.status(401).json({message: 'You are unauthorized to access this resource'})
      }
      
    },
    create: function(req, res) {
      Timesheet.create(req.body.timesheet)
        .then(sheet=>{
            User.findOneAndUpdate({_id: req.params.userid}, {$push: {timesheet: sheet._id}})
                .then(user=>res.json(user))
                .catch(err=>res.status(422).json(err))
        }).catch(err=>res.status(422).json(err))
        
    },
    update: function(req, res) {
      Timesheet
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(TimesheetModel => res.json(TimesheetModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      Timesheet
        .findById({ _id: req.params.id })
        .then(tSheet => tSheet.remove())
        .then(tSheet => res.json(tSheet))
        .catch(err => res.status(422).json(err));
    }
  };
  