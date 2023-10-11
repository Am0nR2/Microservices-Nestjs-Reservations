FROM node:alpine AS Development 

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i 

COPY libs libs
COPY apps/notifications apps/notifications

RUN npm run build notifications

FROM node:alpine AS Production 

ARG NODE_ENV=Production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i --prod 

COPY libs libs 
COPY apps/notifications apps/notifications

COPY --from=Development usr/src/app/dist/apps/notifications dist/apps/notifications

CMD [ "node", "dist/apps/notifications/main" ]