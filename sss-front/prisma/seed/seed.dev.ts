import prisma from '../client'

async function seed() {
    try {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Development seed should not be run in production!')
        }

        // seed admin
        await prisma.user.create({
            data: {
                email: 'admin@admin.com',
                name: 'admin',
                role: 'ADMIN',
            },
        })
    } catch (error) {
        console.error('Error during TEST database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
