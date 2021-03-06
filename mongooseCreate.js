var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/favorites');

mongoose.connection.on('error', function(err) {
    console.error('Could not connect.  Error:', err);
});

mongoose.connection.once('open', function() {
   var favoriteSchema = mongoose.Schema({
       name: {type: String, unique: true},
       why: String
    });

    var Favorite = mongoose.model('Favorite', favoriteSchema);

    var favorite = {
        name: "The Essays of Montaigne",
        why: "Wit and Wisdom"
    };
    var anotherFavorite = {
        name: "As You Like It", 
        why: "The pleasant wit and charm"
    };

    Favorite.create(anotherFavorite, function(err, favorite) {
        if (err || !favorite) {
            console.error("Could not create favorite");
            mongoose.disconnect();
            return;
        }
        console.log("Created favorite", favorite.name);
        mongoose.disconnect();
    });
});
