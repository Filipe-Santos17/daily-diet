import { scryptSync } from "node:crypto"
import { env } from "@/env"

export default function createStrongPassword(password: string) {
  if (typeof password === "string"){
    return scryptSync(password, env.SALT, 16).toString("hex");
  }

  return null
}