import { useState, useEffect } from 'react'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import {
    useLoaderData,
    useSearchParams,
    useSubmit,
    useNavigation,
} from '@remix-run/react'
import prisma, { Sample } from '../../prisma/client'
import WelcomeToast from '../components/Toast'
import SampleHeader from '../components/SampleHeader'
import SampleTableHead from '../components/SampleTableHead'
import SampleDisplay from '../components/SampleDisplay'
import AudioPlayer from '../components/AudioPlayer'
import SamplePagination from '../components/SamplePagination'
import { AudioController } from '../lib/audio-controller'
import { useSearchStore } from '../store'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '1', 10)
    const pageSize = parseInt(url.searchParams.get('pageSize') || '15', 15)
    const searchTerm = url.searchParams.get('search') || ''

    const whereClause = searchTerm
        ? {
              name: {
                  contains: searchTerm,
                  mode: 'insensitive' as const,
              },
          }
        : {}

    const totalCount = await prisma.sample.count({
        where: whereClause,
    })

    // Calculate pagination
    const skip = searchTerm ? 0 : (page - 1) * pageSize
    const take = searchTerm ? undefined : pageSize

    // Get samples with search filter
    const samples = await prisma.sample.findMany({
        where: whereClause,
        skip,
        take,
        include: { genres: true, instruments: true, tags: true },
        orderBy: { name: 'asc' },
    })

    const instruments = await prisma.instrument.findMany()
    const genres = await prisma.genre.findMany()
    const tags = await prisma.tag.findMany()

    return {
        samples,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        searchTerm,
        instruments,
        genres,
        tags,
    }
}

const audioController =
    typeof window !== 'undefined' ? new AudioController() : null

export default function SamplesPage() {
    const {
        samples,
        page,
        pageSize,
        totalPages,
        searchTerm: initialSearchTerm,
        totalCount,
    } = useLoaderData<typeof loader>()
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentSample, setCurrentSample] = useState<Sample | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const { searchTerm, setSearchTerm } = useSearchStore()
    const submit = useSubmit()
    const navigation = useNavigation()

    // Sync the URL search param with the store when the page loads
    useEffect(() => {
        if (initialSearchTerm !== searchTerm) {
            setSearchTerm(initialSearchTerm)
        }
    }, [initialSearchTerm, setSearchTerm])

    // When search term changes in the store, update the URL and reload data
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchParams.get('search') !== searchTerm) {
                const newParams = new URLSearchParams(searchParams)

                if (searchTerm) {
                    newParams.set('search', searchTerm)
                    // Reset to page 1 when searching
                    if (newParams.has('page')) {
                        newParams.set('page', '1')
                    }
                } else {
                    newParams.delete('search')
                }

                submit(newParams, { replace: true })
            }
        }, 300)

        return () => clearTimeout(timer)
    }, [searchTerm, searchParams, submit])

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

    const isLoading =
        navigation.state === 'loading' || navigation.state === 'submitting'

    return (
        <div>
            <WelcomeToast />
            <SampleHeader
                title="samples"
                totalCount={totalCount}
                isLoading={isLoading}
            />
            <div
                id="main"
                className="flex flex-col justify-center items-center bg-white"
            >
                <div className="w-full mb-4 px-4">
                    <div className="sticky top-[69px] z-50 bg-white">
                        <SampleTableHead />
                    </div>
                    {isLoading ? (
                        <div className="text-center py-8">
                            <p>Loading samples...</p>
                        </div>
                    ) : samples.length > 0 ? (
                        samples.map((sample) => (
                            <SampleDisplay
                                key={sample.id}
                                sample={sample}
                                onClick={() => handleSampleClick(sample.id)}
                                isActive={currentSample?.id === sample.id}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            No samples found matching &quot;{searchTerm}&quot;
                        </div>
                    )}
                </div>

                {/* Only show pagination when not searching */}
                {!searchTerm && (
                    <SamplePagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

                <div id="empty-margin" className="my-16"></div>

                <div className="z-100 fixed bottom-0 md:w-3/4">
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
