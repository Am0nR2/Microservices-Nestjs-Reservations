FROM node:alpine AS Development 

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i

COPY libs libs 
COPY apps/reservation apps/reservation

RUN npm run build reservation 

FROM node:alpine AS Production 

ARG NODE_ENV=Production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i --Production

COPY libs libs 
COPY apps/reservation apps/reservation

COPY --from=Development usr/src/app/dist/apps/reservation dist/apps/reservation

CMD [ "node", "dist/apps/reservation/main" ]