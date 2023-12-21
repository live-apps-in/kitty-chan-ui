FROM node:16-alpine
WORKDIR /usr/src/kittychan-ui
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install

ARG NEXT_PUBLIC_KITTY_CHAN_API
ENV NEXT_PUBLIC_KITTY_CHAN_API $NEXT_PUBLIC_KITTY_CHAN_API

RUN npm run build
CMD [ "npm", "start" ]