FROM node:alpine

WORKDIR /usr/marvel/app

COPY . .

RUN yarn

RUN yarn test

RUN yarn build