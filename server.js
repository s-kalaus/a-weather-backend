const config = require('./config');
const express = require('express');
const path = require('path');
const swaggerDefinition = require('./api/swagger');
const SwaggerExpress = require('swagger-express-mw');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const swaggerJSON = swaggerDefinition();

const swaggerConfig = {
  appRoot: __dirname,
  swagger: swaggerJSON,
  swaggerControllerPipe: 'swagger_controllers',
  bagpipes: {
    _router: {
      name: 'swagger_router',
      mockMode: false,
      mockControllersDirs: ['api/mocks'],
      controllersDirs: ['api/controllers'],
    },
    _swagger_validate: {
      name: 'swagger_validator',
      validateReponse: true,
    },
    swagger_controllers: [
      {
        onError: 'error_handler',
      },
      'cors',
      'swagger_security',
      '_swagger_validate',
      'express_compatibility',
      '_router',
    ],
  },
};

SwaggerExpress.create(swaggerConfig, function (err, swaggerExpress) {
  if (err) {
    throw err;
  }
  swaggerExpress.register(app);
});

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type,X-Requested-With,Set-Cookie,sid'
  );
  res.header('Content-Type', 'application/json; charset=utf-8');
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', 0);
  return next();
});

app.get('/docs', function (req, res) {
  res.set('Content-Type', 'text/html');
  return res.render('swagger', {
    url: `${req?.headers['x-forwarded-proto'] || 'http'}://${
      config.server.host
    }/docs/api`,
  });
});

app.get('/docs/api', function (req, res) {
  return res.json(swaggerJSON);
});

app.listen(config.server.port, () =>
  console.log(`Listening on: ${config.server.port}`)
);
