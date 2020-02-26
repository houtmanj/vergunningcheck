# Docker compose

```sh
PORT=8080 docker-compose -f ci/docker-compose.yml build
PORT=8080 docker-compose -f ci/docker-compose.yml up --scale graphql=2 --scale client=2
```

Clean up old containers:

```sh
...
```

# Docker

Tip; enter your docker image:

```sh
docker run -it amsterdam/chappie-client sh
```

## Client

```sh
docker build --build-arg NODE_ENV=production --build-arg STTR_ENV=$STTR_ENV --build-arg STTR_BUILDER_API_KEY=$STTR_BUILDER_API_KEY -t amsterdam/chappie-client -f ci/Dockerfile.client .
docker run -p8080:80 -i -t amsterdam/chappie-client
```

## GraphQL

```sh
docker build --build-arg NODE_ENV=production -t amsterdam/chappie-graphql -f ci/Dockerfile.graphql .
docker run  -p8080:80 -it --init amsterdam/chappie-graphql
```
