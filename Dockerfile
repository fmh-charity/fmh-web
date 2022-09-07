FROM node:18-alpine3.15 as WEB

WORKDIR /

ENV PATH="./node_modules/.bin:$PATH"

COPY . .

RUN npm run build

FROM nginx:latest

COPY --from=WEB /dist ./opt/front
COPY /usr/src/docker/certs/test.vhospice.org.pem /usr/src/docker/certs/test.vhospice.org.pem
COPY /usr/src/docker/certs/test.vhospice.org.key /usr/src/docker/certs/test.vhospice.org.key
COPY ./nginx/main.conf /etc/nginx/conf.d/default.conf

ENV PORT 80 
ENV PORT 443 

CMD ["nginx", "-g", "daemon off;"]
