# Build stage
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Install only production dependencies
RUN npm install --only=production --legacy-peer-deps

# Expose API and Microservice ports
EXPOSE 3001
EXPOSE 3002

CMD ["npm", "run", "start:prod"]
