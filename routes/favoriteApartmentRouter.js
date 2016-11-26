var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Favorite = require('../models/favoriteApartment');
var Apartment = require('../models/apartments');

var favoriteApartmentRouter = express.Router();
favoriteApartmentRouter.use(bodyParser.json());

favoriteApartmentRouter.route('/')
    //.all(verify.verifyOrdinaryUser)
.get(function (req, res, next){
    Favorite.find({'postedBy': req.decoded._doc._id})
        .populate('postedBy')
        .populate('apartments')
        .exec(function (err, favorites){
            if (err) return next(err);
            res.json(favorites);
    });
})
.post(function (req, res, next){
    Favorite.find({'postedBy': req.decoded._doc._id})
        .exec(function (err, favorites){
        if (err) return next(err);
        req.body.postedBy = req.decoded._doc._id;
        
        if(favorites.length) {
            var favoriteAlreadyExists = false;
            if(favorites[0].apartments.length){
                for(var i = (favorites[0].apartments.length - 1); i >= 0; i--){
                    favoriteAlreadyExists = favorites[0].apartments[i] == req.body._id;
                    if (favoriteAlreadyExists) break;
                }
            }
            if(!favoriteAlreadyExists) {
                favorites[0].apartments.push(req.body._id);
                favorites[0].save(function (err, favorite){
                    if (err) return next(err);
                    console.log('added favorite');
                    res.json(favorite);
                });
            } else{
                console.log('done');
                res.json(favorites);
            }
            } else {
                Favorite.create({postedBy: req.body.postedBy}, function(err, resp){
                    if (err) throw err;
                    favorite.apartments.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        console.log('Added favorite!');
                        res.json(favorite);
                    });
                })
            }
        });
    })
.delete(function (req, res, next) {
    Favorite.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    })
});

favoriteApartmentRouter.route('/:apartmentId')
    //.all(verify.verifyOrdinaryUser)
    .delete(function (req, res, next){
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
    
