FROM node:24-alpine3.21

WORKDIR /src

COPY package*.json ./

COPY prisma ./prisma

RUN npm install

COPY  . .

RUN npx prisma generate

RUN npm run build

EXPOSE  4000
    
CMD [ "node","dist/index.js" ]

