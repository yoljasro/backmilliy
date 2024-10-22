const mongoose = require('mongoose');

const OrdersSchema = new mongoose.Schema({
  products: [{
    productId: {
      type: String,
      required: true,
    },
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  deliveryType: {
    type: String,
    enum: ['самовывоз', 'доставка'],  
    required: true,
  },
  address: {
    type: String,
    validate: {
      validator: function(value) {
        return this.deliveryType === 'доставка' ? value && value.trim().length > 0 : true;
      },
      message: 'Address is required for delivery type "доставка".',
    },
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['Принял', 'оплаченный', 'неуспешный', 'неоплаченный'],
    default: 'Принял',
  },
  paymentType:{
    type: String,
    required: true,
    enum: ['click', 'payme', 'cash'],
    default: 'cash',
  },
  orderStatus: {
    type: String,
    enum: ['Принял', 'Подготовка', 'Готовый'],
    default: 'Принял', // Boshlang'ich status 'Принял'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Orders = mongoose.model('Orders', OrdersSchema);
module.exports = { OrdersSchema, Orders };
