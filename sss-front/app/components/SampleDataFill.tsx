import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import type { Instrument, Genre } from '../../prisma/client'

interface Samples {
    samples: File[]
    instruments: Instrument[]
    genres: Genre[]
}

export default function SampleDataFill({
    samples,
    instruments,
    genres,
}: Samples) {
    // console.log('Instruments in SampleDataFill:', instruments)
    // console.log('Genres in SampleDataFill:', genres)

    if (!samples || samples.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <p className="text-xl">No files were provided</p>
            </div>
        )
    }

    return (
        <section
            id="sample-data-fill"
            className="flex flex-col w-11/12 md:w-3/4 bg-white p-14 mx-4 rounded-2xl shadow-lg"
        >
            <Carousel>
                <CarouselContent>
                    {samples?.map((sample, index) => (
                        <CarouselItem key={sample.name}>
                            <div className="my-4 mx-8">
                                <div className="text-sssblue text-xl mb-4">
                                    sample #{index + 1}/{samples.length}
                                </div>

                                <div
                                    id="sample-name-input"
                                    className="flex flex-col"
                                >
                                    <label
                                        htmlFor={sample.name}
                                        className="text-sm text-sssaccentgray font-medium p-1"
                                    >
                                        sample name :
                                    </label>
                                    <input
                                        type="text"
                                        id={sample.name}
                                        defaultValue={sample.name.substring(
                                            0,
                                            sample.name.length - 4
                                        )}
                                        className="border rounded-xl p-2 font-light"
                                    />
                                </div>

                                <div id="instruments" className="my-4">
                                    <p className="text-sm text-sssaccentgray font-medium p-1">
                                        Select instruments:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {instruments.map((instrument) => (
                                            <label
                                                key={instrument.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={`sample-${index}-instrument`}
                                                    value={instrument.id}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {instrument.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div id="genres" className="my-4">
                                    <p className="text-sm text-sssaccentgray font-medium p-1">
                                        Select genres:
                                    </p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {genres.map((genre) => (
                                            <label
                                                key={genre.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    name={`sample-${index}-genre`}
                                                    value={genre.id}
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {genre.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
