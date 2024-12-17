import prisma from '../client'
import { Role } from '@prisma/client'

async function seed() {
    const testUsers = [
        {
            clerkUserId: 'user_2qL6gvXVKTdRm4WRJS2072HvV8a',
            role: Role.ADMIN,
        },
        {
            clerkUserId: 'user_2qL6jpnSklaTasImaZ4ZKCsywz4',
            role: Role.USER,
        },
        {
            clerkUserId: 'user_2qL6mvwl9F2Ea9CBxVl6r1msfou',
            role: Role.GUEST,
        },
        {
            clerkUserId: 'user_2qL6qUhK03xqxRmmeJFL6vyb8s6',
            role: Role.SAMPLEPRODUCER,
        },
    ]

    console.log('🌱 Starting to seed test users...')

    for (const userData of testUsers) {
        const user = await prisma.user.upsert({
            where: { clerkUserId: userData.clerkUserId },
            update: {},
            create: {
                clerkUserId: userData.clerkUserId,
                role: userData.role,
            },
        })
        console.log(`Created user with role ${userData.role}:`, user)
    }

    console.log('✅ Seeding complete!')
}

seed()
    .catch((error) => {
        console.error('Error during database seeding:', error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
