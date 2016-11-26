var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    username: String,
    password: String,
    firstname: {
        type: String,
        default: '',
        required: false
    },
    lastname: {
        type: String,
        default: '',
        required: false
    },
    email: {
        type: String,
        required: false
    },
    phonenumber: {
        type: String,
        required: false
    },
    birthdate: {
        type: String,
        required: false,
    },
    client:{
        type: Boolean,
        default: false
    },
    rieltor:{
        type: Boolean,
        default: false
    },
    admin:   {
        type: Boolean,
        default: false
    }
});

User.methods.getName = function() {
    return (this.firstname + ' ' + this.lastname);
};

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);