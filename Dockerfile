FROM node:14-alpine

ENV BITCOIND_PORT=18332
ENV BITCOIN_ADDRESS=mwKaUWSirv4H5n8J1BqiycnFDpATnK9473
ENV BITCOIN_OUTADDRESS=myMLjcmLTq1QSqJn7Mbeo65HER3HyJxaZm

WORKDIR /usr/src/app

COPY package*.json ./
RUN apk update && apk add python3 && apk add make && apk add bash && npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "initiate" ]
