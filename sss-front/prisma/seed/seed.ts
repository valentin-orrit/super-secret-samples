import prisma from '../client'
import { instruments } from './instruments'
import { genres } from './genres'

async function seed() {
    try {
        // seed instruments
        for (const instrument of instruments) {
            await prisma.instrument.create({
                data: instrument,
            })
        }
        console.log('instruments seeded')

        // seed genres
        for (const genre of genres) {
            await prisma.genre.create({
                data: genre,
            })
        }
        console.log('genres seeded')

        //seed
    } catch (error) {
        console.error('Error during database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
