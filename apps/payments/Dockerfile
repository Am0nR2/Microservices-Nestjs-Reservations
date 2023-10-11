FROM node:alpine AS Development

WORKDIR /usr/src/app

COPY package*.json .
COPY tsconfig*json .
COPY nest-cli.json .

RUN npm i 

COPY libs libs
COPY apps/payments apps/payments 

RUN npm run build payments

FROM node:alpine AS Production

ARG NODE_ENV=Production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json .
COPY tsconfig*json .
COPY nest-cli.json .

RUN npm i --prod

COPY libs libs
COPY apps/payments apps/payments 
COPY --from=Development /usr/src/app/dist/apps/payments dist/apps/payments

CMD [ "node", "dist/apps/payments/main" ]


