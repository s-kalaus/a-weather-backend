a-weather-backend
===============

Simple backend for weather extension. Node.js/Express/Swagger/ejs

===============
#Installation

* npm install -g forever
* npm install
* bower install

#Web server config

Point document root of webserver to `public` directory, nodejs is on 4400 port by default

### Execution

development:

    npm start

production:

    NODE_ENV=production forever start server

### Using API

Navigate to SERVER_NAME/docs
