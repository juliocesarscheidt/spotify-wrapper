FROM node:alpine as builder
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .

CMD ["npm", "run", "test:coverage"]
