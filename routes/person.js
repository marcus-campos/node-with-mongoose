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

router.post('/', function (req, res) {

    var arr = [
        {
            name: {
                firstName: 'Miller',
                lastName: 'Backer'
            },
            age: 23
        },
        {
            name: {
                firstName: 'Ibraimovitch',
                lastName: 'Huero'
            },
            age: 24
        },
        {
            name: {
                firstName: 'Calvin',
                lastName: 'Avicci'
            },
            age: 25
        }
    ];

    Person.insertMany(arr, function (err, person) {
       if(err){
           return;
       }

       res.send(person);
    });

    /*var person = new Person({
        name: {
            firstName: 'Alvin',
            lastName: 'Brand'
        },
        age: 22
    });

    person.save(person, function (err, person) {
        if(err){
            return;
        }

        res.send(person);
    });*/

    /*Person.create({
        name: {
            firstName: 'Marcus',
            lastName: 'Campos'
        },
        age: 21

    },function (err, person) {
        if(err){
            return;
        }

        res.send(person);
    });*/
});

router.put('/:id', function (req, res) {
    Person.findOneAndUpdate({
        _id: req.params.id
    }, {
        name:{
            firstName: 'Marcus',
            lastName: 'Best programmer'
        }
    }, function (err, person) {
        if(err){
            return;
        }

        res.send(person);
    });

  /*  Person.update({
        _id: req.params.id
    }, {
        name: {
            firstName: 'HUE',
            lastName: 'ALTERADO'
        },
        age: 100
    },function (err, people) {
        if(err){
            return;
        }

        res.send(people);
    });*/
});

router.delete('/:id', function (req, res) {

    Person.findOneAndRemove({
        _id: req.params.id
    }, function (err) {
        if(err){
            return;
        }

        res.send(req.params.id);
    });

   /*Person.remove({
       _id: req.params.id
   }, function (err) {
       if(err){
           return;
       }

       res.send(req.params.id);
   })*/
});

module.exports = router;