# Multi-stage production Dockerfile for FOREnX Digital Evidence Management
# Stage 1: Build Frontend and Server Bundle
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build production assets
COPY . .
RUN npm run build

# Stage 2: Production Lightweight Image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy package manifests and install production-only dependencies
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy built distribution assets and server bundle from builder stage
COPY --from=builder /app/dist ./dist

# Create and switch to non-root user for enhanced security
USER node

# Expose server port (default: 3000, customizable via PORT env)
EXPOSE 3000

# Container healthcheck using the /api/health endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the optimized production server
CMD ["node", "dist/server.cjs"]
