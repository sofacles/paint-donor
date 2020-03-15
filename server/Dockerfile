FROM node
WORKDIR /usr/src/onelesscan_api
COPY package.json .
RUN npm i
COPY . .
EXPOSE 5000
ENV NODE_ENV development
CMD "node" "src/server.js"