import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'

interface Samples {
    samples: File[]
}

export default function SampleDataFill({ samples }: Samples) {
    //console.log(samples)

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
                                        defaultValue={sample.name}
                                        className="border rounded-xl p-2 font-light"
                                    />
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
