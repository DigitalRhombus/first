# Use an official lightweight Node.js image
FROM node:20-alpine 

# Set the working directory
WORKDIR /app

# Copy dependencies first (leveraging Docker layer caching)
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Install client dependencies
WORKDIR /app/client
RUN npm install --frozen-lockfile

# Install server dependencies
WORKDIR /app/server
RUN npm install --frozen-lockfile

# Move back to root app directory
WORKDIR /app

# Run setup if necessary
RUN npm run setup

# Expose ports
EXPOSE 5173 8001

# Default command to run the application
CMD ["npm", "run", "deploy"]
