import prisma from '../client'
import { instruments } from './instruments'

async function seed() {
    try {
        // reset db
        await prisma.user.deleteMany()
        await prisma.sample.deleteMany()
        await prisma.instrument.deleteMany()
        await prisma.genre.deleteMany()
        await prisma.tag.deleteMany()
        await prisma.like.deleteMany()
        await prisma.downloaded.deleteMany()

        console.log('Database reset successful')

        // seed instruments
        for (const instrument of instruments) {
            await prisma.instrument.create({
                data: instrument,
            })
        }

        console.log('Instruments seeded')

        // seed genres
    } catch (error) {
        console.error('Error during database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
