#!/bin/sh

npm config set unsafe-perm true

pm2 start --only backend

tail -f /dev/null
