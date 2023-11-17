import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in-use-case'

let repository: InMemoryCheckInsRepository
let getProfileRepository: CheckInUseCase

describe('Check Ins Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    getProfileRepository = new CheckInUseCase(repository)
  })

  it('should be able to create check in', async () => {
    const { checkIn } = await getProfileRepository.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toBeTypeOf('string')
  })
})
