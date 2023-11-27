import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckInUseCase } from './check-in-use-case'

let repository: InMemoryCheckInsRepository
let getProfileRepository: CheckInUseCase

describe('Check Ins Use Case', () => {
  beforeEach(() => {
    repository = new InMemoryCheckInsRepository()
    getProfileRepository = new CheckInUseCase(repository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to create check in', async () => {
    const { checkIn } = await getProfileRepository.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    expect(checkIn.id).toBeTypeOf('string')
  })

  it('should be able to create check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))

    await getProfileRepository.execute({
      gymId: 'gym-1',
      userId: 'user-1',
    })

    await expect(() =>
      getProfileRepository.execute({
        gymId: 'gym-1',
        userId: 'user-1',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
