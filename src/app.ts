import fastify from 'fastify'
import { authenticateRoutes } from './http/controller/routes'

export const app = fastify()

app.register(authenticateRoutes)
