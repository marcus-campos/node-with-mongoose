var express = require('express');
var router = express.Router();
var Person = require('./../models/Person')

//Find All
router.get('/', function (req, res) {
    Person.find({}, function (err, people) {
        if(err) {
            return;
        }

        res.send(people);
    });
});

//Find One
router.get('/:id', function (req, res) {

    //Find by ID

    Person.findById(req.params.id, function (err, person) {

        if(err){
            return;
        }

        res.send(person);
    });

    //Find One
    /*Person.findOne({
        _id: req.params.id
    },function (err, person) {
        if(err){
            return;
        }

        res.send(person);
    })*/
});

module.exports = router;