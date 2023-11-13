import { it, describe, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist'

let repository: InMemoryUsersRepository
let registerUseCase: RegisterUseCase

describe('Register User Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(repository)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toBeTypeOf('string')
  })

  it('should hash user password upn registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordMatches = await compare('123456', user.password)

    expect(isPasswordMatches).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email: 'johndoe@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
