# Use official Node.js Alpine image
FROM node:22.1.0-alpine

# Set working directory
WORKDIR /app

# Copy package files separately to leverage Docker cache
COPY React_folder/package.json React_folder/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY React_folder/ . 

RUN npm run build

RUN npm install -g serve

# Expose the port Vite uses (default 5173)
EXPOSE 3000

# Run development server
CMD ["serve", "-s", "dist"]
