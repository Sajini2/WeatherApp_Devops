# Stage 2: Production - lightweight nginx to serve files
FROM nginx:alpine

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Remove default nginx content
RUN rm -rf /usr/share/nginx/html/*

# Copy source files (no build folder)
COPY --from=builder /app/src /usr/share/nginx/html

# Change ownership
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Run nginx
CMD ["nginx", "-g", "daemon off;"]