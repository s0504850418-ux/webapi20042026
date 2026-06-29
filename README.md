# E-Commerce Web API

REST API for an e-commerce system built with Node.js and Express.js. Uses a dual-database architecture — MongoDB for products and MySQL for users and categories.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js 5
- **Databases:** MongoDB (via Mongoose) + MySQL (via mysql2)
- **Auth:** JWT (jsonwebtoken) + bcrypt for password hashing
- **Other:** dotenv, morgan, nodemon

## Installation

```bash
npm install
```

Create a `.env` file in the project root (see [Environment Variables](#environment-variables)).

## Running the Server

```bash
# Development (auto-reload)
npm start

# Production
node server.js
```

Server runs on port **5053**.

## Environment Variables

Create a `.env` file at the project root:

```env
# MongoDB Atlas
MONGO_USER=your_mongo_username
MONGO_PASS=your_mongo_password
MONGO_SRV=your_mongo_cluster_address

# MySQL
MYSQLSRV=your_mysql_host
MYSQLUSER=your_mysql_username
MYSQLPASS=your_mysql_password
MYSQLPORT=3306
MYSQLDB=your_database_name

# JWT
PRIVATE_KEY=your_jwt_secret_key
```

## Project Structure

```
webapi20042026/
├── server.js                    # Entry point — creates HTTP server
├── app.js                       # Express app — DB connections, middleware, routes
├── package.json
└── api/
    └── v1/
        ├── routes/              # URL routing
        │   ├── product.js
        │   ├── user.js
        │   ├── category.js
        │   └── order.js
        ├── controllrs/          # Business logic
        │   ├── product.js       # MongoDB-based
        │   ├── user.js          # MySQL-based + JWT login
        │   ├── mysqlcategory.js
        │   └── mysqluser.js
        ├── modoels/             # Data models
        │   ├── product.js       # Mongoose schema
        │   ├── user.js          # Mongoose schema
        │   └── mysqldb.js       # MySQL connection
        └── middlewares/
            ├── auth.js          # JWT verification middleware
            └── mylog.js
```

## API Endpoints

### Products — MongoDB

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/product` | Get all products | No |
| GET | `/product/:pid` | Get product by ID | No |
| POST | `/product` | Add product | No |
| PUT | `/product/:id` | Update product | No |
| DELETE | `/product/:pid` | Delete product | No |

### Users — MySQL

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/user` | Get all users | No |
| GET | `/user/:uid` | Get user by ID | No |
| POST | `/user/login` | Login — returns JWT token | No |
| POST | `/user` | Add user (password is hashed) | JWT required |
| PUT | `/user/:uid` | Update user | JWT required |
| DELETE | `/user/:uid` | Delete user | JWT required |

### Categories — MySQL

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/category` | Get all categories | No |
| GET | `/category/:cid` | Get category by ID | No |
| POST | `/category` | Add category | No |
| PUT | `/category/:cid` | Update category | No |
| DELETE | `/category/:cid` | Delete category | No |

### Orders — stub (no DB)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/order` | Returns hardcoded placeholder |
| POST | `/order` | Returns hardcoded placeholder |

## Authentication

Protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <token>
```

Get a token by calling `POST /user/login` with `{ "email": "...", "pass": "..." }`.
