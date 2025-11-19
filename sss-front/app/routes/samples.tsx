/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { MetaFunction } from 'react-router'
import {
    useLoaderData,
    useSearchParams,
    useSubmit,
    useNavigation,
} from 'react-router'
import { Sample } from '../../prisma/client'
import SampleFilterSection from '../components/SampleFilterSection'
import SampleTableHead from '../components/SampleTableHead'
import SampleDisplay from '../components/SampleDisplay'
import AudioPlayer from '../components/AudioPlayer'
import SamplePagination from '../components/SamplePagination'
import loader from '../lib/sample-loader'
import { AudioController } from '~/lib/audio-controller'
import { useSearchStore } from '~/store'
import { Loader2 } from "lucide-react"

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

// use sample loader
export { loader }

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
        isShowroomMode,
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
                className="flex flex-col items-center min-h-[calc(100vh-400px)] bg-white"
            >
                <div className="w-full mb-4 px-4 flex-grow flex flex-col">
                    <div className="sticky top-[56px] sm:top-[49px] z-50 bg-white">
                        <SampleTableHead
                            sortField={sortField}
                            sortDirection={sortDirection}
                            onSort={handleSort}
                        />
                    </div>
                    {isLoading ? (
                        <div className="self-center mt-16">
                            <Loader2 className="animate-spin direction-reverse " size="40"/>
                        </div>
                    ) : samples.length > 0 ? (
                        samples.map((sample) => (
                            <SampleDisplay
                                key={sample.id}
                                sample={sample}
                                onClick={() => handleSampleClick(sample.id)}
                                isActive={currentSample?.id === sample.id}
                                isShowroomMode={isShowroomMode}
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

                <div id="empty-margin" className="my-4"></div>

                <div className="sticky bottom-0 z-100 md:w-3/4 max-w-4xl">
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
