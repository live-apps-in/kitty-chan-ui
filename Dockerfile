FROM node:16-alpine
WORKDIR /usr/src/kittychan-ui
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
RUN npm run build
CMD [ "npm", "start" ]