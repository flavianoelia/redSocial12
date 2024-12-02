FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["sh", "-c", "sleep 10 && node sync.js && npm start"]