const {User} = require('../models/User');
const Timesheet = require('../models/Timesheet')
const bcrypt = require('bcrypt')

module.exports = {
    findAll: function(req, res) {
      User
        .find()
        .sort({ employeeNum: 1 })
        .populate({
          path: 'timesheets',
          populate: {
            path: 'punch'
          }
        })
        .then(UserModel => res.json(UserModel))
        .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
      User
        .findById(req.params.id)
        .then(UserModel => res.json(UserModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
      User
        .create({...req.body, password: hash})
        .then(UserModel => res.json(UserModel))
        .catch(err => res.status(422).json(err));
      })
    },
    update: function(req, res) {
      User
        .findOneAndUpdate({ _id: req.params.id }, req.body)
        .then(UserModel => res.json(UserModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      User
        .findById({ _id: req.params.id })
        .then(UserModel => UserModel.remove())
        .then(UserModel => res.json(UserModel))
        .catch(err => res.status(422).json(err));
    }
  };
  