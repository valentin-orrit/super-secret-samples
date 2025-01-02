import { PrismaClient, Instrument, Genre } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma

export type { Instrument, Genre }
