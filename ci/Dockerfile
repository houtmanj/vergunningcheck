FROM node:alpine AS builder
LABEL maintainer="datapunt@amsterdam.nl"

WORKDIR /app/

RUN npm install pm2 -g

COPY package*.json ./
COPY apps/client/package*.json ./
COPY apps/graphql/package*.json ./

ARG NODE_ENV
RUN npm ci

COPY ci/ecosystem.config.js ./ci/
COPY apps/client ./apps/client
COPY apps/graphql ./apps/graphql

CMD ["pm2-runtime", "./ci/ecosystem.config.js"]
