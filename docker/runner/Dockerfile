FROM node:14-slim

RUN apt-get update
RUN apt-get install -y mc
RUN apt-get install -y mysql-client
RUN apt-get install -y git-core
RUN apt-get install -y wget
RUN apt-get install -y curl
RUN apt-get install -y htop
RUN apt-get install -y procps
RUN apt-get install -y make
RUN apt-get clean

RUN npm i -g pm2

WORKDIR /app

