import { FastifyInstance } from 'fastify'
import { register } from './register-controller'

export async function authenticateRoutes(app: FastifyInstance) {
  app.post('/users', register)
}
