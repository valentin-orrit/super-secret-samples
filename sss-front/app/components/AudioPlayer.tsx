import { useEffect, useState } from 'react'
import { Sample } from '../../prisma/client'
import { AudioController } from '../lib/audio-controller'
import { Play, Pause, Repeat, Volume2 } from 'lucide-react'

interface AudioPlayerProps {
    currentSample?: Sample
    isPlaying: boolean
    isLooping: boolean
    onPlayPause: (playing: boolean) => void
    onLoopChange: (looping: boolean) => void
}

const audioController =
    typeof window !== 'undefined' ? new AudioController() : null

export default function AudioPlayer({
    currentSample,
    isPlaying,
    isLooping,
    onPlayPause,
    onLoopChange,
}: AudioPlayerProps) {
    const [volume, setVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0.0)
    const [streamUrl, setStreamUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Fetch stream URL when currentSample changes
    useEffect(() => {
        if (currentSample) {
            setIsLoading(true)

            const key = encodeURIComponent(
                currentSample.s3CompressedReferenceName
            )
            const url = `/api/audio/${key}`
            setStreamUrl(url)
        } else {
            setStreamUrl(null)
        }
    }, [currentSample])

    // Load track when streamUrl is ready
    useEffect(() => {
        if (currentSample && streamUrl) {
            audioController
                ?.loadTrack(streamUrl)
                .then(() => {
                    setIsLoading(false)
                    if (isPlaying) {
                        audioController.play()
                    }
                    setDuration(currentSample.length)
                })
                .catch((error) => {
                    console.error('Error loading audio track:', error)
                    setIsLoading(false)
                })
        }
    }, [streamUrl, isPlaying, currentSample])

    useEffect(() => {
        audioController?.setLoop(isLooping)
    }, [isLooping])

    // Set up an interval to update the current playback time
    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && currentSample && audioController) {
                setCurrentTime(audioController.getCurrentTime())
            }
        }, 100)
        return () => clearInterval(interval)
    }, [isPlaying, currentSample])

    const handlePlayPause = () => {
        if (isPlaying) {
            audioController?.pause()
        } else {
            audioController?.play()
        }
        onPlayPause(!isPlaying)
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const volume = parseFloat(e.target.value)
        setVolume(volume)
        audioController?.setVolume(volume)
    }

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = parseFloat(e.target.value)
        setCurrentTime(newTime)
        audioController?.seek(newTime)
    }

    return (
        <div className="flex items-center justify-between gap-4 p-4 mb-8 bg-white shadow-xl rounded-2xl w-full border border-gray-400">
            <div className="flex gap-2">
                <button
                    onClick={handlePlayPause}
                    className="p-4 bg-amber-100 rounded-full hover:bg-amber-200 disabled:bg-gray-300"
                    disabled={!streamUrl || isLoading}
                >
                    {isLoading ? (
                        <span className="block w-5 h-5 rounded-full border-2 border-amber-800 border-t-transparent animate-spin" />
                    ) : isPlaying ? (
                        <Pause size={20} className="text-amber-800" />
                    ) : (
                        <Play size={20} className="text-amber-800" />
                    )}
                </button>
                <button
                    onClick={() => onLoopChange(!isLooping)}
                    className={`p-4 text-gray-700 rounded-full ${
                        isLooping ? 'text-amber-800' : ''
                    } hover:bg-amber-100`}
                >
                    <Repeat
                        size={16}
                        className={`${
                            isLooping ? 'text-amber-800' : 'text-gray-500'
                        }`}
                    />
                </button>
            </div>

            {currentSample ? (
                <div className="text-lg text-gray-800 font-semibold text-start grow-7 overflow-hidden text-ellipsis text-nowrap">
                    {currentSample.name}
                </div>
            ) : (
                <div className="flex items-center text-gray-500">
                    select a track
                </div>
            )}

            {currentSample && duration > 0 && (
                <div className="flex items-center gap-1 mx-4 grow-0">
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeekChange}
                        className="w-full accent-amber-700 cursor-pointer"
                    />
                    <div className="text-sm text-gray-600">
                        <span>{Math.round(duration * 100) / 100}s</span>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-center gap-2">
                <Volume2 size={24} className="text-amber-800" />
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 accent-amber-700"
                />
            </div>
        </div>
    )
}
