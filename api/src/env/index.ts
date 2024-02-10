import { config } from "dotenv";
import { z } from "zod";

if (process.env.NODE_ENV === "test") {
  config({ path: '.env.test' })
} else {
  config()
}

const zodSchema = z.object({
  PORT: z.coerce.number().default(3000),
  DATABSE_PATH: z.string(),
  NODE_ENV: z.enum(['test', 'development', 'production']).default("development"),
  SALT: z.string(),
})

const _env = zodSchema.safeParse(process.env)

if (!_env.success) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data