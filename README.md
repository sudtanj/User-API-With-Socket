## User API With Socket

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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
