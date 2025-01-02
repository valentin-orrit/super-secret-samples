import { PrismaClient, Instrument, Genre, Tag } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma

export type { Instrument, Genre, Tag }
