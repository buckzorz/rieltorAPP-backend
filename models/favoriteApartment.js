var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteApartmentSchema = new Schema({
    
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    
    apartments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    }]},
    {
       timestamps : true 
    });

var Favorites = mongoose.model('Favorite', favoriteApartmentSchema);

module.exports = Favorites;