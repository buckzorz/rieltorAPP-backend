var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Verify    = require('./verify');
var Favorite = require('../models/favoriteApartment');
var Apartment = require('../models/apartments');
var User = require('../models/user');


var favoriteApartmentRouter = express.Router();
favoriteApartmentRouter.use(bodyParser.json());

favoriteApartmentRouter.route('/')
    //.all(verify.verifyOrdinaryUser)
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    console.log(req);
    Favorite.find({'postedBy': req.decoded._id})
        .populate('postedBy')
        .populate('apartments')
        .exec(function (err, apartment){
        if (err) return next(err);
        res.json(apartment);
    });
})
/*.get(Verify.verifyOrdinaryUser, function (req, res, next){
    Favorite.findOne(req.query)
        .populate('postedBy')
        .populate('apartments')
        .exec(function (err, favorites){
            if (err) return next(err);
            res.json(favorites);
    });
})*/
.post(Verify.verifyOrdinaryUser, function (req, res, next){
    Favorite.find({'postedBy': req.decoded._id})
        .exec(function (err, client){
        if (err) throw err;
        if(client.length){
            var favoriteAlreadyExists = false;
            if(client[0].apartments.length){
                for (var i = (client[0].apartments.length - 1); i >=0; i--){
                favoriteAlreadyExists = client[0].apartments[i] == req.body._id;
                     if (favoriteAlreadyExists) break;
                }
            }
            if (!favoriteAlreadyExists) {
                client[0].apartments.push(req.body._id);
                client[0].save(function (err, client){
                    if (err) throw err;
                    console.log('Added favorite');
                    res.json(client);
                });
            } else {
                console.log('done');
                res.json(client)
            }
        } else {
            Favorite.create({postedBy: req.decoded._id}, function (err, client){
                if (err) throw err;
                client.apartments.push(req.body.id);
                client.save(function (err, client){
                    if (err) throw err;
                    console.log('Added fav');
                    res.json(client);
                });
            })
        }
        /*        if (err) throw err;
        req.body.postedBy = req.decoded._id;
        console.log(apartments);
        console.log("apartments.length " + apartments.length);
        if(apartments.length) {
            var favoriteAlreadyExists = false;
            if(apartments[0].apartments.length){
                console.log("apartments[0].apartments.length:" + apartments[0].apartments.length);
                for(var i = (apartments[0].apartments.length - 1); i >= 0; i--){
                    favoriteAlreadyExists = apartments[0].apartments[i] == req.body._id;
                    if (favoriteAlreadyExists) break;
                }
            }
            if(!favoriteAlreadyExists) {
                apartments[0].apartments.push(req.body._id);
                apartments[0].save(function (err, apartment){
                    if (err) throw err;
                    console.log('added favorite');
                    res.json(apartment);
                });
            } else{
                console.log('done');
                res.json(apartments);
            }
            } else {
                Favorite.create({postedBy: req.body.postedBy}, function(err, resp){
                    if (err) throw err;
                    apartments.apartments.push(req.body._id);
                    apartments.save(function (err, apartment) {
                        if (err) throw err;
                        console.log('Added favorite!');
                        res.json(apartment);
                    });
                })
            }*/
        });
    })
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorite.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    })
});

favoriteApartmentRouter.route('/:postedBy')
    .get(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorite.find({'postedBy': req.decoded._id})
            .populate('postedBy')
            .populate('apartments')
            .exec(function (err, apartment){
            if (err) return next(err);
            res.json(apartment);
        });
    })
    //.all(verify.verifyOrdinaryUser)
    .delete(Verify.verifyOrdinaryUser, function (req, res, next){
        Favorites.find({'postedBy': req.decoded._doc._id}, function (err, favorites) {
            if (err) return next(err);
            var favorite = favorites ? favorites[0] : null;
            
            if (favorite) {
                for (var i = (favorite.apartments.length - 1); i >= 0; i--){
                    if (favorite.apartments[i] == req.params.apartmentId) {
                        favorite.apartments[i].remove(req.params.apartmentId);
                    }
                }
                favorite.save(function (err, favorite){
                    if(err) return next(err);
                    console.log('here u go');
                    res.json(favorite);
                });
            } else {
                console.log('No favorites!');
                res.json(favorite);
            }
        });
});


module.exports = favoriteApartmentRouter;
    
