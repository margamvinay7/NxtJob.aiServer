FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Generate Prisma client, specify the schema path
RUN npx prisma generate --schema=./src/prisma/schema.prisma

# Apply migrations in production, specify the schema path
RUN npx prisma migrate deploy --schema=./src/prisma/schema.prisma

ENV NODE_ENV=production
ENV DATABASE_URL=${DATABASE_URL}

CMD ["node", "dist/server.js"]
