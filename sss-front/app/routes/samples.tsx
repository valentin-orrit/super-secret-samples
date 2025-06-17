/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import type { LoaderFunctionArgs, MetaFunction } from 'react-router'
import {
    useLoaderData,
    useSearchParams,
    useSubmit,
    useNavigation,
} from 'react-router'
import prisma, { Sample } from '../../prisma/client'
import SampleFilterSection from '../components/SampleFilterSection'
import SampleTableHead from '../components/SampleTableHead'
import SampleDisplay from '../components/SampleDisplay'
import AudioPlayer from '../components/AudioPlayer'
import SamplePagination from '../components/SamplePagination'
import { AudioController } from '../lib/audio-controller'
import { getStreamUrl } from '../lib/sample-urls'
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
    const selectedInstrument = url.searchParams.get('instrument') || ''
    const selectedGenre = url.searchParams.get('genre') || ''
    const sortField = url.searchParams.get('sortField') || 'name'
    const sortDirection = (url.searchParams.get('sortDirection') || 'asc') as
        | 'asc'
        | 'desc'

    // Build where clause with all filters
    const whereConditions = []

    // Search term filter
    if (searchTerm) {
        whereConditions.push({
            OR: [
                {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive' as const,
                    },
                },
                {
                    tags: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive' as const,
                            },
                        },
                    },
                },
                {
                    genres: {
                        some: {
                            name: {
                                contains: searchTerm,
                                mode: 'insensitive' as const,
                            },
                        },
                    },
                },
            ],
        })
    }

    // Instrument filter
    if (selectedInstrument) {
        whereConditions.push({
            instruments: {
                some: {
                    name: {
                        equals: selectedInstrument,
                        mode: 'insensitive' as const,
                    },
                },
            },
        })
    }

    // Genre filter
    if (selectedGenre) {
        whereConditions.push({
            genres: {
                some: {
                    name: {
                        equals: selectedGenre,
                        mode: 'insensitive' as const,
                    },
                },
            },
        })
    }

    // Combine all conditions with AND
    const whereClause =
        whereConditions.length > 0 ? { AND: whereConditions } : {}

    const totalCount = await prisma.sample.count({
        where: whereClause,
    })

    // Calculate pagination - disable pagination when any filter is active
    const hasFilters = searchTerm || selectedInstrument || selectedGenre
    const skip = hasFilters ? 0 : (page - 1) * pageSize
    const take = hasFilters ? undefined : pageSize

    // Build order by clause
    let orderBy: any = { name: 'asc' }

    switch (sortField) {
        case 'name':
            orderBy = { name: sortDirection }
            break
        case 'length':
            orderBy = { length: sortDirection }
            break
        case 'bpm':
            orderBy = { bpm: sortDirection === 'asc' ? 'asc' : 'desc' }
            break
        case 'key':
            orderBy = { key: sortDirection }
            break
        case 'loop':
            orderBy = { loop: sortDirection }
            break
        case 'instrument':
            orderBy = {
                instruments: {
                    _count: sortDirection,
                },
            }
            break
        default:
            orderBy = { name: 'asc' }
    }

    // Get samples with filters
    const samples = await prisma.sample.findMany({
        where: whereClause,
        skip,
        take,
        include: { genres: true, instruments: true, tags: true },
        orderBy,
    })

    // If sorting by instrument name specifically, we need to do client-side sorting
    // since Prisma doesn't easily support sorting by related field names
    let sortedSamples = samples
    if (sortField === 'instrument') {
        sortedSamples = [...samples].sort((a, b) => {
            const aInstrument = a.instruments[0]?.name || ''
            const bInstrument = b.instruments[0]?.name || ''
            const comparison = aInstrument.localeCompare(bInstrument)
            return sortDirection === 'asc' ? comparison : -comparison
        })
    }

    // Add URLs to samples
    const samplesWithUrls = sortedSamples.map((sample) => ({
        ...sample,
        url: getStreamUrl(sample),
    }))

    return {
        samples: samplesWithUrls,
        totalCount,
        page,
        pageSize,
        totalPages: Math.ceil(totalCount / pageSize),
        searchTerm,
        selectedInstrument,
        selectedGenre,
        sortField,
        sortDirection,
    }
}

const audioController =
    typeof window !== 'undefined' ? new AudioController() : null

export default function SamplesPage() {
    const {
        samples,
        page,
        totalPages,
        searchTerm: initialSearchTerm,
        selectedInstrument: initialSelectedInstrument,
        selectedGenre: initialSelectedGenre,
        totalCount,
        sortField,
        sortDirection,
    } = useLoaderData<typeof loader>()

    const [searchParams, setSearchParams] = useSearchParams()
    const [currentSample, setCurrentSample] = useState<Sample | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const {
        searchTerm,
        selectedInstrument,
        selectedGenre,
        setSearchTerm,
        setSelectedInstrument,
        setSelectedGenre,
    } = useSearchStore()
    const submit = useSubmit()
    const navigation = useNavigation()

    // Sync URL params with store when page loads
    useEffect(() => {
        if (initialSearchTerm !== searchTerm) {
            setSearchTerm(initialSearchTerm)
        }
        if (initialSelectedInstrument !== selectedInstrument) {
            setSelectedInstrument(initialSelectedInstrument || null)
        }
        if (initialSelectedGenre !== selectedGenre) {
            setSelectedGenre(initialSelectedGenre || null)
        }
    }, [initialSearchTerm, initialSelectedInstrument, initialSelectedGenre])

    // When any filter changes in the store, update URL and reload data
    useEffect(() => {
        const timer = setTimeout(() => {
            const currentSearchParam = searchParams.get('search') || ''
            const currentInstrumentParam = searchParams.get('instrument') || ''
            const currentGenreParam = searchParams.get('genre') || ''

            const needsUpdate =
                currentSearchParam !== searchTerm ||
                currentInstrumentParam !== (selectedInstrument || '') ||
                currentGenreParam !== (selectedGenre || '')

            if (needsUpdate) {
                const newParams = new URLSearchParams(searchParams)

                // Update search term
                if (searchTerm) {
                    newParams.set('search', searchTerm)
                } else {
                    newParams.delete('search')
                }

                // Update instrument filter
                if (selectedInstrument) {
                    newParams.set('instrument', selectedInstrument)
                } else {
                    newParams.delete('instrument')
                }

                // Update genre filter
                if (selectedGenre) {
                    newParams.set('genre', selectedGenre)
                } else {
                    newParams.delete('genre')
                }

                // Reset to page 1 when any filter changes
                newParams.set('page', '1')

                submit(newParams, { replace: true })
            }
        }, 300) // debounce

        return () => clearTimeout(timer)
    }, [searchTerm, selectedInstrument, selectedGenre, searchParams, submit])

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

    const handleSort = (field: string) => {
        const newParams = new URLSearchParams(searchParams)

        if (sortField === field) {
            const newDirection = sortDirection === 'asc' ? 'desc' : 'asc'
            newParams.set('sortDirection', newDirection)
        } else {
            newParams.set('sortField', field)
            newParams.set('sortDirection', 'asc')
        }

        newParams.set('page', '1')

        submit(newParams, { replace: true })
    }

    const isLoading =
        navigation.state === 'loading' || navigation.state === 'submitting'

    const hasActiveFilters = searchTerm || selectedInstrument || selectedGenre

    return (
        <div>
            <SampleFilterSection
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
                        <SampleTableHead
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
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
                            No samples found
                            {hasActiveFilters && (
                                <span> matching your filters</span>
                            )}
                        </div>
                    )}
                </div>

                {/* Only show pagination when no filters are active */}
                {!hasActiveFilters && (
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
