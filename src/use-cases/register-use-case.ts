import { UsersRepository } from '@/repositories/users-respository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exist'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: RegisterUseCaseRequest) {
    const emailAlreadyExist = await this.usersRepository.findByEmail(data.email)

    if (emailAlreadyExist) {
      throw new UserAlreadyExistsError()
    }

    const password = await hash(data.password, 6)

    await this.usersRepository.create({
      name: data.name,
      email: data.email,
      password,
    })
  }
}
