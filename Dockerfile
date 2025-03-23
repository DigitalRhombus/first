FROM node:18-alpine 

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
WORKDIR /app/client
COPY ./client/package.json ./client/package-lock.json ./
RUN npm install
WORKDIR /app/server
COPY ./server/package.json ./server/package-lock.json ./
RUN npm install

WORKDIR /app
COPY . . 

RUN npm run setup

EXPOSE 8080 8000

CMD ["npm","run","deploy"]

# docker run -p 8080:8080 -p 8000:8000 <image_name>
