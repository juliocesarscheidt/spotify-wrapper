FROM node:alpine as builder
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .

ARG VUE_APP_CLIENT_ID
ENV VUE_APP_CLIENT_ID=$VUE_APP_CLIENT_ID

EXPOSE 8080

CMD ["npm", "run", "serve"]
