# noderef

Reference app and a nice starting place for future node.js apps.  

Clone/fork this guy when starting a new node project.  

Demonstrates:

## Logging

## Monitoring ???

## Health check

## Clustering

## Environment variable overriding.  

Specifically increasing available threads to libuv by setting UV_THREADPOOL_SIZE to a larger number than 4.  
This is documented here:
https://www.future-processing.pl/blog/on-problems-with-threads-in-node-js/
and here:
https://nodejs.org/api/cli.html#cli_uv_threadpool_size_size

Set NODE_ENV to production (in case you have forgotten to set it)

## Docker multi-stage build

## Docker compose for local development



## Build and tag the docker image

```
docker build -t mickeyyawn/noderef:latest .
```

## Run the container that we just built

```
docker run -p 127.0.0.1:8080:8080  --env PORT=8080  -i  mickeyyawn/noderef:latest
```

## Test the app to make sure it is running

```
curl 127.0.0.1:8080/_hc


-# docker-compose up --build   --always-recreate-deps --force-recreate 