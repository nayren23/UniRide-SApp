FROM node:20.9-alpine

WORKDIR /app

ARG PRODUCTION
ARG API_URL
ARG GOOGLE_MAPS_API_KEY


ENV PRODUCTION=$PRODUCTION \
    API_URL=$API_URL \
    GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY


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
CMD ["serve", "--ssl", "true", "--ssl-cert", "certs/flask-selfsigned.crt", "--ssl-key", "certs/flask-selfsigned.key", "--host", "0.0.0.0"]
