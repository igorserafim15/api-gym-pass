import { UsersRepository } from '@/repositories/interfaces/users-respository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exist'
import { User } from '@prisma/client'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute(
    data: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    const emailAlreadyExist = await this.usersRepository.findByEmail(data.email)

    if (emailAlreadyExist) {
      throw new UserAlreadyExistsError()
    }

    const password = await hash(data.password, 6)

    const user = await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password,
    })

    return { user }
  }
}
