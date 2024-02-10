import { Knex } from "knex"
import { Tables } from "knex/types/tables"

export type User = {
  id: string
  name: string
  email: string
  password: string
  created_at?: string
  updated_at?: string
}

export type DBTypes = Knex<Tables> 

export interface UserInterface {
  findByEmail(email: string): Promise<User[] | null>
  create(data: Knex): Promise<User>
}
