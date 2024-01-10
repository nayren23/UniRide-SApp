FROM node:20.9-alpine

WORKDIR /app

ARG PRODUCTION
ARG API_URL
ARG GOOGLE_MAPS_API_KEY
ARG CERTIFICATE_CRT_FOLDER
ARG CERTIFICATE_KEY_FOLDER

ENV PRODUCTION=$PRODUCTION \
    API_URL=$API_URL \
    GOOGLE_MAPS_API_KEY=$GOOGLE_MAPS_API_KEY \
    CERTIFICATE_CRT_FOLDER=$CERTIFICATE_CRT_FOLDER \
    CERTIFICATE_KEY_FOLDER=$CERTIFICATE_KEY_FOLDER


#Copy package.json and package-lock.json to avoid reinstalling dependencies when only code changes
COPY package*.json ./

RUN npm install --force

COPY . .

#Which port the container will listen to
EXPOSE 4200

#Build the app Angular
RUN npm install -g @angular/cli


# Set CMD as an environment variable
ENV CMD_ARGS serve --ssl true --ssl-cert ""$CERTIFICATE_CRT_FOLDER"" --ssl-key ""$CERTIFICATE_KEY_FOLDER""
ENV CMD_ARGUMENT serve --ssl true --ssl-cert "\"$CERTIFICATE_CRT_FOLDER"\" --ssl-key "\"$CERTIFICATE_KEY_FOLDER"\"

# Echo the CMD content
RUN echo "CMD_ARGS $CMD_ARGS"
RUN echo "CMD_ARGUMENT $CMD_ARGUMENT"
RUN echo "CERTIFICATE_CRT_FOLDER $CERTIFICATE_CRT_FOLDER"
RUN echo "CERTIFICATE_KEY_FOLDER $CERTIFICATE_KEY_FOLDER"

ENTRYPOINT [ "ng" ]

# Start the app Angular with SSL
CMD ["serve", "--ssl", "true", "--ssl-cert", "certs/flask-selfsigned.crt", "--ssl-key", "certs/flask-selfsigned.key"]
