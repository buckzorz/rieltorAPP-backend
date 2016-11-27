// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    base64: {
        type: String,
    },
    filename: {
        type: String
    },
    filesize: {
        type: Number
    },
    filetype: {
        type: String
    }
});

// create a schema
var apartmentSchema = new Schema({
    type: {
        type: String,
        required: false
    },
    renovation: {
        type: String,
        required: false,
    }, 
    elevator: {
        type: String,
        required: false,
    },
    district: {
        type: String,
        required: false
    },
    rooms: {
        type: Number,
        required: false
    },
    floor: {
        type: Number,
        required: false
    },
    area: {
        type: Number,
        required: false
    }, 
    price: {
        type: Number,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    image: [imageSchema],
    sold: {
        type: Boolean,
        required: false,
        default: false
    },

}, {
    timestamps: false
});

// the schema is useless so far
// we need to create a model using it
var Apartments = mongoose.model('Apartment', apartmentSchema);

// make this available to our Node applications
module.exports = Apartments;