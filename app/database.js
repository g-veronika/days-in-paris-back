const {Pool} = require('pg');

const pool = new Pool({ 

    //Utilisation database_URL
    connectionString: process.env.DATABASE_URL,
    //Pour ignorer la connexion SSL 
    ssl: {
        rejectUnauthorized: false
      }
});

module.exports = pool; 