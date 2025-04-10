import { useState, useEffect } from 'react'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData, useSearchParams } from '@remix-run/react'
import prisma, { Sample } from '../../prisma/client'
import WelcomeToast from '../components/Toast'
import SamplesHeader from '~/components/SamplesHeader'
import SampleDisplay from '../components/SampleDisplay'
import AudioPlayer from '../components/AudioPlayer'
import SamplePagination from '../components/SamplePagination'
import { AudioController } from '../lib/audio-controller'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '10', 10)
    const skip = (page - 1) * pageSize

    // Get paginated samples
    const samples = await prisma.sample.findMany({
        skip,
        take: pageSize,
        include: { genres: true, instruments: true, tags: true },
        orderBy: { name: 'asc' },
    })

    const totalCount = await prisma.sample.count()

    const instruments = await prisma.instrument.findMany()
    const genres = await prisma.genre.findMany()
    const tags = await prisma.tag.findMany()

    return {
        samples,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        instruments,
        genres,
        tags,
    }
}

const audioController =
    typeof window !== 'undefined' ? new AudioController() : null

export default function SamplesPage() {
    const { samples, page, pageSize, totalPages } =
        useLoaderData<typeof loader>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentSample, setCurrentSample] = useState<Sample | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)

    // Reset playback state when page changes
    useEffect(() => {
        setIsPlaying(false)
        setCurrentSample(null)
    }, [page, pageSize])

    // Reset loop state when current sample changes
    useEffect(() => {
        if (currentSample) {
            setIsLooping(currentSample.loop)
        } else {
            setIsLooping(false)
        }
    }, [currentSample])

    const handleSampleClick = (sampleId: Sample['id']) => {
        if (isPlaying) {
            audioController?.stop()
            setIsPlaying(false)
        }

        if (currentSample?.id === sampleId) {
            if (isPlaying) {
                audioController?.pause()
                setIsPlaying(false)
            } else {
                audioController?.play()
                setIsPlaying(true)
            }
            return
        }

        setCurrentSample(null)

        setTimeout(() => {
            const newSample = samples.find((sample) => sample.id === sampleId)
            if (!newSample) return
            setCurrentSample(newSample)
        }, 10)
    }

    const handlePageChange = (newPage: number) => {
        searchParams.set('page', newPage.toString())
        setSearchParams(searchParams)
    }

    return (
        <div>
            <WelcomeToast />
            <div
                id="main"
                className="flex flex-col justify-center items-center bg-white"
            >
                <div className="w-full my-4 px-4">
                    <SamplesHeader />
                    {samples?.map((sample) => (
                        <SampleDisplay
                            key={sample.id}
                            sample={sample}
                            onClick={() => handleSampleClick(sample.id)}
                            isActive={currentSample?.id === sample.id}
                        />
                    ))}
                </div>

                <SamplePagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />

                <div id="empty-margin" className="my-16"></div>

                <div className="z-100 fixed bottom-0 md:w-3/4 xl:w-1/2">
                    <AudioPlayer
                        currentSample={currentSample}
                        isPlaying={isPlaying}
                        isLooping={isLooping}
                        setIsPlaying={setIsPlaying}
                        setIsLooping={setIsLooping}
                        audioController={audioController}
                    />
                </div>
            </div>
        </div>
    )
}
