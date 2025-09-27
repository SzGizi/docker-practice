FROM node:22-alpine

WORKDIR /app

COPY package*.json .
RUN npm ci
ENV PORT=5000
COPY . .

CMD [ "node", "src/index.js" ]