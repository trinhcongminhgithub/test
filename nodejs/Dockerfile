FROM ubuntu

RUN apt-get update && apt-get install -y nodejs && apt-get install -y npm && rm -rf /var/lib/apt/lists/*

RUN mkdir ./app

COPY ./ ./app

WORKDIR ./app

RUN npm install

EXPOSE 3000

CMD ["node","server.js"]
