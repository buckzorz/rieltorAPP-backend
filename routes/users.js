var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var Verify    = require('./verify');

router.get('/',/*, Verify.verifyOrdinaryUser, Verify.verifyRieltor,*/ function(req, res, next) {
    //rieltor: false is for getting ONLY the users that are not marked as a rieltor:true
    User.find({rieltor: false}, function (err, user){
        if (err) throw err;
        res.json(user);
    });
});

router.post('/register', function(req, res) {
    User.register(new User({ username : req.body.username}),
         req.body.password, function(err, user){
            if (err) {
                return res.status(500).json({err: err});
            }
            if(req.body.firstname) {
                user.firstname = req.body.firtstname;
            }
            if(req.body.lastname) {
                user.lastname = req.body.lastname;
            }
            if(req.body.email) {
                user.email = req.body.email;
            }
            if(req.body.phonenumber) {
                user.phonenumber = req.body.phonenumber;
            }
            if(req.body.birthdate) {
                user.birthdate = req.body.birthdate;
            }
            if(req.body.rieltor) {
                user.rieltor = req.body.rieltor;
            }
        user.save(function(err, user) {
            passport.authenticate('local')(req, res, function (){
                return res.status(200).json({status: 'Registration successful!'});
            });
        });
    });
});

router.post('/login', function(req,res,next){
    passport.authenticate('local', function(err, user, info){
        if(err){
            return next(err);
        }
        if(!user){
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({
                    err: 'Wasnt able to login'
                });
            }
            
            var token = Verify.getToken({"username": user.username, "_id":user._id, "rieltor":user.rieltor});
            console.log(user.rieltor);
            res.status(200).json({
                status: 'Login successful',
                success: true,
                token: token,
                rieltor: user.rieltor
            });
        });
    })(req,res,next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.status(200).json({
        status: 'gg wp'
    });
});

module.exports = router;




