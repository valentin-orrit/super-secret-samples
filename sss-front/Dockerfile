FROM node:22

RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 5174

CMD [ "npm", "run", "dev" ]