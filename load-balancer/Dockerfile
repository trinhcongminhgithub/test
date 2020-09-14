FROM nginx 

RUN apt-get update && apt-get install -y ufw && rm -rf /var/lib/apt/lists/*

COPY ./nginx.conf /etc/nginx/

EXPOSE 8000

