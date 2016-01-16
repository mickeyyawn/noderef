#### build command --->      docker build -t noderef .
#### run the build image ---->  docker run -p 19999:8080 -d noderef
#### show running images ---> docker ps
#### view the logs ---->  docker logs <container id>
#### on mac, get the ip of the docker machine --->   docker-machine ip default
#### http://[docker machine ip]:8080

#### resources
####
#### https://nodesource.com/blog/dockerizing-your-nodejs-applications/

FROM ubuntu:14.04

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
