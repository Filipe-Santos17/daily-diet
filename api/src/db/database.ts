import { knex, Knex } from "knex";
import { env } from "@/env";

export const configDB : Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: env.DATABSE_PATH,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/db/migrations',
  }
}

export const db = knex(configDB)