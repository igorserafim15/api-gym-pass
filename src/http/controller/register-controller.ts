import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '@/use-cases/register-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exist'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const body = bodySchema.parse(req.body)

  try {
    const repository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(repository)

    await registerUseCase.execute(body)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return res.status(409).send({ message: err.message })
    }

    throw err
  }

  return res.status(201).send()
}
