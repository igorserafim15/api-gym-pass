import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let repository: InMemoryUsersRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate User Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(repository)
  })

  it('should be able to authenticate', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
    })

    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toBeTypeOf('string')
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await repository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@gmail.com',
        password: 'abcdef',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
