#!/bin/sh

npm config set unsafe-perm true

pm2 start --only weather-backend

tail -f /dev/null
