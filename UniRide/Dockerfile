FROM node:20.9-alpine

WORKDIR /app

COPY . .

RUN npm install

#Which port the container will listen to
EXPOSE 4200

#Build the app Angular
RUN npm install -g @angular/cli

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0"]