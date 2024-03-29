import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('snacks', table => {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.string('description').notNullable()
    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable()
    table.dateTime('updated_at').defaultTo(knex.fn.now()).notNullable()
    table.boolean('is_diety').notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("snacks")
}

