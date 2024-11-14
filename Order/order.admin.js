const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const { Orders } = require('./order.entity');

AdminBro.registerAdapter(AdminBroMongoose);

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook');

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('./actions/upload-image.hook');

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    products: {
      type: 'mixed',
    },
    deliveryType: {
      type: 'string',
    },
    address: {
      type: 'string',
    },
    totalPrice: {
      type: 'number',
    },
    paymentStatus: {
      type: 'string',
    },
    orderStatus: {
      type: 'string',
      availableValues: [
        { value: 'Принял', label: 'Принял' },
        { value: 'Подготовка', label: 'Подготовка' },
        { value: 'Готовый', label: 'Готовый' },
      ],
    },
    createdAt: {
      type: 'datetime',
    },
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        let modifiedResponse = await passwordAfterHook(response, request, context);
        modifiedResponse = await uploadAfterHook(modifiedResponse, request, context);
        return modifiedResponse;
      },
      before: async (request, context) => {
        let modifiedRequest = await passwordBeforeHook(request, context);
        modifiedRequest = await uploadBeforeHook(modifiedRequest, context);
        return modifiedRequest;
      },
    },
    edit: {
      after: async (response, request, context) => {
        let modifiedResponse = await passwordAfterHook(response, request, context);
        modifiedResponse = await uploadAfterHook(modifiedResponse, request, context);
        return modifiedResponse;
      },
      before: async (request, context) => {
        let modifiedRequest = await passwordBeforeHook(request, context);
        modifiedRequest = await uploadBeforeHook(modifiedRequest, context);
        return modifiedRequest;
      },
    },
    show: {
      isVisible: false,
    },
  },
};

module.exports = {
  options,
  resource: Orders,
};
