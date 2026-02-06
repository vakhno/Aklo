# Dev stage (default): run Vite dev server
FROM node:22-alpine AS dev
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# Production: build then serve static files
FROM node:22-alpine AS builder
WORKDIR /app
ARG VITE_APP_URL
ARG VITE_SOCKET_URL
ENV VITE_APP_URL=$VITE_APP_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS prod
WORKDIR /app
RUN corepack enable && npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
