var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping', { useNewUrlParser: true });

var products = [
    new Product({
        imagePath: 'https://www.extremetech.com/wp-content/uploads/2017/12/PUBG-Feature.jpg',
        title: 'PUBG PC',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 10
    }),
    new Product({
        imagePath: 'https://n2.sdlcdn.com/imgs/b/g/1/Zip_pc_737_m_1_2x-87a36.jpg',
        title: 'GTA Vice City',
        description: 'Grand Theft Auto Vice city is one of the most famous games played by individuals in this Universe',
        price: 12
    }),
    new Product({
        imagePath: 'https://images-na.ssl-images-amazon.com/images/I/81L8-mjNlrL._SL1500_.jpg',
        title: 'Counter Strike',
        description: 'The Best PC Sniping Game Ever Played by Any individual in this Universe',
        price: 15
    }),
    new Product({
        imagePath: 'https://gear.blizzard.com/media/catalog/product/cache//550x550/a4e40ebdc3e371adff845072e1c73f37/w/o/wow-2019-calendar-gallery.png',
        title: 'World of Warcraft',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 16
    }),
    new Product({
        imagePath: 'https://www.extremetech.com/wp-content/uploads/2017/12/PUBG-Feature.jpg',
        title: 'PUBG PC',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 10
    }),
    new Product({
        imagePath: 'https://www.extremetech.com/wp-content/uploads/2017/12/PUBG-Feature.jpg',
        title: 'PUBG PC',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 10
    }),
    new Product({
        imagePath: 'https://www.extremetech.com/wp-content/uploads/2017/12/PUBG-Feature.jpg',
        title: 'PUBG PC',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 10
    }),
    new Product({
        imagePath: 'https://www.extremetech.com/wp-content/uploads/2017/12/PUBG-Feature.jpg',
        title: 'PUBG PC',
        description: 'The Best PC Game Ever Played by Any individual in this Universe',
        price: 10
    })
];
var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err,results){
        done++;
        if(done == products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}