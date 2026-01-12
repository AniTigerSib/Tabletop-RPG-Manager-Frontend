# syntax=docker/dockerfile:1

# Runtime-only image that serves the built SPA from dist/
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

COPY dist ./
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
