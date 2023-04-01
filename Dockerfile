FROM node:18-alpine as build

LABEL maintainer="Enzitech"

RUN apk add --no-cache \
  curl \
  build-base \
  g++ \
  python3 \
  libcap

COPY . /app

WORKDIR /app

RUN yarn install --silent

RUN yarn run build && rm -rf node_modules && yarn install --production && yarn cache clean -f

RUN rm -rf /var/cache/apk/* \
  && rm -rf /usr/local/share/.cache/yarn/*

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node

FROM node:18-alpine as deploy

RUN apk add --no-cache \
  curl \
  build-base \
  g++ \
  python3 \
  libcap

WORKDIR /app

RUN setcap 'cap_net_bind_service=+ep' /usr/local/bin/node
RUN chown -R node:node /app

USER node

ENV TZ=America/Sao_Paulo


ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG DOMAIN
ENV DOMAIN=$DOMAIN

ARG API_VERSION
ENV API_VERSION=$API_VERSION

ARG PORT
ENV PORT=$PORT

ARG API_URL
ENV API_URL=$API_URL

ARG DB_TYPE
ENV DB_TYPE=$DB_TYPE

ARG DB_HOST
ENV DB_HOST=$DB_HOST

ARG DB_PORT
ENV DB_PORT=$DB_PORT

ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD

ARG DB_USERNAME
ENV DB_USERNAME=$DB_USERNAME

ARG DB_NAME
ENV DB_NAME=$DB_NAME

ARG JWT_SECRET_KEY
ENV JWT_SECRET_KEY=$JWT_SECRET_KEY

ARG JWT_EXPIRATION_TIME
ENV JWT_EXPIRATION_TIME=$JWT_EXPIRATION_TIME

ARG SALT_ROUNDS
ENV SALT_ROUNDS=$SALT_ROUNDS

ARG ADM_EMAIL
ENV ADM_EMAIL=$ADM_EMAIL

ARG ADM_PASSWORD
ENV ADM_PASSWORD=$ADM_PASSWORD

ARG AUTH_SESSION_EXPIRATION_MINUTES
ENV AUTH_SESSION_EXPIRATION_MINUTES=$AUTH_SESSION_EXPIRATION_MINUTES

ARG MAIL_HOST
ENV MAIL_HOST=$MAIL_HOST

ARG MAIL_PORT
ENV MAIL_PORT=$MAIL_PORT

ARG MAIL_USER
ENV MAIL_USER=$MAIL_USER

ARG MAIL_PASS
ENV MAIL_PASS=$MAIL_PASS


COPY --from=build /app/ormconfig.js /app/
RUN true
COPY --from=build /app/package*.json /app/
RUN true
COPY --from=build /app/yarn.lock /app/
RUN true
COPY --from=build /app/dist /app/dist/
RUN true
COPY --from=build /app/dist /app/dist/
RUN true
COPY --from=build /app/node_modules /app/node_modules/
RUN true

CMD ["yarn","run", "start:prod", "--silent"]
