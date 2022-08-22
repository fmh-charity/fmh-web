  FROM node:18-alpine3.15
  WORKDIR /fmh-web
  ENV PATH="./node_modules/.bin:$PATH"
  COPY . .
  RUN npm run build
  CMD ["npm", "run", "dev"]
