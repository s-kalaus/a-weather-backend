#!/bin/sh

npm ci
npx bower install --allow-root

npx pm2 start --only weather-backend

tail -f /dev/null

