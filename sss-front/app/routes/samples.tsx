import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import prisma from '../../prisma/client'
import WelcomeToast from '../components/Toast'
import SampleDisplay from '../components/SampleDisplay'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export async function loader() {
    const samples = await prisma.sample.findMany({
        include: { genres: true, instruments: true, tags: true },
    })
    const instruments = await prisma.instrument.findMany()
    const genres = await prisma.genre.findMany()
    const tags = await prisma.tag.findMany()
    return { samples, instruments, genres, tags }
}

export default function SamplesPage() {
    const { samples } = useLoaderData<typeof loader>()

    return (
        <div>
            <WelcomeToast />
            <div
                id="main"
                className="flex flex-col justify-center items-center bg-amber-50"
            >
                <div className="w-full my-4 px-4">
                    {samples?.map((sample) => (
                        <SampleDisplay sample={sample} key={sample.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}
