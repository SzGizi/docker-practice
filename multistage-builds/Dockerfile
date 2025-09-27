FROM gcr.io/distroless/nodejs22

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY src src

ENV PORT=3000

CMD [ "node", "src/index.js" ]