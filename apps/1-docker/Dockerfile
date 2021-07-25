FROM node:14
WORKDIR /Users/rotem/src/app1/

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]