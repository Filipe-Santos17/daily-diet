import { DBTypes, User } from "@/@types/users";

export class createUserUseCase {
  private userDB;

  constructor(db: DBTypes) {
    this.userDB = db('users')
  }

  async execute({ id, name, email, password }: User): Promise<boolean> {
    await this.userDB.insert({
      id,
      name,
      email,
      password,
    })

    return true
  }
}

export class verifyUserAlreadyExistUseCase {
  private userDB;

  constructor(db: DBTypes) {
    this.userDB = db('users')
  }

  async execute(email: string): Promise<User[] | null> {
    const emailAlreadyExists = await this.userDB.where({ email })
    return emailAlreadyExists.length ? emailAlreadyExists : null
  }
}

export class loginEmailUseCase {
  private userDB;

  constructor(db: DBTypes) {
    this.userDB = db('users')
  }

  async execute(email: string, password: string) {
    const [user] = await this.userDB.where({ email })

    if (!user) {
      return null
    }

    return user.password === password ? user : null
  }
}