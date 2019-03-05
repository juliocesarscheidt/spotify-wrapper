FROM node:alpine as builder
WORKDIR /app
COPY ./package.json .
RUN npm install
COPY . .
CMD ["npm", "run", "build"]

# second phase
FROM nginx
EXPOSE 80
# copying files from previous phase
COPY --from=builder /app/dist/ /usr/share/nginx/html
