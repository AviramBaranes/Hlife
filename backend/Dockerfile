FROM node:14 as dev

WORKDIR /app

COPY package*.json ./

RUN  npm install 

COPY ./dist ./dist

ENV NODE_ENV=development

CMD [ "npm", "run", "dev" ]