const AdminBro = require('admin-bro');
const { Motto } = require('./motto.entity');

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    title: { type: 'string' },
    description: { type: 'string'},
  },
};

module.exports = {
  options,
  resource: Motto, 
};
