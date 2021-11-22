FROM node:14 as dev

WORKDIR /app

COPY package*.json ./

RUN  npm install 

COPY ./dist ./dist

ENV NODE_ENV=development

CMD [ "npm", "run", "dev" ]



FROM node:14 as prod

WORKDIR /app

COPY package*.json ./

RUN  npm install --only=prod

COPY ./dist ./dist

RUN mkdir -p /public

RUN mkdir -p /public/images

ENV NODE_ENV=production

CMD [ "npm", "start" ]