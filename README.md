==Description==
A service that allows players of an online game to submit feedback for their last game session, and allows members of an operations team to view the feedback.

==Run==
dev version
>> npm run dev

prod version
>> npm run prod

==Tests==

==Build==

==Docs==
>> /api-docs

==Deployment==

==Database==
Development database will be created automatically after npm install (if not already exist), this require MySQL server to be running

To force create database if not exists
>> node create-dev-db.js

Migragions engine
>> https://knexjs.org/

Migrations
>> node_modules/.bin/knex init
>> node_modules/.bin/knex migrate:make migration_name
>> node_modules/.bin/knex migrate:latest
>> node_modules/.bin/knex migrate:rollback

Seed
>> node_modules/.bin/knex seed:make seed_name
>> node_modules/.bin/knex seed:run