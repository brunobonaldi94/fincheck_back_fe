FROM node:18.1.0-alpine3.14

ARG DATABASE_URL

RUN apk add --no-cache bash

RUN mkdir /app && chown node:node /app
WORKDIR /app

RUN echo $DATABASE_URL > .env

USER node
COPY --chown=node:node package*.json ./

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node --chmod=777 . .

EXPOSE 3000 5555

CMD ["npm", "run", "start:dev"]

