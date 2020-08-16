FROM node:12.18-buster

WORKDIR /app

ADD package.json .
RUN npm i

ADD . /app
RUN npm run package
