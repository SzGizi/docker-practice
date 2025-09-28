#1 Build our production boundle
FROM node:22-alpine as build
WORKDIR /app
COPY package.json ./
RUN npm install
#COPY src src
#COPY public public
COPY . .
RUN npm run build

# 2. Serve the bundle with http server
FROM nginx:1.27.0
COPY --from=build /app/build /usr/share/nginx/html