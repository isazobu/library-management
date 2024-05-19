# Build stage
FROM node:16-alpine as builder
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY src ./src
COPY tsconfig.json .

# Compile TypeScript
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /usr/src/app

# Copy the compiled JS from the builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Expose the application port
EXPOSE 3000

# Define health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD ["node", "-e", "require('http').request({host:'localhost',port:3000,path:'/health',timeout:2000}, res => { process.exit(res.statusCode == 200 ? 0 : 1); }).on('error', err => { console.error(err); process.exit(1); }).end()"]

# Run the compiled app
CMD ["node", "dist/index.js"]
