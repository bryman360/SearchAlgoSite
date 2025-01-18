FROM node:lts-alpine

COPY . .

WORKDIR /search-algo-site

RUN npm install package.json

CMD ["npm", "run", "dev"]

EXPOSE 3000