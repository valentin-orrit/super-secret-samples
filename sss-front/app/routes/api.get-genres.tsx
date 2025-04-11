import prisma from 'prisma/client'

export async function loader() {
    try {
        const genres = await prisma.genre.findMany()
        return genres
    } catch (error) {
        console.error('Error fetching instruments:', error)
        return new Response('Error accessing instruments', { status: 500 })
    }
}
