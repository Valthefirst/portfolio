# Use Node.js as the base image for building
FROM node:18 AS build
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Build the Next.js app
RUN npm run build

# Use a lightweight Node.js image for serving the app
FROM node:18 AS runtime
WORKDIR /app

# Copy the built Next.js app from the previous stage
COPY --from=build /app ./

# Expose the Next.js default port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
