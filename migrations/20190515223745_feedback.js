exports.up = (knex, Promise) => {
    let feedbackEntity = `
    CREATE TABLE \`feedback\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`userId\` int(10) unsigned NOT NULL COMMENT 'User Id',
      \`userSessionId\` int(10) unsigned NOT NULL COMMENT 'User session Id',
      \`comment\` text DEFAULT NULL COMMENT 'Comment',
      \`rating\` tinyint(4) unsigned NOT NULL COMMENT 'Rating',
      \`isActive\` tinyint(1) unsigned NOT NULL DEFAULT 1 COMMENT 'Indicates if comment was removed',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`),
      UNIQUE (\`userId\`, \`userSessionId\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `

    let userEntity = `
    CREATE TABLE \`user\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`name\` varchar(255) NOT NULL COMMENT 'User name',
      \`role\` tinyint(4) unsigned NOT NULL COMMENT 'User role',
      \`token\` VARCHAR(255) NOT NULL COMMENT 'User access token',
      \`password\` VARCHAR(255) NOT NULL COMMENT 'User password',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`),
      UNIQUE (\`token\`),
      UNIQUE (\`name\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='User Entity';
    `

    // Normally I would use role and token as separate entities, but since it's a demo let them be direcly in user's table

    // let roleEntity = `
    // CREATE TABLE \`role\` (
    //   \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
    //   \`name\` varchar(32) NOT NULL COMMENT 'Role name',
    //   \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
    //   \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
    //   PRIMARY KEY (\`id\`),
    //   UNIQUE (\`name\`)
    // ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Role Entity';
    // `

    // let tokenEntity = `
    // CREATE TABLE \`token\` (
    //   \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
    //   \`token\` varchar(64) NOT NULL COMMENT 'Token',
    //   \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
    //   \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
    //   PRIMARY KEY (\`id\`),
    //   UNIQUE (\`token\`)
    // ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Token Entity';
    // `
    
    let sessionEntity = `
    CREATE TABLE \`session\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `

    let userSessionEntity = `
    CREATE TABLE \`user_session\` (
      \`id\` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Entity Id',
      \`userId\` int(10) unsigned NOT NULL COMMENT 'User Id',
      \`sessionId\` int(10) unsigned NOT NULL COMMENT 'Session Id',
      \`feedbackId\` int(10) unsigned DEFAULT NULL COMMENT 'Feedback Id',
      \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Created At',
      \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Updated At',
      PRIMARY KEY (\`id\`),
      UNIQUE (\`userId\`, \`sessionId\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Feedback Entity';
    `

    let feedbackForeignKeys = `
      ALTER TABLE feedback 
      ADD FOREIGN KEY (userId) REFERENCES user(id),
      ADD FOREIGN KEY (userSessionId) REFERENCES user_session(id);
    `

    // let userForeignKeys = `
    //   ALTER TABLE user 
    //   ADD FOREIGN KEY (roleId) REFERENCES role(id),
    //   ADD FOREIGN KEY (tokenId) REFERENCES token(id);
    // `

    let userSessionForeignKeys = `
      ALTER TABLE user_session
      ADD FOREIGN KEY (userId) REFERENCES user(id),
      ADD FOREIGN KEY (sessionId) REFERENCES session(id),
      ADD FOREIGN KEY (feedbackId) REFERENCES feedback(id);
    `

    return knex.schema
         .raw(feedbackEntity)
         .raw(userEntity)
        //  .raw(roleEntity)
        //  .raw(tokenEntity)
         .raw(sessionEntity)
         .raw(userSessionEntity)
         .raw(feedbackForeignKeys)
        //  .raw(userForeignKeys)
         .raw(userSessionForeignKeys)
  };
  
  exports.down = (knex, Promise) => {
    return knex.schema
        .dropTableIfExists('feedback')
        .dropTableIfExists('user')
        .dropTableIfExists('session')
        .dropTableIfExists('user_session')
  };