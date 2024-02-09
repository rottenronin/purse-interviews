FROM node:lts-alpine as build

WORKDIR /front-ends/vuejs

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev"]