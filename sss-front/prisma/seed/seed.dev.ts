import prisma from '../client'

async function seed() {
    try {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Development seed should not be run in production!')
        }

        // seed users
        await prisma.user.createMany({
            data: [
                {
                    email: 'admin@admin.com',
                    password: 'admin',
                    name: 'admin',
                    role: 'ADMIN',
                },
                {
                    email: 'user@user.com',
                    password: 'useruser',
                    name: 'user',
                    role: 'USER',
                },
                {
                    email: 'guest@guest.com',
                    password: 'guest',
                    name: 'guest',
                    role: 'GUEST',
                },
                {
                    email: 'prod@prod.com',
                    password: 'producer',
                    name: 'prod',
                    role: 'SAMPLEPRODUCER',
                },
            ],
        })

        console.log('DEV: users seeded')
    } catch (error) {
        console.error('Error during TEST database seeding:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

seed()
