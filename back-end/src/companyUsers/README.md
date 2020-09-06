# NestJS CRUD
### Notes for self about NestJS CRUD nested route functionality:

- I am trying to get the nested routes to work in the `companyUsers.controller`.
- I am extremely close. The problem I'm facing right now is that when I hit the `companies/:companyId/users` endpoint, the query that gets executed is searching for "WHERE User.undefined = $1".
- Searching for 'User.undefined' obviously makes the app crash.

### Here is the query that gets executed when I try the endpoint:
```bash
query: SELECT "User"."id" AS "User_id", "User"."firstName" AS "User_firstName", "User"."lastName" AS "User_lastName", "User"."isActive" AS "User_isActive", "User"."role" AS "User_role", "User"."createdAt" AS "User_createdAt", "User"."updatedAt" AS "User_updatedAt", "User"."deletedAt" AS "User_deletedAt", "company"."id" AS "company_id", "company"."name" AS "company_name", "User"."profileId", "User"."companyId" FROM "user" "User" LEFT JOIN "company" "company" ON "company"."id"="User"."companyId" WHERE (("User"."undefined" = $1)) AND "User"."deletedAt" IS NULL
```

### Here is the error I'm getting along with a stack trace
[Nest] 880   - 09/05/2020, 11:37:26 PM   [ExceptionsHandler] column User.undefined does not exist +16943ms
QueryFailedError: column User.undefined does not exist
    at new QueryFailedError (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/typeorm/error/QueryFailedError.js:11:28)
    at Query.callback (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/typeorm/driver/postgres/PostgresQueryRunner.js:176:38)
    at Query.handleError (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/pg/lib/query.js:139:19)
    at Client._handleErrorMessage (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/pg/lib/client.js:326:17)
    at Connection.emit (events.js:198:13)
    at parse (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/pg/lib/connection.js:109:12)
    at Parser.parse (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/pg-protocol/dist/parser.js:40:17)
    at Socket.stream.on (/Users/victordozal/other/reactive-nest-boilerplate/back-end/node_modules/pg-protocol/dist/index.js:8:42)
    at Socket.emit (events.js:198:13)
    at addChunk (_stream_readable.js:288:12)


I was following the documentation at:
https://github.com/nestjsx/crud/wiki/Controllers#params
Down where it says
```
"If you have a controller path with that looks kinda similar to this /companies/:companyId/users you need to add this param option:"
```

Additionally, I was looking at examples in issues opened by other people in the project's repository:
https://github.com/nestjsx/crud/issues?q=is%3Aissue+nested+is%3Aclosed

Here is a good one:
https://github.com/nestjsx/crud/issues/520
https://github.com/nestjsx/crud/issues/401