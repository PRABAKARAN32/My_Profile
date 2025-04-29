# Build stage
FROM node:22.1.0-alpine as build

WORKDIR /app

COPY React_folder/package*.json ./
RUN npm install

COPY React_folder/ .
RUN npm run build

# Production stage
FROM node:22.1.0-alpine

WORKDIR /app

# Install lightweight static server
RUN npm install -g serve

# Copy built files from previous stage
COPY --from=build /app/dist /app/dist

EXPOSE 3000

# Serve the built app
CMD ["serve", "-s", "dist", "-l", "3000"]
