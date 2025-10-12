
const { Pool } = require('pg');

const pool = new Pool({
  user: 'Jean',
  host: 'localhost',   
  database: 'ESCUELA',
  password: 'Jean123',
  port: 5432,          
});

module.exports = pool;
