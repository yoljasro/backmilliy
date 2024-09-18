const AdminBro = require('admin-bro');
const { Client } = require('./client.entity');

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook');

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('./actions/upload-video.hook'); // O'zgartirilgan

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    title: { type: 'string' },
    video: { // O'zgartirilgan
      components: {
        edit: AdminBro.bundle('./components/upload-video.edit.tsx'), // O'zgartirilgan
        list: AdminBro.bundle('./components/upload-video.list.tsx'), // O'zgartirilgan
      },
    },
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(response, request, context);
        return uploadAfterHook(modifiedResponse, request, context);
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context);
        return uploadBeforeHook(modifiedRequest, context);
      },
    },
    edit: {
      after: async (response, request, context) => {
        const modifiedResponse = await passwordAfterHook(response, request, context);
        return uploadAfterHook(modifiedResponse, request, context);
      },
      before: async (request, context) => {
        const modifiedRequest = await passwordBeforeHook(request, context);
        return uploadBeforeHook(modifiedRequest, context);
      },
    },
    show: {
      isVisible: false,
    },
  },
};

module.exports = {
  options,
  resource: Client, // O'zgartirilgan
};
