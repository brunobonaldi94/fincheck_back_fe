FROM node:18.1.0-alpine3.14

ARG DATABASE_URL

RUN mkdir /app && chown node:node /app
WORKDIR /app

RUN echo $DATABASE_URL > .env

USER node
COPY --chown=node:node package*.json ./

RUN npm install

COPY --chown=node:node . .

COPY prisma_start.sh ./

RUN sh ./prisma_start.sh

EXPOSE 3000 5555

CMD ["npm", "run" , "start:dev"]

