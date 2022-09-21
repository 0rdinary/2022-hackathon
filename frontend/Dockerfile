FROM node:alpine
COPY package.json ./
RUN npm install
COPY frontend ./
CMD ["npm","run","start"]