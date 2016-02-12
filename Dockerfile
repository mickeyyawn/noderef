#### build command --->      docker build -t noderef .
#### run the build image ---->  docker run -p 19999:8080 -d noderef
#### show running images ---> docker ps
#### view the logs ---->  docker logs <container id>
#### on mac, get the ip of the docker machine --->   docker-machine ip default
#### http://[docker machine ip]:8080

#### resources
#### https://docs.docker.com/engine/examples/nodejs_web_app/
#### https://nodesource.com/blog/dockerizing-your-nodejs-applications/
#### https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
#### https://www.digitalocean.com/community/tutorials/docker-explained-how-to-containerize-python-web-applications

FROM ubuntu:14.04

MAINTAINER Mickey Yawn <mickey.yawn@turner.com>

LABEL Description="Runs noderef app in a container" Vendor="?" Version="1.0"

RUN apt-get update

RUN apt-get install -y curl git-core gcc make build-essential

ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

FROM node:4.2.4

# Create app directory
RUN mkdir -p /var/www/noderef/
WORKDIR /var/www/noderef/

# Install app dependencies
COPY package.json package.json
RUN npm install

# Copy app source
# COPY . /var/www/noderef/

ADD . .

CMD ["node", "app.js"]

EXPOSE 8080

# copy systemd process manager file
# COPY noderef.service /etc/systemd/system

# enable the systemd file
# RUN systemctl enable noderef

# start the app
# RUN systemctl start noderef
