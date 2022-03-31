/** 
    createdBy: Olisaemeka Ezema
**/

exports.up = function(knex) {
    return knex.schema.createTable('account', (table) =>{
        table.increments('account_id').primary();
        table.string('account_name').notNullable();
        table.integer('account_number', 10).notNullable().unique();
        table.integer('account_balance', 15).defaultTo(0);
        table.integer('user_id').references('id').inTable('user');
        table.timestamps(true, true);
  
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("account");
};