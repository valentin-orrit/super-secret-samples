import {
    Sample as PrismaSample,
    Genre,
    Instrument,
    Tag,
} from '../../prisma/client'
import Shape from '../components/Shape'
import {Infinity, Route, Download} from 'lucide-react'

interface Sample extends PrismaSample {
    genres: Genre[]
    instruments: Instrument[]
    tags: Tag[]
}

interface SampleInterface {
    sample: Sample
    onClick?: () => void
    isActive?: boolean
}

export default function SampleDisplay({
                                          sample,
                                          onClick,
                                          isActive = false,
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
        // Prevent event bubbling to play the sample
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
            className={`grid grid-flow-col grid-cols-8 border-b border-gray-200 w-full px-4 py-1 my-1 hover:bg-sssoffwhite cursor-pointer items-center rounded-2xl group ${
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
            <div className="">
                {sample?.instruments[0]?.name ? (
                    <Shape instrument={sample.instruments[0].name} width={40}/>
                ) : (
                    <Shape instrument="drums" width={40}/>
                )}
            </div>
            <div className="text-gray-700 text-start">
                {sample.loop ? <Infinity/> : <Route/>}
            </div>
            <div className="text-lg text-gray-800 font-semibold text-start flex flex-col col-span-3 justify-evenly">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {sample.name}
                </p>
                <div className="flex overflow-hidden text-ellipsis gap-2 my-1">
                    {genreAndTags.map((tag, index) => (
                        <span
                            key={index}
                            className="text-gray-500 text-xs font-thin"
                        >
                            {tag.name}{' '}
                        </span>
                    ))}
                </div>
            </div>
            <div className="col-span-2 grid grid-flow-col grid-cols-4 gap-x-2">
                <div className="text-gray-700 text-start">
                    {formatSampleLength(sample.length)}
                </div>
                <div className="text-gray-700 text-start">{sample.key}</div>
                <div className="text-gray-700 text-start">
                    {sample.bpm !== null && sample.bpm > 0 && sample.bpm}
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={handleDownload}
                    data-download-button
                    className="p-2 text-sssblue hover:text-sssyellow hover:bg-sssblue rounded-lg transition-colors opacity-100"
                    title={`Download ${sample.name}`}
                    aria-label={`Download ${sample.name}`}
                >
                    <Download size={20}/>
                </button>
            </div>
        </div>
    )
}
