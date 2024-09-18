const AdminBro = require('admin-bro');
const { Orders } = require('../Order/order.entity');

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    // Har qanday ma'lumotlarni Orders modelidan foydalanish mumkin
    totalPrice: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
    createdAt: {
      isVisible: { list: true, filter: true, show: true, edit: false },
    },
  },
  actions: {
    new: { isVisible: false },
    edit: { isVisible: false },
    delete: { isVisible: false },
    show: {
      isVisible: true,
    },
  },
};

module.exports = {
  options,
  resource: Orders,  // Orders ni resurs sifatida foydalaning
};
