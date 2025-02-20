import {
    Sample as PrismaSample,
    Genre,
    Instrument,
    Tag,
} from '../../prisma/client'

interface Sample extends PrismaSample {
    genres: Genre[]
    instruments: Instrument[]
    tags: Tag[]
}

interface SampleInterface {
    sample: Sample
}

export default function SampleDisplay({ sample }: SampleInterface) {
    return (
        <div className="grid grid-flow-col grid-cols-3 border border-gray-300 w-full px-4 py-1 my-1 rounded-lg hover:bg-amber-100 cursor-pointer bg-white">
            <div className="text-lg text-gray-800 font-semibold text-start">
                {sample.name}
            </div>
            <div className="col-span-2 grid grid-flow-col grid-cols-3 gap-x-2">
                <div className="text-gray-700 text-start">{`${sample.length}s`}</div>
                <div className="text-gray-700 text-start">{sample.key}</div>
                <div className="text-gray-700 text-start">{sample.bpm}</div>
                <div className="text-gray-700 text-start">
                    {sample.loop ? 'Loop' : 'One-shot'}
                </div>

                <div className="">
                    {sample.genres.map((genre) => (
                        <span key={genre.id} className="text-gray-500 text-xs">
                            {genre.name}
                        </span>
                    ))}
                </div>

                <div className="">
                    {sample.instruments.map((instrument) => (
                        <span
                            key={instrument.id}
                            className="text-gray-500 text-xs"
                        >
                            {instrument.name}
                        </span>
                    ))}
                </div>

                <div className="">
                    {sample.tags.map((tag) => (
                        <span key={tag.id} className="text-gray-500 text-xs">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
