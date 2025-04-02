import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import type { Instrument, Genre, Tag } from '../../prisma/client'
import { useState } from 'react'
import { Form, useSubmit, useNavigation } from '@remix-run/react'

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
}: Samples) {
    const submit = useSubmit()
    const navigation = useNavigation()
    const isUploading = navigation.state === 'submitting'

    const [sampleData, setSampleData] = useState(
        samples.map((sample) => ({
            name: sample.name.slice(0, -4),
            instruments: [] as number[],
            genres: [] as number[],
            tags: [] as string[],
            key: '',
            loop: false,
            bpm: 0,
            tagInput: '',
        }))
    )

    const handleNameChange = (index: number, newName: string) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === index ? { ...data, name: newName } : data
            )
        )
    }

    const handleInstrumentChange = (
        sampleIndex: number,
        instrumentId: number
    ) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex
                    ? {
                          ...data,
                          instruments: data.instruments.includes(instrumentId)
                              ? data.instruments.filter(
                                    (id) => id !== instrumentId
                                )
                              : [...data.instruments, instrumentId],
                      }
                    : data
            )
        )
    }

    const handleGenreChange = (sampleIndex: number, genreId: number) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex
                    ? {
                          ...data,
                          genres: data.genres.includes(genreId)
                              ? data.genres.filter((id) => id !== genreId)
                              : [...data.genres, genreId],
                      }
                    : data
            )
        )
    }

    const handleTagInputChange = (sampleIndex: number, value: string) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex
                    ? { ...data, tagInput: value.toLowerCase() }
                    : data
            )
        )
    }

    const handleKeyChange = (sampleIndex: number, value: string) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex
                    ? {
                          ...data,
                          key:
                              value.charAt(0).toUpperCase() +
                              String(value).slice(1),
                      }
                    : data
            )
        )
    }

    const handleBPMChange = (sampleIndex: number, value: string) => {
        const parsedValue = parseInt(value, 10) || 0
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex ? { ...data, bpm: parsedValue } : data
            )
        )
    }

    const handleTagKeyDown = (
        sampleIndex: number,
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (
            (event.key === 'Enter' || event.key === ',') &&
            event.currentTarget.id === 'tagInput'
        ) {
            event.preventDefault()
            const tagsToAdd = sampleData[sampleIndex].tagInput
                .split(',')
                .map((tag) => tag.trim())
                .filter((tag) => tag)

            if (tagsToAdd.length > 0) {
                setSampleData((prev) =>
                    prev.map((data, i) =>
                        i === sampleIndex
                            ? {
                                  ...data,
                                  tags: [...data.tags, ...tagsToAdd].filter(
                                      (tag, idx, self) =>
                                          self.indexOf(tag) === idx
                                  ),
                                  tagInput: '',
                              }
                            : data
                    )
                )
            }
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault()
        }
    }

    const handleRemoveTag = (sampleIndex: number, tagToRemove: string) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex
                    ? {
                          ...data,
                          tags: data.tags.filter((tag) => tag !== tagToRemove),
                      }
                    : data
            )
        )
    }

    const handleLoopChange = (sampleIndex: number, isLoop: boolean) => {
        setSampleData((prev) =>
            prev.map((data, i) =>
                i === sampleIndex ? { ...data, loop: isLoop } : data
            )
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const formData = new FormData()

            samples.forEach((sample, index) => {
                formData.append(`sample-${index}`, sample)
                formData.append(
                    `metadata-${index}`,
                    JSON.stringify({
                        name: sampleData[index].name,
                        instruments: sampleData[index].instruments,
                        genres: sampleData[index].genres,
                        tags: sampleData[index].tags,
                        bpm: sampleData[index].bpm,
                        key: sampleData[index].key,
                        loop: sampleData[index].loop,
                    })
                )
            })

            submit(formData, { method: 'POST', encType: 'multipart/form-data' })
        } catch (error) {
            console.error('Failed to upload samples:', error)
            alert('Failed to upload samples. Please try again.')
        }
    }

    return (
        <section
            id="sample-data-fill"
            className="flex flex-col w-11/12 md:w-3/4"
        >
            <Carousel>
                <Form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                    onKeyDown={handleKeyDown}
                    className="w-full"
                >
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
                                            value={sampleData[index].name}
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
                                            Add tags:{' '}
                                            <span className="text-xs font-extralight">
                                                (lowercase only)
                                            </span>
                                        </p>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {sampleData[index].tags.map(
                                                (tag) => (
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
                                                )
                                            )}
                                        </div>
                                        <input
                                            type="text"
                                            value={sampleData[index].tagInput}
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
                                            id="tagInput"
                                        />
                                    </div>

                                    {/* Key Input */}
                                    <div
                                        id="sample-name-input"
                                        className="flex flex-col mb-4 "
                                    >
                                        <label
                                            htmlFor={sampleData[index].key}
                                            className="text-sm text-sssaccentgray font-medium p-1"
                                        >
                                            Add key:{' '}
                                            <span className="text-xs font-extralight">
                                                (format key as &quot;Cmaj&quot;
                                                / &quot;Emin&quot;)
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id={sampleData[index].key}
                                            value={sampleData[index].key}
                                            onChange={(e) =>
                                                handleKeyChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-2 font-light w-1/6"
                                        />
                                    </div>

                                    {/* Loop vs One-Shot Selection */}
                                    <div
                                        id="sample-loop-choice"
                                        className="flex items-center gap-4 mb-4"
                                    >
                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`loop-${index}`}
                                                value="loop"
                                                checked={sampleData[index].loop}
                                                onChange={() =>
                                                    handleLoopChange(
                                                        index,
                                                        true
                                                    )
                                                }
                                                className="rounded"
                                            />
                                            <span className="text-sm text-sssaccentgray font-medium">
                                                Loop
                                            </span>
                                        </label>

                                        <label className="flex items-center space-x-2">
                                            <input
                                                type="radio"
                                                name={`loop-${index}`}
                                                value="one-shot"
                                                checked={
                                                    !sampleData[index].loop
                                                }
                                                onChange={() =>
                                                    handleLoopChange(
                                                        index,
                                                        false
                                                    )
                                                }
                                                className="rounded"
                                            />
                                            <span className="text-sm text-sssaccentgray font-medium">
                                                One-Shot
                                            </span>
                                        </label>
                                    </div>

                                    {/* BPM input */}
                                    <div
                                        id="sample-bpm-input"
                                        className="flex flex-col mb-4 "
                                    >
                                        <label
                                            htmlFor={sampleData[
                                                index
                                            ].bpm.toString()}
                                            className="text-sm text-sssaccentgray font-medium p-1"
                                        >
                                            BPM:{' '}
                                        </label>
                                        <input
                                            type="text"
                                            id={sampleData[
                                                index
                                            ].bpm.toString()}
                                            value={
                                                sampleData[index].bpm > 0
                                                    ? sampleData[index].bpm
                                                    : ''
                                            }
                                            onChange={(e) =>
                                                handleBPMChange(
                                                    index,
                                                    e.target.value
                                                )
                                            }
                                            className="border rounded-xl p-2 font-light w-1/6"
                                        />
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                        <CarouselItem className="flex flex-col justify-center items-center bg-white p-14 m-4 rounded-2xl shadow-lg ">
                            <h3 className="text-sssorange">
                                samples ready to upload
                            </h3>
                            <div className="flex flex-wrap m-4 text-xs">
                                {sampleData?.map((sample, index) => (
                                    <div
                                        className="m-4 p-2 border-b"
                                        key={index}
                                    >
                                        {/* Sample Name */}
                                        <div className="font-medium text-sm text-sssblue">
                                            {sample.name}
                                        </div>

                                        {/* Instruments */}
                                        {sample.instruments.length > 0 && (
                                            <div className="mt-2">
                                                <strong>Instruments:</strong>{' '}
                                                {sample.instruments
                                                    .map(
                                                        (instrumentId) =>
                                                            instruments.find(
                                                                (inst) =>
                                                                    inst.id ===
                                                                    instrumentId
                                                            )?.name
                                                    )
                                                    .join(', ')}
                                            </div>
                                        )}

                                        {/* Genres */}
                                        {sample.genres.length > 0 && (
                                            <div className="mt-2">
                                                <strong>Genres:</strong>{' '}
                                                {sample.genres
                                                    .map(
                                                        (genreId) =>
                                                            genres.find(
                                                                (genre) =>
                                                                    genre.id ===
                                                                    genreId
                                                            )?.name
                                                    )
                                                    .join(', ')}
                                            </div>
                                        )}

                                        {/* Tags */}
                                        {sample.tags.length > 0 && (
                                            <div className="mt-2">
                                                <strong>Tags:</strong>{' '}
                                                {sample.tags.join(', ')}
                                            </div>
                                        )}

                                        {/* Key */}
                                        {sample.key && (
                                            <div className="mt-2">
                                                <strong>Key:</strong>{' '}
                                                {sample.key}
                                            </div>
                                        )}

                                        {/* Loop */}
                                        <div className="mt-2">
                                            {sample.loop ? 'loop' : 'one-shot'}
                                        </div>

                                        {/* BPM */}
                                        {sample.bpm && (
                                            <div className="mt-2">
                                                <strong>BPM:</strong>
                                                {sample.bpm}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                type="submit"
                                disabled={isUploading}
                                className={`m-6 py-2 px-10 rounded-full ${
                                    isUploading
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-sssyellow hover:bg-yellow-400'
                                }`}
                            >
                                {isUploading
                                    ? 'Uploading...'
                                    : 'upload samples'}
                            </button>
                        </CarouselItem>
                    </CarouselContent>
                </Form>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}
