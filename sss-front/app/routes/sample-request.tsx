import { type MetaFunction, type ActionFunctionArgs, useActionData, useNavigation } from 'react-router'
import { Form } from 'react-router'
import { useEffect, useState } from 'react'
import type { Genre, Instrument } from '../../prisma/client'
import Shape from "~/components/Shape"
import sendSampleRequestEmail from "~/components/email/sendSampleRequestEmail"
import sendConfirmationEmail from "~/components/email/sendConfirmationEmail"
import { toast } from "sonner"

export const meta: MetaFunction = () => {
    return [
        { title: 'request samples - super secret samples' },
        {
            name: 'description',
            content:
                'request samples to be created and uploaded in the samples page!',
        },
    ]
}

export async function action({ request }: ActionFunctionArgs) {
    console.log('Action handler called')

    try {
        const formData = await request.formData()

        const description = formData.get('description') as string
        const email = formData.get('email') as string
        const instrumentIds = formData.getAll('instruments').map(id => Number(id))
        const genreIds = formData.getAll('genres').map(id => Number(id))

        console.log('Form data:', { description, email, instrumentIds, genreIds })

        if (!description || !email) {
            return {
                success: false,
                message: 'Description and email are required'
            }
        }

        const prisma = (await import('../../prisma/client')).default

        const [selectedInstruments, selectedGenres] = await Promise.all([
            instrumentIds.length > 0 ? prisma.instrument.findMany({
                where: { id: { in: instrumentIds } },
                select: { name: true }
            }) : [],
            genreIds.length > 0 ? prisma.genre.findMany({
                where: { id: { in: genreIds } },
                select: { name: true }
            }) : []
        ])

        await sendSampleRequestEmail({
            description,
            email,
            instruments: selectedInstruments.map(i => i.name),
            genres: selectedGenres.map(g => g.name)
        })

        await sendConfirmationEmail(email, description)

        return {
            success: true,
            message: 'Sample request sent successfully!'
        }
    } catch (error) {
        console.error('Error processing sample request:', error)
        return {
            success: false,
            message: 'Failed to send sample request. Please try again.',
            error: error instanceof Error ? error.message : 'Unknown error'
        }
    }
}

export default function SampleRequest() {
    const [instruments, setInstruments] = useState<Instrument[]>([])
    const [genres, setGenres] = useState<Genre[]>([])
    const [description, setDescription] = useState<string>('')
    const [selectedGenres, setSelectedGenres] = useState<number[]>([])
    const [selectedInstruments, setSelectedInstruments] = useState<number[]>([])
    const [email, setEmail] = useState<string>('')

    // Get action data and navigation state from React Router
    const actionData = useActionData() as { success: boolean; message: string } | undefined
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting'

    // Reset form on successful submission
    useEffect(() => {
        if (actionData?.success) {
            setDescription('')
            setEmail('')
            setSelectedGenres([])
            setSelectedInstruments([])
        }
    }, [actionData])

    // Show success/error messages
    useEffect(() => {
        if (actionData) {
            if (actionData.success) {
                toast.success("sample request sent successfully!", {
                    description: "You will receive a confirmation email soon."
                })
            } else {
                toast.error("Error:", {
                    description: "service unavailable. Please try again later."
                })
            }
        }
    }, [actionData])

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

    return (
        <div
            id="sample-request-page"
            className="flex flex-col font-mono text-sssdarkblue bg-sssoffwhite min-h-screen align-middle items-center justify-center w-full py-10"
        >
            <h1 className="text-2xl font-semibold text-sssblue mb-4">request exclusive samples</h1>

            <p className="min-w-2/3 max-w-3xl text-left mb-2">
                Do you like the samples produced for <span
                className="font-bold text-sssdarkblue">super secret <span
                className="text-sssred">samples</span></span>?
                We can produce exclusive samples for you. You would be the only producer in possession of those
                samples and would be able to use them as you wish. To proceed, fill this form. <span
                className="min-w-2/3 max-w-3xl text-left mb-2 font-thin text-xs">
                (This is a paid service, once
                you fill the form we will contact you via email regarding the process and pricing).
            </span>
            </p>


            <section className="min-w-2/3 max-w-3xl flex flex-col bg-white my-4 p-14 rounded-2xl shadow-lg">
                <Form method="POST" className="flex flex-col gap-y-8">
                    {/* Description */}
                    <div>
                        <p className="mb-2 font-semibold">describe the kind of samples you are looking for:</p>
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
                                            {instrument && <Shape instrument={instrument.name} width={20}/>}
                                        </span>
                                        <span>{instrument.name}</span>
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
                        <p className="mb-4 font-semibold text-ss">genre :</p>
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
                            email : <span className="text-sm text-sssorange">(we will contact you via email regarding the process and pricing)</span>
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
                        disabled={isSubmitting}
                        className={`mt-6 py-3 px-10 rounded-full transition-colors font-semibold ${
                            isSubmitting
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-sssyellow hover:bg-yellow-400'
                        }`}
                    >
                        {isSubmitting ? 'sending...' : 'submit'}
                    </button>
                </Form>
            </section>
        </div>
    )
}