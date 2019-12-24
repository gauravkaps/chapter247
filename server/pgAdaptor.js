const pgPromise = require('pg-promise');

const pgp = pgPromise({}); // Empty object means no additional config required

const configPG = {
    user: 'pguser',
    database: 'mydb',
    password: 'postgres123',
    port: 5432                  //Default port, change it if needed
};

const db = pgp(configPG);

exports.db = db;