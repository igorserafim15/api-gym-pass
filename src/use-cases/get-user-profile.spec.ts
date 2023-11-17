import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserProfileUseCase } from './get-user-profile-use-case'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { randomUUID } from 'crypto'
import { ResourceNotFoundError } from './errors/resource-not-found'

let repository: InMemoryUsersRepository
let getProfileRepository: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryUsersRepository()
    getProfileRepository = new GetUserProfileUseCase(repository)
  })

  it('should be able to get user profile', async () => {
    const user = await repository.create({
      id: randomUUID(),
      email: 'user@example.com',
      password: '123456',
      name: 'John Doe',
    })

    const userProfile = await getProfileRepository.execute({
      userId: user.id,
    })

    expect(userProfile.user.id).toBeTypeOf('string')
    expect(userProfile.user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    expect(() =>
      getProfileRepository.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
