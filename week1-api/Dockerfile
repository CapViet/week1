# 1. Base image
FROM node:20-alpine

# 2. Set working directory
WORKDIR /app

# 3. Copy package files first (for cache)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy source code
COPY . .

# 6. Build TypeScript
RUN npm run build

# 7. Expose port
EXPOSE 3000

# 8. Run compiled app
CMD ["node", "dist/index.js"]
