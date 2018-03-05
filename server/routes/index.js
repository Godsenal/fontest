const api = require('./apis');

module.exports = (app) => {
  app.get('*', (req, res, next) => {
    next();
  });

  app.use('/api', api);
};
