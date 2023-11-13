import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const body = bodySchema.parse(req.body)

  try {
    const repository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(repository)

    await authenticateUseCase.execute(body)
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return res.status(401).send({ message: err.message })
    }

    throw err
  }

  return res.status(200).send()
}
