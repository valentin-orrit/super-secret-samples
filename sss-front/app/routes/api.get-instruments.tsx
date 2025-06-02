import prisma from '../../prisma/client'

export async function loader() {
    try {
        const instruments = await prisma.instrument.findMany()
        return instruments
    } catch (error) {
        console.error('Error fetching instruments:', error)
        return new Response('Error accessing instruments', { status: 500 })
    }
}
