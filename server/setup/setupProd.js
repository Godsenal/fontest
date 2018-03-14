const path = require('path');
const compression = require('compression');
const express = require('express');
const config = require('../../config/webpack.config.prod.js');
/*
  app = express app.
  option = object of public/output path.
*/
module.exports = function setupProd(app) {
  app.use(compression());
  // use publicPath('/') for serving static file in outputPath(resolve(process.cwd(), 'dist')).
  app.use(config.output.publicPath, express.static(config.output.path));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(config.output.path, 'index.html'));
  });
};
