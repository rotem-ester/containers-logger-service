FROM node:14

WORKDIR /Users/rotem/src/weather-app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js", "rishon lezion" ]