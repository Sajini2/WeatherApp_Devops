# Stage 1: Build - install dependencies and build app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files first (better cache efficiency)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source files
COPY . .

# Build the application
RUN npm run build


# Stage 2: Production - lightweight nginx to serve files
FROM nginx:alpine

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# IMPORTANT: Change this depending on your framework
# For React:
COPY --from=builder /app/build /usr/share/nginx/html

# For Vue/Vite use this instead:
# COPY --from=builder /app/dist /usr/share/nginx/html

# Change ownership
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]