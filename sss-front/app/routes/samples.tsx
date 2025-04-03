import { useState, useEffect } from 'react'
import type { MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import prisma, { Sample } from '../../prisma/client'
import WelcomeToast from '../components/Toast'
import SampleDisplay from '../components/SampleDisplay'
import AudioPlayer from '../components/AudioPlayer'

export const meta: MetaFunction = () => {
    return [
        { title: 'samples page - super secret samples' },
        { name: 'description', content: 'browse samples!' },
    ]
}

export async function loader() {
    const samples = await prisma.sample.findMany({
        include: { genres: true, instruments: true, tags: true },
    })
    const instruments = await prisma.instrument.findMany()
    const genres = await prisma.genre.findMany()
    const tags = await prisma.tag.findMany()
    return {
        samples,
        instruments,
        genres,
        tags,
        awsBucket: process.env.AWS_S3_BUCKET_NAME,
        awsRegion: process.env.AWS_REGION,
    }
}

export default function SamplesPage() {
    const { samples, awsBucket, awsRegion } = useLoaderData<typeof loader>()
    const [currentSampleId, setCurrentSampleId] = useState<Sample['id'] | null>(
        null
    )
    const [isPlaying, setIsPlaying] = useState(false)
    const [isLooping, setIsLooping] = useState(false)
    const currentSample = samples.find(
        (sample) => sample.id === currentSampleId
    )

    // Reset loop state
    useEffect(() => {
        if (currentSample) {
            setIsLooping(currentSample.loop)
        } else {
            setIsLooping(false)
        }
    }, [currentSample])

    const handleSampleClick = (sampleId: Sample['id']) => {
        const newSample = samples.find((sample) => sample.id === sampleId)

        setCurrentSampleId(sampleId)
        setIsPlaying(true)
        if (newSample) {
            setIsLooping(newSample.loop)
        }
    }

    return (
        <div>
            <WelcomeToast />
            <div
                id="main"
                className="flex flex-col justify-center items-center bg-white"
            >
                <div className="w-full my-4 px-4">
                    {samples?.map((sample) => (
                        <SampleDisplay
                            key={sample.id}
                            sample={sample}
                            onClick={() => handleSampleClick(sample.id)}
                        />
                    ))}
                </div>
                <div id="empty-margin" className="my-16"></div>
                <div className="z-100 fixed bottom-0 w-1/2">
                    <AudioPlayer
                        currentSample={currentSample}
                        isPlaying={isPlaying}
                        isLooping={isLooping}
                        onPlayPause={setIsPlaying}
                        onLoopChange={setIsLooping}
                        awsBucket={awsBucket}
                        awsRegion={awsRegion}
                    />
                </div>
            </div>
        </div>
    )
}
