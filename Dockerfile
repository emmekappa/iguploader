FROM node:12.18-buster

WORKDIR /app

ADD package.json .
ADD package-lock.json .
RUN npm i

ADD . /app
RUN npm run rebuild
RUN npm run package
