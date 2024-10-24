const { default: AdminBro } = require('admin-bro');
const { buildRouter } = require('admin-bro-expressjs');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

/**
 * @param {AdminBro} admin
 * @return {express.Router} router
 */
const buildAdminRouter = (admin) => {
  // Remove the authentication logic
  const router = buildRouter(admin);
  
  // Add session handling without authentication
  router.use(
    session({
      resave: false,
      saveUninitialized: true,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      secret: 'superlongandcomplicatedname',
    })
  );

  return router;
};

module.exports = buildAdminRouter;
