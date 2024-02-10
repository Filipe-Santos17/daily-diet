import { describe, it, beforeAll, afterAll, expect, beforeEach } from "vitest";
import { createUserUseCase, verifyUserAlreadyExistUseCase, loginEmailUseCase } from "@/use-cases/userUserCase"
import { app } from "@/app";
import { db } from "@/db/database";
import { execSync } from "node:child_process";
import createStrongPassword from "@/utils/createStrongPassword"

describe("user testes", () => {

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be possible create a user', async () => {
    const createUser = new createUserUseCase(db)

    const userCreated = await createUser.execute({
      id: '5234-uff',
      name: 'Filipe',
      email: 'Filipe@gmail.com',
      password: 'teste'
    })

    expect(userCreated).equal(true)
  })

  it('should not possible create a user with the same email', async () => {
    const emailExist = new verifyUserAlreadyExistUseCase(db)

    const emailAlreadyExist = await emailExist.execute('Filipe@gmail.com')

    expect(emailAlreadyExist).equal(null)
  })

  it('should be possible make a login', async () => {
    const infoUser = {
      email: 'Filipe2@gmail.com',
      password: 'teste2'
    }

    const createUser = new createUserUseCase(db)

    await createUser.execute({
      id: '5234-uff',
      name: 'Filipe',
      email: infoUser.email,
      password: infoUser.password,
    })

    const testUserLogin = new loginEmailUseCase(db)

    const user = await testUserLogin.execute(infoUser.email, infoUser.password)

    expect(user?.id).toEqual(expect.any(String))
  })
})
