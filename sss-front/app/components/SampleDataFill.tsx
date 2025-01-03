import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import type { Instrument, Genre, Tag } from '../../prisma/client'
import { useState } from 'react'
import { Link } from '@remix-run/react'

interface Samples {
    samples: File[]
    instruments: Instrument[]
    genres: Genre[]
    tags: Tag[]
}

export default function SampleDataFill({
    samples,
    instruments,
    genres,
    tags,
}: Samples) {
    const [sampleTags, setSampleTags] = useState<Record<number, string[]>>({})
    const [tagInput, setTagInput] = useState<Record<number, string>>({})
    const [sampleNames, setSampleNames] = useState(
        samples.map((sample) => sample.name.slice(0, -4))
    )
    const [selectedInstruments, setSelectedInstruments] = useState<
        Record<number, number[]>
    >(samples.map(() => []))
    const [selectedGenres, setSelectedGenres] = useState<
        Record<number, number[]>
    >(samples.map(() => []))

    const handleNameChange = (index: number, newName: string) => {
        setSampleNames((prev) => {
            const updatedNames = [...prev]
            updatedNames[index] = newName
            return updatedNames
        })
    }

    const handleTagInputChange = (sampleIndex: number, value: string) => {
        setTagInput((prev) => ({
            ...prev,
            [sampleIndex]: value,
        }))
    }

    const handleTagKeyDown = (
        sampleIndex: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault()
            const newTag = tagInput[sampleIndex]?.trim()
            if (newTag) {
                setSampleTags((prev) => ({
                    ...prev,
                    [sampleIndex]: [
                        ...(prev[sampleIndex] || []),
                        newTag,
                    ].filter((tag, i, self) => self.indexOf(tag) === i),
                }))
                setTagInput((prev) => ({
                    ...prev,
                    [sampleIndex]: '',
                }))
            }
        }
    }

    const handleRemoveTag = (sampleIndex: number, tag: string) => {
        setSampleTags((prev) => ({
            ...prev,
            [sampleIndex]: prev[sampleIndex]?.filter((t) => t !== tag) || [],
        }))
    }

    const handleInstrumentChange = (
        sampleIndex: number,
        instrumentId: number
    ) => {
        setSelectedInstruments((prev) => {
            const selected = prev[sampleIndex] || []
            if (selected.includes(instrumentId)) {
                return {
                    ...prev,
                    [sampleIndex]: selected.filter((id) => id !== instrumentId),
                }
            } else {
                return {
                    ...prev,
                    [sampleIndex]: [...selected, instrumentId],
                }
            }
        })
    }

    const handleGenreChange = (sampleIndex: number, genreId: number) => {
        setSelectedGenres((prev) => {
            const selected = prev[sampleIndex] || []
            if (selected.includes(genreId)) {
                return {
                    ...prev,
                    [sampleIndex]: selected.filter((id) => id !== genreId),
                }
            } else {
                return {
                    ...prev,
                    [sampleIndex]: [...selected, genreId],
                }
            }
        })
    }

    return (
        <section
            id="sample-data-fill"
            className="flex flex-col w-11/12 md:w-3/4"
        >
            <Carousel>
                <CarouselContent>
                    {samples?.map((sample, index) => (
                        <CarouselItem key={sample.name}>
                            <div className="my-2 bg-white p-14 mx-4 rounded-2xl shadow-lg">
                                {/* Sample Header */}
                                <div className="text-sssblue text-xl mb-4">
                                    sample #{index + 1}/{samples.length}
                                </div>

                                {/* Sample Name Input */}
                                <div
                                    id="sample-name-input"
                                    className="flex flex-col mb-4"
                                >
                                    <label
                                        htmlFor={sample.name}
                                        className="text-sm text-sssaccentgray font-medium p-1"
                                    >
                                        sample name:
                                    </label>
                                    <input
                                        type="text"
                                        id={sample.name}
                                        value={sampleNames[index]}
                                        onChange={(e) =>
                                            handleNameChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        className="border rounded-xl p-2 font-light"
                                    />
                                </div>

                                {/* Instruments Checkboxes */}
                                <div id="instruments" className="my-4">
                                    <p className="text-sm text-sssaccentgray font-medium p-1">
                                        select instruments:
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {instruments?.map((instrument) => (
                                            <label
                                                key={instrument.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={instrument.id}
                                                    onChange={() =>
                                                        handleInstrumentChange(
                                                            index,
                                                            instrument.id
                                                        )
                                                    }
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {instrument.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Genres Checkboxes */}
                                <div id="genres" className="my-4">
                                    <p className="text-sm text-sssaccentgray font-medium p-1">
                                        select genres:
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                        {genres?.map((genre) => (
                                            <label
                                                key={genre.id}
                                                className="flex items-center space-x-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    value={genre.id}
                                                    onChange={() =>
                                                        handleGenreChange(
                                                            index,
                                                            genre.id
                                                        )
                                                    }
                                                    className="rounded"
                                                />
                                                <span className="text-sm">
                                                    {genre.name}
                                                </span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags Input */}
                                <div id="tags" className="my-4">
                                    <p className="text-sm text-sssaccentgray font-medium p-1">
                                        add tags:
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {sampleTags[index]?.map((tag) => (
                                            <span
                                                key={tag}
                                                className="flex items-center bg-sssdarkblue text-sssoffwhite text-sm px-2 py-0 rounded-full"
                                            >
                                                {tag}
                                                <button
                                                    onClick={() =>
                                                        handleRemoveTag(
                                                            index,
                                                            tag
                                                        )
                                                    }
                                                    className="pl-2 text-sssred text-lg font-bold"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input
                                        type="text"
                                        value={tagInput[index] || ''}
                                        onChange={(e) =>
                                            handleTagInputChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleTagKeyDown(index, e)
                                        }
                                        placeholder="Add tags, separated by commas"
                                        className="border rounded-xl p-2 font-light w-full"
                                    />
                                    <div className="mt-2">
                                        {tags
                                            ?.filter(
                                                (tag) =>
                                                    tag.name
                                                        .toLowerCase()
                                                        .includes(
                                                            tagInput[
                                                                index
                                                            ]?.toLowerCase() ||
                                                                ''
                                                        ) &&
                                                    !sampleTags[
                                                        index
                                                    ]?.includes(tag.name)
                                            )
                                            .map((tag) => (
                                                <button
                                                    key={tag.id}
                                                    onClick={() =>
                                                        handleTagInputChange(
                                                            index,
                                                            tag.name + ','
                                                        )
                                                    }
                                                    className="bg-gray-100 hover:bg-gray-200 text-sm px-2 py-1 rounded-lg m-1"
                                                >
                                                    {tag.name}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                    <CarouselItem className="flex flex-col justify-center items-center bg-white p-14 mx-4 rounded-2xl shadow-lg">
                        <h3 className="text-sssblue">
                            samples ready to upload
                        </h3>
                        <div className="m-4 text-xs font-thin">
                            {sampleNames?.map((sample) => (
                                <div className="m-2" key={sample}>
                                    {sample}
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/sample-upload/fill-sample-data"
                            // state={{ samples: storedSamples }}
                            className="m-6 py-2 px-10 bg-sssyellow hover:bg-yellow-400 rounded-full"
                        >
                            upload samples
                        </Link>
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
