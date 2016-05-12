'use strict';

var config = require('../config');

module.exports = function() {
    return {
        swagger: '2.0',
        info: {
          version: '1.0.0',
          title: 'a-weather API'
        },
        host: config.server.host,
        basePath: '/v1',
        schemes: [
            'http'
        ],
        consumes: [
            'application/json'
        ],
        produces: [
            'application/json'
        ],
        tags: [
            {
                name: 'weather'
            }
        ],
        paths: {
            '/weather/current': {
                'x-swagger-router-controller': 'weather',
                get: {
                    tags: ['weather'],
                    description: 'Shows weather for today',
                    operationId: 'current',
                    parameters: [],
                    responses: {
                        200: {
                            description: 'Success',
                            schema: {
                                $ref: '#/definitions/WeatherResponse'
                            }
                        },
                        'default': {
                            description: 'Error',
                            schema: {
                                $ref: '#/definitions/ErrorResponse'
                            }
                        }
                    }
                }
            }
        },
        definitions: {
            ErrorResponse: {
                required: [
                    'success',
                    'message'
                ],
                properties: {
                    success: {
                        type: 'boolean'
                    },
                    message: {
                        type: 'string'
                    }
                }
            },
            WeatherResponse: {
                required: [
                    'success'
                ],
                properties: {
                    success: {
                        type: 'boolean'
                    }
                }
            }
        }
    };
};