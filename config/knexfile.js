/** 
    createdBy: Olisaemeka Ezema
**/

require('dotenv').config();

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      port : 3306,
      user : process.env.MYSQL_USERNAME,
      password : process.env.MYSQL_PASSWORD,
      database : 'lendsqr'
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
