const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    image: {
        type: String,
    },
    title: {
        type: String,
    },
    desc : {
        type : String,
    },
    minute: {
        type: String,
    },
    price: {
        type: Number,
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = { ProductSchema, Product };
