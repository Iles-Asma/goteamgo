# infrastructure/images/web/Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Copiez package.json et, si présent, package-lock.json
COPY /src/containers/goteamgo-app/package*.json ./

# Installez les dépendances
RUN npm install

# Copiez le reste de l'application
COPY /src/containers/goteamgo-app ./

# Install global dependencies
RUN npm install -g expo-cli
RUN npm install -g @npmcli/move-file
RUN npm install react-native-gesture-handler

# Expose the port that your app runs on, for example, 19000 for Expo
EXPOSE 19000

# Start Expo
CMD [ "npx", "expo", "start", "--web"]
