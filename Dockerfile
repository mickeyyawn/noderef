#### build command --->      docker build -t noderef .
#### run the build image ---->  docker run -p 19999:8080 -d noderef
#### show running images ---> docker ps
#### view the logs ---->  docker logs <container id>


#### resources
#### https://docs.docker.com/engine/examples/nodejs_web_app/
#### https://nodesource.com/blog/dockerizing-your-nodejs-applications/
#### https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#### https://www.digitalocean.com/community/tutorials/docker-explained-how-to-containerize-python-web-applications

FROM node:10.15.0-alpine as build

RUN mkdir -p /var/www/noderef/

WORKDIR /var/www/noderef/

# copy over the entire contents of our project.

COPY . .

# remember, we DO NOT checkin npm modules, so we need to go and install them now

RUN npm install


# ok, we are done with the build step, let's now set up our running container


FROM node:10.15.0-alpine as container

LABEL version="1.0"
LABEL description="Dockerfile for noderef project."
LABEL author="Mickey Yawn"
LABEL email="mickeyyawn@gmail.com"

RUN mkdir -p /var/www/noderef

WORKDIR /var/www/noderef/

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=build /var/www/noderef/ .


# TODO:  command line options for nodejs ???

CMD ["node", "/var/www/noderef/app.js"]

EXPOSE 8080

