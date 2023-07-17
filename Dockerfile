# Use an official Node.js 14 image as the base image
FROM node:14-alpine
 # Set the working directory to /app
WORKDIR /app/front
 # Copy package.json and package-lock.json
COPY package*.json ./
 # Install dependencies
RUN npm install
 # Copy the rest of the files
COPY . .
 # Build the Vue.js app
RUN npm run build
 # Expose the port that the app is running on
EXPOSE 8080
 # Start the app
CMD [ "npm", "start" ]