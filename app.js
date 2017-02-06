var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



//mongoose connect
var db = mongoose.connect('mongodb://localhost/library').connection;

db.on('open', function () {
    console.log('Everything is okay, mongoDB is connected');
});

db.on('error', function () {
    console.log('Ops! Something went wrong, mongoDB is broken');
});

var person = mongoose.Schema({
    name: {
        firstName: String,
        lastName: String
    }
});

//Objeto virtual
person.virtual('name.fullName').get(function () {
   return this.name.firstName.concat(' ').concat(this.name.lastName);
});

var Person = mongoose.model('Person', person);

Person.create({
    name: {
        firstName: 'Marcus',
        lastName: 'Campos'
    }
}, function (err, person) {

    if(err) {
        console.log('Error person ->', err);
        return;
    }

    console.log('Person data -> ', person);
    console.log('Person Fullname -> ', person.name.fullName)
});

var company = mongoose.Schema({
    name: String,
    address: {
        name: String,
        number: Number,
        city: String
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

var Company = mongoose.model('Company', company);

Company.create({
    name: 'PlugApps',
    address: {
        name: 'Address 1',
        number: 112,
        city: 'São Paulo'
    },
    date: new Date()
}, function (err, company) {
    if(err){
        console.log('error');
        return;
    }

    console.log('Created -> ', company)
});










var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
