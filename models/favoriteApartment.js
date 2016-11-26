var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteApartmentSchema = new Schema({
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    apartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartments'
    }]},
    {
       timestamps : true 
    });

var Favorites = mongoose.model('Favorite', favoriteApartmentSchema);

module.exports = Favorites;