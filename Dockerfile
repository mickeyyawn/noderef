#### build command --->      docker build -t noderef .
#### run the build image ---->  docker run -p 19999:8080 -d noderef
#### show running images ---> docker ps
#### view the logs ---->  docker logs <container id>


#### resources
#### https://docs.docker.com/engine/examples/nodejs_web_app/
#### https://nodesource.com/blog/dockerizing-your-nodejs-applications/
#### https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#### https://www.digitalocean.com/community/tutorials/docker-explained-how-to-containerize-python-web-applications

FROM node:9.3.0-alpine as build

RUN mkdir -p /var/www/noderef/
WORKDIR /var/www/noderef/

COPY package.json package.json
RUN npm install



FROM node:9.3.0-alpine as container

LABEL version="1.0"
LABEL description="Dockerfile for noderef project."
LABEL author="Mickey Yawn"
LABEL email="mickeyyawn@gmail.com"

RUN mkdir -p /var/www/noderef/
WORKDIR /var/www/noderef/

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build /var/www/noderef/ .

# TODO:  command line options for nodejs ???

CMD ["node", "app.js"]

EXPOSE 8080

