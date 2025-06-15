FROM node:21-slim

RUN mkdir /app
WORKDIR /app

RUN apt-get update \
    && apt-get install -y \
    git \
    vim \
    npm
# ADD package.json /app/package.json
ADD . /app
# RUN npm install