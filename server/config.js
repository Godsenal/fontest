const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  dbUrl: isDev ? 'mongodb://localhost:27017/fontest' : 'something',
};

