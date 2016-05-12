'use strict';

var requestIp = require('request-ip');
var async = require('async');
var geoip = require('geoip-lite');

var UtilService = {

    geocode: function(req, callback) {

        var ip = requestIp.getClientIp(req);
        var geodata = null;

        return async.series([
            function(next) {

                if (!ip) {
                    return next('No IP specified');
                }

                var geo = geoip.lookup(ip);

                if (!geo) {
                    return next('Unable to determine your location. Sorry..');
                }

                geodata = geo;

                return next();
            }
        ], function(err) {

            if (err) {
                return callback(err);
            }

            return callback(null, geodata);
        });
    }
};

module.exports = UtilService;