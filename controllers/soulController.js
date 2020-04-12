const db = require("../models");

// Defining methods for the soulController
module.exports = {
    findAll: function (req, res) {
        db.Soul
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Soul
            .find({ author: req._passport.session.user._id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        req.body.author = req._passport.session.user._id
        console.log(req._passport.session.user._id)
        db.Soul.create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    update: function (req, res) {
        db.Soul
            .findOneAndUpdate(
                { _id: req.params.id },
                { $push: { Time: req.body } },
                { new: true, runValidators: true }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Soul
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};


// // Setup stuff
// var query = { /* query */ },
//     update = { expire: new Date() },
//     options = { upsert: true };

// // Find the document
// Model.findOneAndUpdate(query, update, options, function (error, result) {
//     if (!error) {
//         // If the document doesn't exist
//         if (!result) {
//             // Create it
//             result = new Model();
//         }
//         // Save the document
//         result.save(function (error) {
//             if (!error) {
//                 // Do something with the document
//             } else {
//                 throw error;
//             }
//         });
//     }
// });