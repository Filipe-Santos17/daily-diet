// eslint-disable-next-line
import 'knex'
import { User } from './users'

declare module 'knex/types/tables' {
  export interface Tables {
    users: User    
  }
}
