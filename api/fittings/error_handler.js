const util = require('util');

module.exports = () => {
  return (context, next) => {
    if (!util.isError(context.error)) {
      return next();
    }

    let err = {};

    if (context.error.message) {
      try {
        err = JSON.parse(context.error.message);
      } catch (e) {
        err.message = String(context.error.message);
        if (context.error.code) {
          err.code = context.error.code;
        }
      }
    }

    if (!err.message) {
      err.message = 'Unhandled Error';
    }

    err.success = false;

    delete err.statusCode;

    return context.response.json(err);
  };
};
