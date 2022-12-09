FROM node:16-alpine

WORKDIR /app

COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile
ENV NODE_ENV production

ARG BUCKET_NAME
ENV BUCKET_NAME $BUCKET_NAME
ARG IAM_USER_KEY
ENV IAM_USER_KEY $IAM_USER_KEY
ARG IAM_USER_SECRET
ENV IAM_USER_SECRET $IAM_USER_SECRET
ARG MYSQL_USER
ENV MYSQL_USER $MYSQL_USER
ARG MYSQL_PASSWORD
ENV MYSQL_PASSWORD $MYSQL_PASSWORD

COPY . .
CMD yarn start