var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify    = require('./verify');
var Apartments = require('../models/apartments');

var apartmentRouter = express.Router();
apartmentRouter.use(bodyParser.json());


apartmentRouter.route('/')

.get(function (req, res, next) {

    Apartments.find(req.query)
        .exec(function (err, apartment){
        if (err) return next(err);
        res.json(apartment);
    });
})
.post(function (req, res, next){
    Apartments.create(req.body, function(err, apartment){
        if (err) return next(err);
        console.log('Created apartment');
        var id = apartment._id;
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        
        res.end('Added apartment with id: ' + id);
    })
})
.delete( Verify.verifyOrdinaryUser, Verify.verifyRieltor, function (req, res, next){
    Apartments.remove({}, function(err, resp){
        if (err) return err;
        res.json(resp);
    });
});



apartmentRouter.route('/:apartmentId')
.get(function (req, res, next){
    Apartments.findById(req.params.apartmentId)
        .exec(function(err, apartment){
        if (err) return next(err);
        res.json(apartment);
    });
})
 .put(Verify.verifyOrdinaryUser, Verify.verifyRieltor, function(req, res, next){
    Apartments.findByIdAndUpdate(req.params.apartmentId, {
        $set: req.body
    }, {
        new: true
    }, function (err, apartment){
        if (err) return next(err);
        res.json(apartment);
    });
})
.delete(Verify.verifyOrdinaryUser, Verify.verifyRieltor, function(req, res, next){
    Apartments.findByIdAndRemove(req.params.apartmentId, function(err, resp){
       if (err) return next(err);
        res.json(resp);
    });
});

module.exports = apartmentRouter;