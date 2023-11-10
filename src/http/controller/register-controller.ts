import { prisma } from '@/lib/prisma'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(req: FastifyRequest, res: FastifyReply) {
  const bodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const body = bodySchema.parse(req.body)

  await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  })

  return res.status(201).send()
}
