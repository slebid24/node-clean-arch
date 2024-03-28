# TypeScript Node.js Express API Boilerplate

This boilerplate provides a starting point for building a RESTful API using Node.js, Express, TypeScript, and Prisma ORM following clean architecture principles.

## Features

- RESTful API routing with Express
- TypeScript for static type checking
- Prisma ORM for data access layer
- Clean architecture implementation
- Authentication with JWT (JSON Web Tokens)
- Input validation with Zod
- Logging with Winston
- API documentation with Swagger
- Unit tests setup with Jest
- Docker support for containerization

## Getting Started

### Prerequisites

- Node.js
- npm or Yarn
- Docker (optional for containerization)
- PostgreSQL (or other supported databases by Prisma)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a .env file in the root directory with the following content:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
   PORT=3000
   JWT_SECRET=your_jwt_secret
   ```

   Replace `username`, `password`, `mydb`, and `your_jwt_secret` with your PostgreSQL credentials and desired JWT secret.

4. Generate Prisma client:

   ```sh
   npx prisma generate
   ```

5. Apply database migrations:

   ```sh
   npx prisma migrate dev
   ```

6. Seed the database (if applicable):

   ```sh
   npm run seed
   ```

### Running the Server

For development:

```sh
npm run dev
```

For production:

1. Build the project:

   ```sh
   npm run build
   ```

2. Start the server:

   ```sh
   npm start
   ```

### API Documentation

Access the Swagger UI to view the API documentation and interact with the API endpoints at http://localhost:3000/api-docs.

### Running Tests

Run unit tests with Jest:

```sh
npm test
```

### Docker Support

The boilerplate includes Docker support for both development and production environments.

To build and run the container in development:

```sh
docker-compose -f docker-compose.dev.yml up --build
```

To build and run the container in production:

```sh
docker-compose up --build
```

### Directory Structure

```sh
root
│   .env
│   .gitignore
│   combined.log
│   docker-compose.dev.yml
│   docker-compose.yml
│   Dockerfile
│   error.log
│   jest.config.js
│   package-lock.json
│   package.json
│   README.MD
│   swagger.json
│   tsconfig.json
│
├───prisma
│       schema.prisma
│
├───src
│   │   app.ts
│   │   index.ts
│   │
│   ├───@types
│   │       express.d.ts
│   │
│   ├───config
│   │       dependencies.ts
│   │       logger.ts
│   │
│   ├───controllers
│   │   ├───auth
│   │   │       index.ts
│   │   │       refreshToken.controller.ts
│   │   │       signin.controller.ts
│   │   │       signUp.controller.ts
│   │   │
│   │   └───user
│   │           addUser.controller.ts
│   │           deleteUser.controller.ts
│   │           getUser.controller.ts
│   │           index.ts
│   │           listUser.controller.ts
│   │           updateUser.controller.ts
│   │
│   ├───entities
│   │       Token.ts
│   │       User.ts
│   │
│   ├───frameworks
│   │   └───expressSpecific
│   │           middleware
│   │           │   logger.middleware.ts
│   │           │   roleGuard.middleware.ts
│   │           │   validateReq.middleware.ts
│   │           │   verifyToken.middleware.ts
│   │           routes
│   │           │   auth.ts
│   │           │   index.ts
│   │           │   users.ts
│   │
│   ├───repositories
│   │       user.repository.ts
│   │
│   ├───schema
│   │       userSchema.ts
│   │
│   ├───services
│   │       token.service.ts
│   │
│   └───useCases
│       ├───auth
│       │       refreshToken.useCase.ts
│       │       signin.useCase.ts
│       │       signUp.useCase.ts
│       │
│       └───user
│               addUser.useCase.ts
│               deleteUser.useCase.ts
│               getUserById.useCase.ts
│               listUser.useCase.ts
│               updateUser.useCase.ts
│
└───tests
    └───unit
        ├───repositories
        │       users.tests.ts
        │
        └───useCases
```
