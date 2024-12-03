FROM node:20.17.0


WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3001

# CMD ["npm", "run", "start"]
CMD ["node", "server.js"]
