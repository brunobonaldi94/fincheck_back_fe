FROM node:18.1.0-alpine3.14

RUN mkdir /app && chown node:node /app
WORKDIR /app

USER node
COPY --chown=node:node package*.json ./

RUN npm install

ENV PATH /app/node_modules/.bin:$PATH

COPY --chown=node:node --chmod=777 . .

EXPOSE 5173

CMD ["npm", "run" , "dev"]
