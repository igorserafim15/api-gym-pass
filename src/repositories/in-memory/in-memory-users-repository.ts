import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../interfaces/users-respository'

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = []

  async findByEmail(email: string) {
    const user = this.users.find((user) => user.email === email)

    return user ?? null
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id)

    return user ?? null
  }
}
