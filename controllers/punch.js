const Punch = require('../models/Punch')
const Timesheet = require('../models/Timesheet')
const {User} = require('../models/User');
const moment = require('moment')

module.exports = {
    create: function(req, res) {
        User.find({employeeNum: req.body.id})
            .then(user=>{
                Timesheet
                    .find({employeeNum: user.employeeNum})
                    .sort({addedDate:-1})
                    .then(timesheet=>{

                        if(timesheet[0] && timesheet[0].punch.length < 2){
                            Punch.create({...req.body.punch, punchType: "Out"}).then(pun=>{
                                console.log(pun)
                                Timesheet.findOneAndUpdate({_id: timesheet[0]._id}, {$push:{punch: pun._id}}).exec()
                                .then(pun=>{
                                    return res.json(pun)
                                })
                            })
                        
                            
                        }else{
                            Timesheet.create({employeeNum: user._id})
                            .then(ts=>{
                                Punch.create(req.body.punch)
                                    .then(pun=>{
                                        console.log(pun)
                                        Timesheet.findOneAndUpdate({_id: ts._id}, {$push: {punch: pun._id}}).exec()

                                        User.findOneAndUpdate({_id: user[0]._id}, {$push: {timesheets: ts._id}}).exec().then(u=>{
                                            return res.json(u)
                                        })
                                        
                                    })
                            })
                        }
            })
        })
        
    },
    update: function(req, res) {
      Punch
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(punch => res.json(punch))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      Punch
        .findById({ _id: req.params.id })
        .then(punch => punch.remove())
        .then(punch => res.json(punch))
        .catch(err => res.status(422).json(err));
    },
    upsert: function(req,res){
        console.log(req.body)
        if(req.body.updatePunch){
            Punch.findOneAndUpdate({_id: req.body.punch._id}, req.body.punch)
                .then(punch=>{
                    console.log(punch)
                    return res.json(punch)
                })
        }else{
            Punch.create(req.body.punch)
                .then(punch=>{
                    console.log(punch)
                    Timesheet.findOneAndUpdate({_id: req.params.timesheetId}, {$push: {punch: punch._id}}).exec()
                        .then(d=>res.json(punch))
                        .catch(err=>res.status(422).json(err))
                })                
                .catch(err=>res.status(422).json(err))
        }
    }
  };
  