// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var apartmentSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    renovation: {
        type: String,
        required: true,
    }, 
    elevator: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true
    },
    rooms: {
        type: Number,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },      
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sold: {
        type: Boolean,
        required: true,
        default: false
    },

}, {
    timestamps: true
});

// the schema is useless so far
// we need to create a model using it
var Apartments = mongoose.model('Apartment', apartmentSchema);

// make this available to our Node applications
module.exports = Apartments;