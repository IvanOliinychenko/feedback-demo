var {
  ADMIN,
  USER
} = require('../helpers/roleHelper');
var bcrypt = require('bcrypt');
var saltRounds = require('../config.dev.json').bcryptRounds;

exports.seed = function(knex, Promise) {
  return knex('user').del()
    .then(function () {
      return knex('user').insert([{
          name: 'admin',
          role: ADMIN,
          token: 'demo-admin',
          password: bcrypt.hashSync('admin', saltRounds)
        }, {
          name: 'Jon',
          role: USER,
          token: 'demo-user1',
          password: bcrypt.hashSync('KingOfTheNorth', saltRounds)
        }, {
          name: 'Sansa',
          role: USER,
          token: 'demo-user2',
          password: bcrypt.hashSync('QueenOfTheNorth', saltRounds)
        }, {
          name: 'Arya',
          role: USER,
          token: 'demo-user3',
          password: bcrypt.hashSync('Assassin', saltRounds)
        }, {
          name: 'Bran',
          role: USER,
          token: 'demo-user4',
          password: bcrypt.hashSync('BrokenKing', saltRounds)
        }, {
          name: 'Robb',
          role: USER,
          token: 'demo-user5',
          password: bcrypt.hashSync('NobleMan', saltRounds)
        }, {
          name: 'Edd',
          role: USER,
          token: 'demo-user6',
          password: bcrypt.hashSync('BadWedding', saltRounds)
        }, {
          name: 'Catelyn',
          role: USER,
          token: 'demo-user7',
          password: bcrypt.hashSync('LadyCat', saltRounds)
        }, {
          name: 'HODOR',
          role: USER,
          token: 'demo-user8',
          password: bcrypt.hashSync('HoldTheDoor', saltRounds)
        }
      ]);
    });
};
