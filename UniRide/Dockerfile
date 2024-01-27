FROM node:20.9-alpine

WORKDIR /app

ARG PRODUCTION

ENV PRODUCTION=$PRODUCTION

#Copy package.json and package-lock.json to avoid reinstalling dependencies when only code changes
COPY package*.json ./

RUN npm install --force

COPY . .

#Which port the container will listen to
EXPOSE 4200

#Build the app Angular
RUN npm install -g @angular/cli

ENTRYPOINT [ "ng" ]

# Start the app Angular with SSL
#We need to add host to allow the container to be accessed from outside
CMD ["serve", "--ssl", "true", "--ssl-cert", "certs/flask-selfsigned.crt", "--ssl-key", "certs/flask-selfsigned.key", "--host", "0.0.0.0"]
