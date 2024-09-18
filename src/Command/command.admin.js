const AdminBro = require('admin-bro');
const { Command } = require('./command.entity');

const {
  after: passwordAfterHook,
  before: passwordBeforeHook,
} = require('./actions/password.hook');

const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('./actions/upload-image.hook'); // O'zgartirilgan

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    name: { type: 'string' },
    jobTitle : { type  : 'string'},
    image: { // O'zgartirilgan
      components: {
        edit: AdminBro.bundle('./components/upload-image.edit.tsx'), // O'zgartirilgan
        list: AdminBro.bundle('./components/upload-image.list.tsx'), // O'zgartirilgan
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
  resource: Command, // O'zgartirilgan
};
