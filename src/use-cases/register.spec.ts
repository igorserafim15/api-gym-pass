import { it, describe, expect } from 'vitest'
import { RegisterUseCase } from './register-use-case'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exist'

describe('Register User Case', () => {
  it('should be able to register', async () => {
    const repository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(repository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toBeTypeOf('string')
  })

  it('should hash user password upn registration', async () => {
    const repository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(repository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    const isPasswordMatches = await compare('123456', user.password)

    expect(isPasswordMatches).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const repository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(repository)

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
