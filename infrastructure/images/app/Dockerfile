# infrastructure/images/web/Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install global dependencies
RUN npm install -g expo-cli

# Copy app's package.json and package-lock.json to the container
COPY /src/containers/goteamgo-app/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source (this will be overridden by the volume for development)
COPY /src/containers/goteamgo-app ./

# Expose the port that your app runs on, for example, 19000 for Expo
EXPOSE 19000

# Start Expo
CMD [ "npx", "expo", "start", "--web"]
