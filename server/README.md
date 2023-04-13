# Server Implementation

This server implementation is built using Node.js, Express, PostgreSQL, Sequelize, and JWT for authentication. The server has two main models: Enterprise and Article, with an additional User model for authentication.

## Models

### User

- id: Integer (Primary Key, Auto Increment)
- email: String (Unique)
- password: String
- role: Enum ('Admin', 'Standard')

### Enterprise

- NIT: Integer (Primary Key)
- name: String
- address: String
- phone: BigInteger

### Article

- id: Integer (Primary Key, Auto Increment)
- name: String
- NIT: Integer (Foreign Key)
- description: String

## Model Relationship Diagram

<pre>
+------------+      +------------+      +---------+
|   User     |      | Enterprise |      | Article |
+------------+      +------------+      +---------+
| id         |      | NIT        |      | id      |
| email      |      | name       |      | name    |
| password   |      | address    |      | NIT     |
| role       |      | phone      |      | description |
+------------+      +------------+      +---------+
                         ^                   |
                         |                   |
                         +-------------------+
</pre>

## API Endpoints

### User Routes

- POST /api/users/register: Register a new user
- POST /api/users/login: Login with email and password

### Enterprise Routes

- GET /api/enterprises: Get all enterprises (Standard users can read)
- POST /api/enterprises: Create a new enterprise (Admin users only)
- PUT /api/enterprises/:NIT: Update an enterprise by NIT (Admin users only)
- DELETE /api/enterprises/:NIT: Delete an enterprise by NIT (Admin users only)

### Article Routes

- POST /api/articles: Create a new article (Admin users only)
- GET /api/articles: Get all articles (Admin users only)
- PUT /api/articles/:id: Update an article by ID (Admin users only)
- DELETE /api/articles/:id: Delete an article by ID (Admin users only)