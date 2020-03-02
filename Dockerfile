FROM node:11.10-stretch AS builder
LABEL maintainer="datapunt@amsterdam.nl"

ARG BUILD_ENV=prod
ARG BUILD_NUMBER=0
# ARG STTR_BUILDER_API_KEY=0

WORKDIR /deploy

# Run updates and cleanup
RUN apt-get update && \
  apt-get install -y \
  netcat \
  git && \
  rm -rf /var/lib/apt/lists/*

#  Changing git URL because network is blocking git protocol...
RUN git config --global url."https://".insteadOf git://
RUN git config --global url."https://github.com/".insteadOf git@github.com:

COPY package.json yarn.lock /deploy/
COPY internals /deploy/internals/

RUN npm --production=false \
  --unsafe-perm \
  --verbose \
  install && \
  npm cache clean --force

# Build dependencies
COPY . /deploy/

# Build
ENV NODE_PATH=/deploy/
ENV NODE_ENV=production

RUN npm run build
# RUN STTR_BUILDER_API_KEY=$STTR_BUILDER_API_KEY npm run build:sttr

# RUN mkdir -p build/shared/content/sttr
# RUN cp app/shared/content/sttr/* build/shared/content/sttr/

# Deploy
FROM nginx:stable-alpine
ARG BUILD_ENV=prod
COPY --from=builder /deploy/build/. /usr/share/nginx/html/

COPY default.conf /etc/nginx/conf.d/

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log
