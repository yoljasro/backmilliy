const { default: AdminBro } = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');

AdminBro.registerAdapter(AdminBroMongoose);

// models
const Product = require("./Product/product.admin");
const Order = require("./Order/order.admin");
const Banners = require("./Banner/banner.admin")
/** @type {import('admin-bro').AdminBroOptions} */
const options = {
  resources: [
    Product,
    Order,
    Banners
  ],
  // dashboard: {
  //   component: AdminBro.bundle('./Chart/components/SalesChart.js'), // Sales chart komponentini qo'shdik
  // },
};

module.exports = options;
