FROM node:lts-alpine as build

WORKDIR /front-ends/reactjs

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "dev"]