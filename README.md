<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Task Management Backend (NestJS)

This is the backend application for the Task Management project, built with NestJS and Mongoose (for MongoDB).

## Prerequisites

*   Node.js installed (version 18 or higher recommended)
*   A running MongoDB instance (local or cloud-based)

## Technologies Used

This backend application is built using the following core technologies:

*   **NestJS**: v11.0.1
*   **TypeScript**: v5.7.3
*   **Mongoose**: v8.14.0
*   **JWT (JSON Web Tokens)**: (For user authentication)
*   **Passport.js**: (Authentication middleware)
*   **Bcrypt**: v5.1.1 (for password hashing)
*   **Class-validator**: v0.14.1 (Validation decorators for classes)
*   **Puppeteer**: v24.7.2
*   **CORS**: v2.8.5 (Middleware for enabling Cross-Origin Resource Sharing)

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone github.com/ZeuxMD/task-manger-backend
    cd task-manager-backend
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up MongoDB:**

    You need a running MongoDB database. You can:
    *   Install and run MongoDB locally ([https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community))
    *   Use a cloud-based solution like MongoDB Atlas ([https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)), which offers a free tier.

    Obtain your MongoDB connection URI.

4.  **Set up Environment Variables:**

    Create a file named `.env` in the root of the project.

    ```bash
    touch .env
    ```

    Open `.env` and add the following environment variables. Replace the placeholder values with your actual credentials and configurations.

    ```env
    # MongoDB Connection URI
    MONGODB_URI=mongodb://localhost:27017/task-management # Or your MongoDB Atlas connection string

    # JWT Secret Key (Use a strong, random value)
    JWT_SECRET=YOUR_SUPER_SECRET_JWT_KEY

    # JWT Expiration Time (e.g., 60s, 1h, 7d)
    JWT_EXPIRATION_TIME=60s

    # Port (optional, the default in this project is 3333)
    PORT=3333
    ```

    **Important:**
    *   `MONGODB_URI`: Use the connection string for your MongoDB instance.
    *   `JWT_SECRET`: Generate a strong, random string for this. **Never use the default value in production.**
    *   `JWT_EXPIRATION_TIME`: Set the duration for your JWTs.

5.  **Run the Development Server:**

    Ensure your MongoDB instance is running.

    ```bash
    npm run start:dev
    # or
    yarn start:dev
    # or
    pnpm start:dev
    ```

    The backend will start running on port 3333 (or the port you specefied in the .env).

## API Endpoints

*   `POST /auth/register`: Register a new user and get JWT token with user info.
*   `POST /auth/login`: Log in an existing user and get a JWT token with user info.
*   `GET /user/profile`: Get the profile of the authenticated user (requires JWT).
*   `POST /tasks`: Create a new task (requires JWT).
*   `GET /tasks`: Get all tasks for the authenticated user (requires JWT).
*   `GET /tasks/:id`: Get a specific task for the authenticated user (requires JWT).
*   `PUT /tasks/:id`: Update a specific task for the authenticated user (requires JWT).
*   `DELETE /tasks/:id`: Delete a specific task for the authenticated user (requires JWT).
