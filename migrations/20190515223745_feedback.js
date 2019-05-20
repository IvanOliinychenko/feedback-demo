exports.up = (knex, Promise) => {
    let feedbackEntity = `
    CREATE TABLE \`feedback\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`playerId\` int(10) unsigned NOT NULL COMMENT 'Player Id',
      \`playerSessionId\` int(10) unsigned NOT NULL COMMENT 'Player session Id',
      \`comment\` text DEFAULT NULL COMMENT 'Comment',
      \`rating\` tinyint(4) unsigned NOT NULL COMMENT 'Rating',
      \`isActive\` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT 'Indicates if comment was removed',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`),
      UNIQUE (\`playerId\`, \`playerSessionId\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `

    let playerEntity = `
    CREATE TABLE \`player\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`nickName\` varchar(255) NOT NULL COMMENT 'Player's nickname,
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Player Entity';
    `
    
    let sessionEntity = `
    CREATE TABLE \`session\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `
    let playerSessionEntity = `
    CREATE TABLE \`player_session\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`playerId\` int(10) unsigned NOT NULL COMMENT 'Player Id',
      \`sessionId\` int(10) unsigned NOT NULL COMMENT 'Session Id',
      \`feedbackId\` int(10) unsigned DEFAULT NULL COMMENT 'Feedback Id',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`),
      UNIQUE (\`playerId\`, \`sessionId\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `

    let playerForeignKeys = `
      ALTER TABLE feedback 
      ADD FOREIGN KEY (playerId) REFERENCES player(id),
      ADD FOREIGN KEY (playerSessionId) REFERENCES player_session(id);
    `

    let playerSessionForeignKeys = `
      ALTER TABLE player_session
      ADD FOREIGN KEY (playerId) REFERENCES player(id),
      ADD FOREIGN KEY (sessionId) REFERENCES session(id),
      ADD FOREIGN KEY (feedbackId) REFERENCES feedback(id);
    `

    return knex.schema
         .raw(feedbackEntity)
         .raw(playerEntity)
         .raw(sessionEntity)
         .raw(playerSessionEntity)
         .raw(playerForeignKeys)
         .raw(playerSessionForeignKeys)
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema
        .dropTableIfExists('feedback')
        .dropTableIfExists('player')
        .dropTableIfExists('session')
        .dropTableIfExists('player_session')
  };