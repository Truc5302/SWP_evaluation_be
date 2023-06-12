const semester = require('../models/semester.model');

exports.getAll = function(req, res) {
    semester.getAll((result) => {
        res.send(result);
    });
}

exports.add = function(req, res) {
    const data = req.body;
    semester.add( data,(result) => {
        res.send(result);
    });
}