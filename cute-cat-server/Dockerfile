FROM alpine:latest
RUN apk update && apk upgrade
RUN apk add nodejs
RUN apk add --update bash
RUN rm -rf /var/cache/apk/*

COPY . /src
RUN cd /src; npm install
EXPOSE 3000
CMD ["node", "/src/server.js"]