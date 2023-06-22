FROM node:18-slim

RUN apt update && apt install -yqq procps libssl-dev

WORKDIR /home/node/app

COPY . .

RUN npm ci

RUN npx prisma generate

ENV PORT 3333

EXPOSE ${PORT}

CMD [ "npm", "run", "dev" ]
