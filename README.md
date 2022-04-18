<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
  <a href="https://www.postgresql.org" target="blank"><img src="https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" width="200" alt="Postgres Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest
## Description

[Nest](https://github.com/nestjs/nest): framework TypeScript starter repository.
<br>
[Postegress](https://www.postgresql.org): open source object-relational database system 

## Project Description
This project consist in create bank accounts in table and transfer money from a user to another by "pix". This money will be added to the bank account table, while the tranfer is created in the pix table  

## Main libraries used
- [typeorm](https://www.npmjs.com/package/typeorm) and [@nestjs/typeorm](https://www.npmjs.com/package/@nestjs/typeorm): Generate and migrate tables in Postgres;
- [pg](https://www.npmjs.com/package/pg): Non-blocking PostgreSQL client for Node.js. Typeorm will use to communicate with postgresql;
- [uuid](https://www.npmjs.com/package/uuid): Creation of RFC4122 UUIDs
- [class-validator](https://www.npmjs.com/package/class-validator): Allows use of decorator and non-decorator based validation
- [supertest](https://www.npmjs.com/package/supertest): Generate the same mock data every time the project is restarted 
## Running the app

```bash
# development
$ docker-compose up
```
## Stay in touch

- Author - [André Melinski](https://www.linkedin.com/in/andr%C3%A9-melinski-aab0b6138/)