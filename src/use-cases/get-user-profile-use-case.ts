import { UsersRepository } from '@/repositories/interfaces/users-respository'
import { ResourceNotFoundError } from './errors/resource-not-found'

interface GetUserProfileUseCaseRequest {
  userId: string
}

export class GetUserProfileUseCase {
  constructor(public usersRepository: UsersRepository) { }

  async execute(props: GetUserProfileUseCaseRequest) {
    const user = await this.usersRepository.findById(props.userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
