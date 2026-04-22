FROM node:20-alpine AS builder

WORKDIR /app

# Copy only package files first for caching
COPY frontend/package*.json ./

# Install dependencies (with force reinstall to avoid native module issues)
RUN npm install --force

# Copy the rest of frontend code (excluding node_modules via .dockerignore)
COPY frontend/ .

# Build the React app with environment variables
ARG VITE_API_URL=http://backend:8000
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy custom nginx config
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built assets
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
