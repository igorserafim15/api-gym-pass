import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../interfaces/check-ins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkIns.push(checkIn)

    return checkIn
  }
}
