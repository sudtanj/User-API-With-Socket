## User API With Socket

## Description

The app will consist the following user model attributes:
```
name
email (unique)
password 
role (admin or member)
```
The api provided will be :
```
GET: /api/users (return list of available users)
POST: /api/users (create a new user). User attributes are
GET: /api/users/:id (get a user by id)
DELETE: /api/users/:id (hard delete user)
POST: /api/login (send login request, pass email and password, and get JWT token)
PATCH: /api/users/:id (update name, email, role)
PUT: /api/password (update password)
```
Client can also subscribed to an event using websocket by listening to event name `eventMemberUsers` on port 3000.
You can try the websocket by opening the client example at folder /client

## Postman Documentation
You can import the postman collection using the following json link
[Postman JSON Collection](https://api.postman.com/collections/24756256-09ee5f4a-d2e3-46d0-a96b-5a2062e94949?access_key=PMAT-01GNDQTGWG69MWJ81CJQCPK4K0)

## Migration and Seeding Database
The following command with created the user with admin role on the database.
```bash
npm run typeorm migration:run
```
The credential for the user will be:
1. email: admin@primaku.com
2. password: #Admin123
3. role: admin

## Run app using docker container 
You can run the project using docker by following steps:
1. Add .env file containing all the credential needed by following the .env.example file
2. using pre-assemble docker image from docker hub using the following command
```bash
docker run --env-file .env sudtanj/user-api-with-socket:latest
```

## Running the app locally

```bash
# install the dependencies
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
