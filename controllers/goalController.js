const db = require("../models");
const userModel = require("../controllers/userController")

// Defining methods for the GoalsController
module.exports = {
    findAll: function (req, res) {
        db.Goal
            .find()
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        console.log("who is logged in? ", req.user)
        // console.log(req._passport.session.user._id)
        db.Goal
            .find({ author: req.user._id })
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        console.log("passport: ", req._passport, req)
        // console.log("passport user ", req.user)
        req.body.author = req.user._id
        db.Goal.create(req.body)
            .then((dbModel) => {
                res.json(dbModel);
            })
            .catch(err => {
                res.json(err);
            });
    },
    update: function (req, res) {
        db.Goal
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateTask: function (req, res) {
        db.Goal
            .findOneAndUpdate({ "_id": req.body._id }, // Filter
                { $push: { Tasks: req.body.Tasks } }, // Update
                { new: true }
            )
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    updateTask: function (req, res) {
        db.Goal
            .findOneAndUpdate({ "_id": req.body._id }, // Filter
                { $push: { Tasks: req.body.Tasks } }, // Update
                { new: true }
            )
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    completeTask: function (req, res) {
        console.log("task ID: ", req.body)
        console.log("return: ", req.body.Tasks[0].completed)
        db.Goal
            .update(
                {},
                { $set: { "Tasks.$[complete].complete": req.body.Tasks[0].completed } },
                {
                    arrayFilters: [{ "complete._id": { $eq: req.body._id } }],
                    multi: true
                })
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    removeTask: function (req, res) {
        console.log("task ID: ", req.body._id)
        // console.log("return: ", req.body.Tasks[0].completed)
        db.Goal
            .update(
                {},
                { $pull: { Tasks: { "_id": { $eq: req.body._id } } } },
                {
                    multi: true
                })
            .then(dbModel => {
                console.log(dbModel)
                res.json(dbModel);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    },
    remove: function (req, res) {
        db.Goal
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};

