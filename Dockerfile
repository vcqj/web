# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci

# Build with API endpoint baked in (adjust as needed)
ARG VITE_API_URL=http://localhost:8080/api/graphql
ENV VITE_API_URL=$VITE_API_URL

# Copy source and build
COPY . .
RUN npm run build

# --- Serve stage ---
FROM nginx:1.27-alpine
# NGINX config for SPA (see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Static assets
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

