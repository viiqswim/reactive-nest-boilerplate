# Getting started

### Dependencies before getting started
1. Install `nvm`
2. Make sure you're using node version `10.22.0` (install it through `nvm` if needed)
3. Install Docker

# Get the project up and running
Install all of the required dependencies for the root, `front-end/`, and `back-end/` directories
```bash
npm run install:all
```
1. Start the front-end, back-end, and database with a single command
```bash
npm start
```
4. Test that the application is up and running
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
5. You're done!

------------------------------------

# Documentation

## React Boilerplate Create React App Template
- [GitHub Repository](https://github.com/react-boilerplate/react-boilerplate/tree/v5-with-cra)
- [Documentation](https://cansahin.gitbook.io/react-boilerplate-cra-template/)
- [Examples & Tutorials for common patterns](https://github.com/react-boilerplate/cra-template-examples)

# NestJS
- [Homepage](https://nestjs.com/)
- [GitHub Repository](https://github.com/nestjs/nest)
- [Documentation](https://docs.nestjs.com/)

# PostgreSQL
- [Homepage](https://www.postgresql.org/)
- [Documentation](https://www.postgresql.org/docs/13/index.html)