# Getting started

### Dependencies before getting started
1. Install `nvm`
2. Make sure you're using node version `10.22.0` (install it through `nvm` if needed)
3. Install Docker

### Get the project up and running
1. Install all of the required dependencies for the root, `front-end/`, and `back-end/` directories
```bash
npm run install:all
```
2. Start the front-end, back-end, and database with a single command
```bash
npm start
```
3. Test that the application is up and running
- To see the front-end, navigate to `localhost:3000`
- To see the back-end, navigate to `localhost:3001`
- To connect to the database, use a PostgreSQL client and use the following information:
```bash
Server: `localhost`
Username: `postgres`
Password: `docker`
Port: `5432`
Database: `postgres`
```
4. You're done!

------------------------------------

# Documentation

### React Boilerplate Create React App Template
- [GitHub Repository](https://github.com/react-boilerplate/react-boilerplate/tree/v5-with-cra)
- [Documentation](https://cansahin.gitbook.io/react-boilerplate-cra-template/)
- [Examples & Tutorials for common patterns](https://github.com/react-boilerplate/cra-template-examples)

### NestJS
- [Homepage](https://nestjs.com/)
- [GitHub Repository](https://github.com/nestjs/nest)
- [Documentation](https://docs.nestjs.com/)

### PostgreSQL
- [Homepage](https://www.postgresql.org/)
- [Documentation](https://www.postgresql.org/docs/13/index.html)

# Back-end notes & gotchas

### TypeORM migrations
With TypeORM you do not need to create migrations for simple things like adding & removing tables and columns. This gets taken care of by modifying the entities. You can turn off this default behavior by setting the `synchronize` flag to `false` in `back-end/src/app/app.module.ts`

### REST Client
There is a `back-end/restClient` folder which contains `*.http` files. These files are meant to be used with a vscode marketplace extension called [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client). As the name says, this is a REST Client like Postman.

### OpenAPI automatic documentation
This boilerplate has the OpenAPI (Swagger) documentation turned on by default. To see it simply go to `http://localhost:3001/api` to view it.
