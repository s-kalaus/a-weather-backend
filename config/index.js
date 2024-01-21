const _ = require('lodash');
const env = process.env.NODE_ENV || 'development';

module.exports = _.extend(
  {
    env: env,
  },
  require('./' + env),
);
