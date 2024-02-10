import { FastifyRequest, FastifyReply } from "fastify"
import { randomUUID } from "node:crypto"
import { z } from "zod"
import { db } from "@/db/database"
import { env } from "@/env"
import createStrongPassword from "@/utils/createStrongPassword"
import { createUserUseCase, verifyUserAlreadyExistUseCase, loginEmailUseCase } from "@/use-cases/userUserCase"

export default {
  async createUser(req: FastifyRequest, rep: FastifyReply) {
    const validateUserSchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const isSchemaValid = validateUserSchema.safeParse(req.body)

    if (!isSchemaValid.success) {
      return rep.status(406).send({ "msg": "Informações Incompletas" })
    }

    const { name, email, password } = isSchemaValid.data

    const verifyUserEnt = new verifyUserAlreadyExistUseCase(db)

    const emailAlreadyExists = await verifyUserEnt.execute(email)

    if (emailAlreadyExists) {
      const strongPassword = createStrongPassword(password);

      const createUserEnt = new createUserUseCase(db)

      if (strongPassword) {
        await createUserEnt.execute({
          id: randomUUID(),
          name,
          email,
          password: strongPassword,
        })
      }

      return rep.status(200).send({ "msg": "ok" })
    } else {
      return rep.status(401).send({ "msg": "Email Já existe" })
    }
  },

  async loginUser(req: FastifyRequest, rep: FastifyReply) {
    const validateLoginSchema = z.object({
      email: z.string(),
      password: z.string(),
    })

    const isSchemaValid = validateLoginSchema.safeParse(req.body)

    if (!isSchemaValid.success) {
      return rep.status(406).send({ "msg": "Informações Incompletas" })
    }

    const { email, password } = isSchemaValid.data

    const loginUser = new loginEmailUseCase(db)

    const strongPassword = createStrongPassword(password)

    if (strongPassword) {
      const userObj = await loginUser.execute(email, strongPassword)

      if (userObj) {
        return rep.status(200).send(userObj)
      }

      return rep.status(401).send({ "msg": "Senha ou Email Incorretos" })
    }
  },

  async deleteUser(req: FastifyRequest, rep: FastifyReply) {

  }
}