==Description==
A service that allows players of an online game to submit feedback for their last game session, and allows members of an operations team to view the feedback.

==Requirements==
- Node.js (LTS, Latest)
- MYSQL (5.7+, must be up and running)
- Configure db connection (host, user, password) in config.*.json
- By default server will be running at http://localhost:3000
- Use feedback-demo-client as Api client (separate project)

==Run==
dev version
>> npm run dev

prod version
>> npm run prod

==Database==
Development database will be created automatically after npm install (if not already exist), this require MySQL server to be running.


==Full Documentation==
Swagger (OpenApi) Api documentation
>> /api/v1/docs

Endpoints:
- GET /api/v1/signin // Admin|User, used for getting a OAuth2 token
- GET /api/v1/feedback // Admin, get all feedbacks, has multiple filters
- GET /api/v1/feedback/:feedbackId // Admin, get single feedback
- POST /api/v1/feedback // User, create feedback
- PUT /api/v1/feedback/:feedbackId // Admin, update feedback
- DELETE /api/v1/feedback/:feedbackId // Admin, delete feedback
- POST /api/v1/session // User, create session
- GET /api/v1/docs // Public, Api docs

Roles:
- User
- Admin

To login use one of the following users
Admins:
    Name: admin
    Password admin
Users:
    Name: Jon
    Password: KingOfTheNorth
    
    Name: Sansa
    Password: QueenOfTheNorth

    Name: Arya
    Password: Assassin

    Name: Bran
    Password: BrokenKing

    Name: Robb
    Password: NobleMan

    Name: Edd
    Password: BadWedding

    Name: Catelyn
    Password: LadyCat

    Name: HODOR
    Password: HoldTheDoor

==Deployment==
// TODO project build with gulp, use docker, create Postman requests collection with all endpoints

==Tests==
// TODO, cover all endpoints with unit tests

To force create database if not exists
>> node create-dev-db.js

Migrations engine
>> https://knexjs.org/

Migrations
>> node_modules/.bin/knex init
>> node_modules/.bin/knex migrate:make migration_name
>> node_modules/.bin/knex migrate:latest
>> node_modules/.bin/knex migrate:rollback

Seed
>> node_modules/.bin/knex seed:make seed_name
>> node_modules/.bin/knex seed:run


NOTES: Due to time limitations there are some limitations and assumptions:
- Models baked into controllers
- Authorization part is very simplified
- User's sign in creates a new session (1 user = 1 session, APi supports multiple, but at client demonstrated only one)
- Password shouldn't be in get request
- Pagination is very simplified
- Roles and Token are baked into user table
- Prod config is the same as dev
- Server is not https
- Users are created during database created (seed)
- Lack of comments and function annotation/documentation


