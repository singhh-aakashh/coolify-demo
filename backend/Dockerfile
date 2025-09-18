# backend/Dockerfile

# 1. Use an official Node.js runtime as a parent image
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /usr/src/app

# 3. Copy package.json and package-lock.json
# This leverages Docker's cache. The npm install step will only re-run if these files change.
COPY package*.json ./

# 4. Install application dependencies
RUN npm install

# 5. Copy the rest of your application's source code
COPY . .


EXPOSE 3001

# 7. Define the command to run your app
# This command assumes your package.json has a "start" script like "node src/server.js"
CMD [ "npm", "start" ]