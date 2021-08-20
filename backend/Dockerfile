# syntax=docker/dockerfile:1
FROM node:12.18.1
WORKDIR /app
EXPOSE 3001
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
ENV PORT=3001
ENV HOST="db"
RUN npm install --production

CMD  npm run migrate && npm run seeds && node ./dist/app.js
