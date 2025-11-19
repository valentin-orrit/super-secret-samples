import { useEffect, useState } from 'react'
import { Sample } from '../../prisma/client'
import { Play, Pause, Repeat, Volume2 } from 'lucide-react'
import { AudioController } from '~/lib/audio-controller'

interface AudioPlayerProps {
    currentSample: Sample | null
    isPlaying: boolean
    isLooping: boolean
    setIsPlaying: (playing: boolean) => void
    setIsLooping: (looping: boolean) => void
    audioController: AudioController | null
}

export default function AudioPlayer({
                                        currentSample,
                                        isPlaying,
                                        isLooping,
                                        setIsPlaying,
                                        setIsLooping,
                                        audioController,
                                    }: AudioPlayerProps) {
    const [volume, setVolume] = useState(1)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0.0)
    const [streamUrl, setStreamUrl] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [showVolumeSlider, setShowVolumeSlider] = useState(false)

    // Fetch stream URL when currentSample changes
    useEffect(() => {
        // Reset audio state when sample changes
        if (currentSample) {
            setIsLoading(true)
            audioController?.cleanup()

            setIsLooping(currentSample.loop)

            const key = encodeURIComponent(
                currentSample.s3CompressedReferenceName
            )
            const url = `/api/audio/${key}`
            setStreamUrl(url)
        } else {
            setStreamUrl(null)
        }
    }, [currentSample, audioController, setIsLooping])

    // Load track when streamUrl is ready
    useEffect(() => {
        let isMounted = true

        if (currentSample && streamUrl && audioController) {
            audioController
                .loadTrack(streamUrl)
                .then(() => {
                    if (!isMounted) return

                    setIsLoading(false)
                    setDuration(currentSample.length)
                    audioController.play()
                    setIsPlaying(true)
                })
                .catch((error) => {
                    if (!isMounted) return
                    console.error('Error loading audio track:', error)
                    setIsLoading(false)
                })
        }

        return () => {
            isMounted = false
        }
    }, [streamUrl, currentSample, audioController, setIsPlaying])

    useEffect(() => {
        audioController?.setLoop(isLooping)
    }, [isLooping, audioController])

    // Set up an interval to update the current playback time
    useEffect(() => {
        const interval = setInterval(() => {
            if (isPlaying && currentSample && audioController) {
                setCurrentTime(audioController.getCurrentTime())
            }
        }, 100)
        return () => clearInterval(interval)
    }, [isPlaying, currentSample, audioController])

    const handlePlayPause = () => {
        if (isPlaying) {
            audioController?.pause()
        } else {
            audioController?.play()
        }
        setIsPlaying(!isPlaying)
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

    const toggleVolumeSlider = () => {
        setShowVolumeSlider(!showVolumeSlider)
    }

    return (
        <div
            className="flex items-center justify-between gap-4 p-4 mb-8 bg-white shadow-xl rounded-2xl w-full border border-gray-400 min-w-64">
            <div className="flex gap-2">
                <button
                    onClick={handlePlayPause}
                    className="p-4 bg-amber-100 rounded-full hover:bg-amber-200 disabled:bg-gray-300 transition-colors"
                    disabled={!streamUrl || isLoading}
                >
                    {isLoading ? (
                        <span
                            className="block w-5 h-5 rounded-full border-2 border-amber-800 border-t-transparent animate-spin"/>
                    ) : isPlaying ? (
                        <Pause size={20} className="text-amber-800"/>
                    ) : (
                        <Play size={20} className="text-amber-800"/>
                    )}
                </button>
                <button
                    onClick={() => setIsLooping(!isLooping)}
                    className={`p-4 hidden sm:block text-gray-700 rounded-full transition-colors ${
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

            {/* Sample name - animated fade out when volume slider is shown */}
            {currentSample ? (
                <div
                    className={`text-sm lg:text-md text-gray-800 font-semibold text-start overflow-hidden text-ellipsis text-nowrap w-1/3 hidden sm:block lg:block transition-opacity duration-300 ${
                        showVolumeSlider ? 'lg:opacity-100 opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                >
                    {currentSample.name}
                </div>
            ) : (
                <div className={`items-center text-gray-500 hidden sm:block lg:block transition-opacity duration-300 ${
                    showVolumeSlider ? 'lg:opacity-100 opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                    select a track
                </div>
            )}

            {/* Seek bar and duration - animated fade out when volume slider is shown */}
            {currentSample && duration > 0 && (
                <div className={`flex items-center gap-1 mx-4 w-3/4 transition-opacity duration-300 ${
                    showVolumeSlider ? 'lg:opacity-100 lg:pointer-events-auto opacity-0 pointer-events-none' : 'opacity-100'
                }`}>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        step="0.1"
                        value={currentTime}
                        onChange={handleSeekChange}
                        className="w-full accent-amber-700 cursor-pointer"
                    />
                    <div className="text-sm text-gray-600 hidden sm:block">
                        <span>{Math.round(duration * 100) / 100}s</span>
                    </div>
                </div>
            )}

            {/* Volume slider overlay for mobile - animated fade in */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 flex items-center gap-2 w-1/2 lg:hidden transition-opacity duration-300 bg-amber-200 py-2 px-4 rounded-xl ${
                    showVolumeSlider ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}>
                <Volume2 size={20} className="text-amber-800 flex-shrink-0"/>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full accent-amber-700"
                />
            </div>

            {/* Volume controls */}
            <div className="flex items-center justify-center gap-2">
                <button
                    onClick={toggleVolumeSlider}
                    className={`lg:hidden p-2 rounded-full transition-all duration-300 ${
                        showVolumeSlider
                            ? 'bg-amber-200 scale-110'
                            : 'hover:bg-amber-100'
                    }`}
                >
                    <Volume2 size={20} className={`transition-colors duration-300 ${
                        showVolumeSlider ? 'text-amber-900' : 'text-amber-800'
                    }`}/>
                </button>

                {/* Desktop volume control - always visible on lg+ */}
                <div className="hidden lg:flex items-center gap-2">
                    <Volume2 size={20} className="text-amber-800"/>
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
        </div>
    )
}