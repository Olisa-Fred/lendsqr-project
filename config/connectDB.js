/** 
    createdBy: Olisaemeka Ezema
**/

const knex = require('knex');
const knexfile = require('./knexfile');

const connect = knex(knexfile.development);

module.exports = connect;
