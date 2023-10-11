FROM node:alpine AS Development

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i 

COPY apps/auth apps/auth
COPY libs libs

RUN npm run build auth 

FROM node:alpine AS Production 

ARG NODE_ENV=Production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json .
COPY tsconfig*.json .
COPY nest-cli.json .

RUN npm i --prod

COPY apps/auth apps/auth
COPY libs libs

COPY --from=Development apps/dist/auth dist/auth

CMD [ "node", "dist/apps/auth/main" ]
