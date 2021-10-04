import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table: Knex.TableBuilder) => {
    // table.uuid("id").primary().notNullable().unique();
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("username").notNullable().unique();
    table.string("password").notNullable();
    // Auth Sessions
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {}
