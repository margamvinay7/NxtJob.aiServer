# Base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy only package.json and lock files first (leverage Docker cache)
COPY package*.json ./

# Install dependencies
RUN npm install

COPY ./swagger.yml ./swagger.yml

# Copy only the Prisma schema and related files
COPY ./src/prisma ./src/prisma

# Run Prisma commands (these will only re-run if the Prisma files change)
RUN npx prisma generate --schema=./src/prisma/schema.prisma
RUN npx prisma migrate deploy --schema=./src/prisma/schema.prisma

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}

# Start the application
CMD ["node", "dist/server.js"]
