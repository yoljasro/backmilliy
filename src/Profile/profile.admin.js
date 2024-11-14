const AdminBro = require('admin-bro');
const AdminBroMongoose = require('admin-bro-mongoose');
const { Profile } = require('./profile.entity');

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
    name: {
      type: 'mixed',
    },
    date: {
      type: 'date',
    },
    number: {
      type: 'string',
    },
    // image: {
    //   components: {
    //     edit: AdminBro.bundle('./components/upload-image.edit.tsx'),
    //     list: AdminBro.bundle('./components/upload-image.list.tsx'),
    //   },
    // },
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
  resource: Profile,
};
