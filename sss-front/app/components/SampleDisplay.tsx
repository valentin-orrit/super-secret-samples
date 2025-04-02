import {
    Sample as PrismaSample,
    Genre,
    Instrument,
    Tag,
} from '../../prisma/client'
import Shape from '../components/Shape'
import { Infinity, Route } from 'lucide-react'

interface Sample extends PrismaSample {
    genres: Genre[]
    instruments: Instrument[]
    tags: Tag[]
}

interface SampleInterface {
    sample: Sample
    onClick?: () => void
}

export default function SampleDisplay({ sample, onClick }: SampleInterface) {
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

    return (
        <button
            className="grid grid-flow-col grid-cols-8 border-b border-gray-300 w-full px-4 py-1 my-1 hover:bg-sssoffwhite cursor-pointer bg-white items-center"
            onClick={onClick}
        >
            <div className="">
                <Shape instrument={sample.instruments[0].name} width={40} />
            </div>

            <div className="text-gray-700 text-start">
                {sample.loop ? <Infinity /> : <Route />}
            </div>

            <div className="text-lg text-gray-800 font-semibold text-start flex flex-col col-span-3 justify-evenly">
                <p className="overflow-hidden text-ellipsis">{sample.name}</p>
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

            <div className="col-span-3 grid grid-flow-col grid-cols-3 gap-x-2">
                <div className="text-gray-700 text-start">
                    {formatSampleLength(sample.length)}
                </div>
                <div className="text-gray-700 text-start">{sample.key}</div>
                <div className="text-gray-700 text-start">
                    {sample.bpm !== null && sample.bpm > 0 && sample.bpm}
                </div>
            </div>
        </button>
    )
}
