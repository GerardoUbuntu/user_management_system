# user_management_system

User management API that performs basic CRUD operations

## Prerequisites

> npm version 8+
> node version 16
> MySql v8.0

## Install dependencies

```bash
# Install dependencies for server

npm install
```

## Setup Database

in config/config.json changed the corresponding data from your local MySQL
{
"development": {
"username": "root",
"password": "Password@2022",
"database": "user_management",
"host": "127.0.0.1",
"dialect": "mysql"
}
}

## DB Migration

```bash
# Install dependencies for server
npm install --save-dev sequelize-cli

# or globally

npm install -g sequelize-cli

# Create db
npx sequelize-cli db:create

# Run Migration
npx sequelize-cli db:migrate

# Bulk insert of user
npx sequelize-cli db:seed:all
```

## Run locally

```bash
# Run server
npm run start
```

## Enpoints

- SignIn User
  POST http://localhost:8000/api/v1/auth/signIn

- Get Users
  GET http://localhost:8000/api/v1/users/

- Add User
  POST http://localhost:8000/api/v1/users/

- Update User
  PUT http://localhost:8000/api/v1/users/{id}

- Delete User
  DELETE http://localhost:8000/api/v1/users/{id}

## Api docs

You can access the api documentation through this api endpoint
http://localhost:8000/api-docs/

## Testing

```bash
# Run server
npm run start
```

### Author

Gerardo A. Abantao Jr.

### Version

1.0.0.0
