import {type MetaFunction} from 'react-router'
import {Form} from 'react-router'
import React, {useEffect, useState} from 'react'
import type {Genre, Instrument} from '../../prisma/client'
import Shape from "~/components/Shape"

export const meta: MetaFunction = () => {
    return [
        {title: 'request samples - super secret samples'},
        {
            name: 'description',
            content:
                'request samples to be created and uploaded in the samples page!',
        },
    ]
}


export default function SampleRequest() {
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [description, setDescription] = useState<string>('')
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])
    const [selectedInstruments, setSelectedInstruments] = useState<number[]>([])
    const [email, setEmail] = useState<string>('')

    // fetch instruments from db
    useEffect(() => {
        fetch('/api/get-instruments')
            .then((res) => res.json())
            .then((data) => {
                setInstruments(data)
            })
            .catch((err) => {
                console.error('Fetch error:', err)
            })
    }, [])

    // fetch genres from db
    useEffect(() => {
        fetch('/api/get-genres')
            .then((res) => res.json())
            .then((data) => {
                setGenres(data)
            })
            .catch((err) => {
                console.error('Fetch error:', err)
            })
    }, [])

    const handleGenreToggle = (genreId: number) => {
        setSelectedGenres(prev =>
            prev.includes(genreId)
                ? prev.filter(id => id !== genreId)
                : [...prev, genreId]
        )
    }

    const handleInstrumentToggle = (instrumentId: number) => {
        setSelectedInstruments(prev =>
            prev.includes(instrumentId)
                ? prev.filter(id => id !== instrumentId)
                : [...prev, instrumentId]
        )
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            // const formData = new FormData()
            // submit(formData, {method: 'POST', encType: 'multipart/form-data'})
        } catch (error) {
            console.error('Failed to send form:', error)
            alert('Failed to send form. Service might be unavailable. Please try again.')
        }
    }

    return (
        <div
            id="samples-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen align-middle items-center justify-center w-full py-10"
        >
            <h1 className="text-2xl font-semibold text-sssblue mb-4">request exclusive samples</h1>

            <p className="w-1/2 text-center">
                Do you like the samples produced for super secret samples? If so, we can produce exclusive samples for
                you only.
                You would be the only producer in possession of those samples and would be able to use them as you wish.
            </p>

            <section className="min-w-2/3 max-w-3xl flex flex-col bg-white my-8 p-14 rounded-2xl shadow-lg">
                <Form action="/sample-request"
                      method="POST"
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-y-8">
                    {/* Description */}
                    <div>
                        <p className="mb-2 font-semibold">describe the kind of samples you would like to produce with
                            :</p>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="tell us in a few (or more) words"
                            className="p-3 border border-sssmutegray shadow-sm w-full rounded-lg h-24 resize-vertical"
                            required
                        />
                    </div>

                    {/* Instruments */}
                    <div>
                        <p className="mb-4 font-semibold">instruments :</p>
                        {instruments.length === 0 ? (
                            <p className="text-gray-500">Loading instruments...</p>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {instruments.map((instrument) => (
                                    <button
                                        key={instrument.id}
                                        type="button"
                                        onClick={() => handleInstrumentToggle(instrument.id)}
                                        className={`flex items-center pl-1 pr-3 py-2 rounded-full border-2 transition-colors ${
                                            selectedInstruments.includes(instrument.id)
                                                ? 'bg-sssyellow border-sssyellow text-sssdarkblue'
                                                : 'bg-white border-sssmutegray text-sssdarkblue hover:border-sssyellow'
                                        }`}
                                    >
                                        <span className="p-0 m-0">
                                {
                                    instrument && <Shape instrument={instrument.name} width={20}/>
                                }
                                        </span>
                                        <span>
                                            {instrument.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Hidden inputs for selected instruments */}
                        {selectedInstruments.map((instrumentId) => (
                            <input
                                key={instrumentId}
                                type="hidden"
                                name="instruments"
                                value={instrumentId}
                            />
                        ))}
                    </div>

                    {/* Genres */}
                    <div>
                        <p className="mb-4 font-semibold">genre :</p>
                        {genres.length === 0 ? (
                            <p className="text-gray-500">Loading genres...</p>
                        ) : (
                            <div className="flex flex-wrap gap-3">
                                {genres.map((genre) => (
                                    <button
                                        key={genre.id}
                                        type="button"
                                        onClick={() => handleGenreToggle(genre.id)}
                                        className={`px-4 py-2 rounded-full border-2 transition-colors ${
                                            selectedGenres.includes(genre.id)
                                                ? 'bg-sssyellow border-sssyellow text-sssdarkblue'
                                                : 'bg-white border-sssmutegray text-sssdarkblue hover:border-sssyellow'
                                        }`}
                                    >
                                        {genre.name}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Hidden inputs for selected genres */}
                        {selectedGenres.map((genreId) => (
                            <input
                                key={genreId}
                                type="hidden"
                                name="genres"
                                value={genreId}
                            />
                        ))}
                    </div>

                    {/* Email */}
                    <div>
                        <p className="mb-2 font-semibold">
                            email : <span className="text-sm text-gray-500 font-normal">(we will contact you via email regarding the process and pricing)</span>
                        </p>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            className="p-3 border border-sssmutegray shadow-sm w-full rounded-lg"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className='mt-6 py-3 px-10 rounded-full bg-sssyellow hover:bg-yellow-400 transition-colors font-semibold'
                    >
                        submit
                    </button>
                </Form>
            </section>
        </div>
    )
}