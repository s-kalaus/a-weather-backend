#!/bin/sh

npm ci --only=prod

npx bower install --allow-root

npx pm2 start --no-daemon
