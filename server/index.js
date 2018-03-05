const express = require('express');
const chalk = require('chalk');
const { resolve } = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const isDev = process.env.NODE_ENV !== 'production';
const host = (process.env.HOST || 'localhost');
const port = (process.env.PORT || 3000);
const outputPath = resolve(process.cwd(), 'dist');
const publicPath = '/';

const setup = isDev ? require('./setup/setupDev') : require('./setup/setupProd');
const route = require('./routes');
const config = require('./config');

/** configuration
 * 1. mongoose connection
 * 2. body-parser
 * 3. api setting
 * 4. setup for dev or prod enviroment
 * Finally Open
*/

mongoose.connect(config.dbUrl);
mongoose.Promise = global.Promise;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

route(app);

setup(app, {
  publicPath,
  outputPath,
});
// get the intended host and port number, use localhost and port 3000 if not provided

app.listen(port, host, (err) => {
  if (err) {
    console.error(chalk.red(err));
  }
  if (isDev) {
    console.log(`Server started in Development! ${chalk.green('✓')}`);
  }
  else {
    console.log(`Server started! ${chalk.green('✓')}`);
  }

  console.log(`
      ${chalk.bold('Server is Running on:')}
      ${chalk.magenta(`http://${host}:${port}`)}
      ${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}
    `);
});
