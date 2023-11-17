FROM node:20.9-alpine

WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

RUN npm install

COPY . .

#Which port the container will listen to
EXPOSE 4200

#Build the app Angular
RUN npm install -g @angular/cli

# Start the app
CMD ["ng", "serve", "--host", "0.0.0.0"]