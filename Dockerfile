# Development stage
FROM node:18-alpine as development

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only package files first to leverage Docker cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies with specific flags for faster installation
RUN pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Development command
CMD ["pnpm", "dev"]

# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy only package files first
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies with specific flags
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prefer-offline

# Copy source code
COPY . .

# Build the application with specific flags
RUN pnpm build

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 