FROM node:12

WORKDIR /home/mohamed/Projects/chat-app


COPY package*.json ./

RUN npm install

COPY . .


ENV 8080=5500

EXPOSE 5500

CMD [ "npm","start" ]

