import {
    Sample as PrismaSample,
    Genre,
    Instrument,
    Tag,
} from '../../prisma/client'
import Shape from '../components/Shape'
import { Infinity, Route, Download } from 'lucide-react'
import { toast } from "sonner"

interface Sample extends PrismaSample {
    genres: Genre[]
    instruments: Instrument[]
    tags: Tag[]
}

interface SampleInterface {
    sample: Sample
    onClick?: () => void
    isActive?: boolean
    isShowroomMode?: boolean
}

export default function SampleDisplay({
                                          sample,
                                          onClick,
                                          isActive = false,
                                          isShowroomMode,
                                      }: SampleInterface) {
    const genreAndTags = sample.genres.concat(sample.tags)

    function formatSampleLength(length: number): string {
        const totalSeconds = Math.max(Math.floor(length), 1)
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${String(minutes).padStart(1, '0')}:${String(seconds).padStart(
            1,
            '0'
        )}`
    }

    const handleDownload = async (e: React.MouseEvent) => {
        e.stopPropagation()

        try {
            const downloadUrl = `/api/download-sample/${sample.id}`

            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = `${sample.name}.wav`
            link.target = '_blank'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('Download failed:', error)
        }
    }

    const handleNoDownload = async (e: React.MouseEvent) => {
        e.stopPropagation()
        toast.error('download unavailable in showroom mode')
    }

    const handleSampleClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement
        if (!target.closest('[data-download-button]')) {
            onClick?.()
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const target = e.target as HTMLElement
            if (!target.closest('[data-download-button]')) {
                e.preventDefault()
                onClick?.()
            }
        }
    }

    return (
        <div
            className={`grid grid-flow-col grid-cols-[auto_1fr_auto] sm:grid-cols-9 border-b border-gray-200 w-full px-1 sm:px-4 py-1 my-1 hover:bg-sssoffwhite cursor-pointer items-center rounded-2xl group ${
                isActive
                    ? 'bg-sssoffwhite border border-sssorange hover:bg-sssoffwhite rounded-md'
                    : 'bg-white border border-gray-200 hover:bg-sssoffwhite rounded-md'
            }`}
            onClick={handleSampleClick}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="button"
            aria-label={`Play sample: ${sample.name}`}
            aria-pressed={isActive}
        >
            {/* Instrument Shape - Always visible */}
            <div className="w-12 sm:w-20">
                {sample?.instruments[0]?.name ? (
                    <Shape instrument={sample.instruments[0].name} width={40}/>
                ) : (
                    <Shape instrument="drums" width={40}/>
                )}
            </div>

            {/* Loop indicator - Hidden on mobile */}
            <div className="text-gray-500 text-start hidden sm:block">
                {sample.loop ? <Infinity/> : <Route/>}
            </div>

            {/* Sample name and tags - Always visible */}
            <div
                className="text-sm sm:text-md text-gray-800 font-semibold text-start flex flex-col col-span-1 sm:col-span-4 justify-evenly min-w-0">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {sample.name}
                </p>
                <div className="flex overflow-x-hidden gap-2 my-1 mr-4">
                    {genreAndTags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-gray-500 text-[10px] sm:text-xs font-thin text-nowrap border px-1 rounded-lg border-sssmutegray flex-shrink-0"
                        >
                            {tag.name}{' '}
                        </span>
                    ))}
                </div>
            </div>

            {/* Time, Key, BPM - Hidden on mobile */}
            <div className="col-span-2 grid-flow-col grid-cols-4 gap-x-2 hidden sm:grid">
                <div className="text-gray-700 text-start">
                    {formatSampleLength(sample.length)}
                </div>
                <div className="text-gray-700 text-start">{sample.key}</div>
                <div className="text-gray-700 text-start">
                    {sample.bpm !== null && sample.bpm > 0 && sample.bpm}
                </div>
            </div>

            {/* Download button - Always visible */}
            <div className="flex justify-end flex-shrink-0">
                {!isShowroomMode ? (
                    <button
                        onClick={handleDownload}
                        data-download-button
                        className="p-2 text-sssblue hover:text-sssyellow hover:bg-sssblue rounded-lg transition-colors opacity-100"
                        title={`Download ${sample.name}`}
                        aria-label={`Download ${sample.name}`}
                    >
                        <Download size={20}/>
                    </button>
                ) : (
                    <button
                        onClick={handleNoDownload}
                        data-download-button
                        className="p-2 disabled text-sssmutegray"
                        title={`Download ${sample.name}`}
                        aria-label={`Download ${sample.name}`}
                    >
                        <Download size={20}/>
                    </button>
                )}
            </div>
        </div>
    )
}