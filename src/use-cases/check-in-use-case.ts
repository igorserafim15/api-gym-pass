import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute(data: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: data.userId,
      gym_id: data.gymId,
    })

    return { checkIn }
  }
}
