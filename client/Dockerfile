FROM node:14-alpine as builder
LABEL maintainer="Julio Cesar <julio@blackdevs.com.br>"

WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .

ARG VUE_APP_CLIENT_ID
ENV VUE_APP_CLIENT_ID=$VUE_APP_CLIENT_ID

ARG VUE_APP_CLIENT_SECRET
ENV VUE_APP_CLIENT_SECRET=$VUE_APP_CLIENT_SECRET

RUN npm run build

FROM nginx:1.19-alpine

COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80

RUN sleep 5
