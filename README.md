---

# Node.js Express Application with TypeScript, Prisma ORM, and MySQL  

This project is a Node.js and Express-based API built with TypeScript, using Prisma ORM for database management, Zod for validation, and custom middleware for sanitization and rate limiting. The API includes error-handling middleware and follows best practices for structure and maintainability


## File Structure  

    ├── src  
    │   ├── controllers  
    │   │   └── job.controller.ts  
    │   ├── routes  
    │   │   └── job.routes.ts  
    │   ├── services  
    │   │   └── job.service.ts  
    │   ├── prisma  
    │   │   ├── client.ts  
    │   │   └── schema.prisma  
    │   ├── middlewares  
    │   │   ├── error.middleware.ts  
    │   │   ├── rateLimiter.middleware.ts  
    │   │   └── validation.middleware.ts  
    │   ├── utils  
    │   │   └── sanitizer.ts  
    │   └── server.ts  
    ├── .env  
    ├── Dockerfile  
    ├── docker-compose.yml  
    ├── package.json  
    ├── tsconfig.json  
    ├── swagger.yml  
    └── README.md  


<p align="center">
  <img src="./swaggerUI.png" alt="Swagger UI" style="width:800px; height:400px;">
</p>

## Features  
- **TypeScript** for static typing and enhanced developer experience.  
- **Prisma ORM** for seamless database management with MySQL.  
- **Zod Validation** for request validation and type safety.  
- **Custom Sanitization** to ensure clean input handling.  
- **Rate Limiting Middleware** to protect the API from abuse.  
- **Error Handling Middleware** for consistent error responses.  

## Setup and Running Instructions  

### Prerequisites  
Ensure you have the following installed:  
- Node.js (v20 or later)  
- Docker and Docker Compose  

### 1. Clone the Repository  
```bash  
git clone https://github.com/yourusername/your-repository.git  
cd your-repository  
```  

### 2. Configure Environment Variables  
Create a `.env` file in the project root and define your environment variables:  
```env  
DATABASE_URL=mysql://avnadmin:AVNS_KpsP1cXh8l6FirSXTeS@mysql-1e691765-margamvinay.c.aivencloud.com:12569/jobboard  
NODE_ENV=production  
PORT=3000  
```

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run start`**: Start the server at production.

### 3. Run Locally  without Docker Compose
  i. Install dependencies:
     ```
     npm install
     ```
  
  ii. Start the development server:
     ```
     npm run dev
     ```
     

### 4. Run with Docker Compose  
To run the application and MySQL database together using Docker Compose, use the following command:  
```bash
  docker-compose up
```  
This command will:  
- Build the Docker image for the application.  
- Start the application on `http://localhost:3000`.  


### 5. Access the API  
The API will be accessible at `https://localhost:3000/`. You can use tools like Postman or Swagger UI (defined in `swagger.yaml`) to interact with the API.  

### 6. Access the Swagger UI  
The API will be accessible at `https://localhost:3000/api-docs`.  

## Dockerfile  
```dockerfile  
# Base image  
FROM node:20  

# Set the working directory  
WORKDIR /app  

# Copy only package.json and lock files first (leverage Docker cache)  
COPY package*.json ./  

# Install dependencies  
RUN npm install  

# Copy Swagger file  
COPY ./swagger.yaml ./swagger.yaml  

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
```  

## docker-compose.yml  
```bash  
version: "1.0"  
services:  
  app:  
    build: .  
    ports:  
      - "3000:3000"  
    environment:  
      DATABASE_URL=mysql://avnadmin:AVNS_KpsP1cXh8l6FirSXTeS@mysql-1e691765-margamvinay.c.aivencloud.com:12569/jobboard  
```  

## Notes  
1. **Why Prisma ORM?**  
   Prisma was chosen over raw SQL queries for its type safety, schema migrations, and ease of integration with TypeScript. It simplifies database interactions and reduces the potential for runtime errors.  

2. **Rate Limiting Middleware**  
   A rate limiter ensures that the API is protected against abuse, helping maintain availability and preventing DDoS attacks.  

3. **Custom Sanitization**  
   Input sanitization helps avoid injection attacks and ensures data integrity.
   
4. **Zod validation**  
   Input validation helps avoid data type checks and ensures data integrity.  

5. **Error Handling**  
   The error-handling middleware ensures consistent error responses, making debugging easier and improving client-side error management.  

---

