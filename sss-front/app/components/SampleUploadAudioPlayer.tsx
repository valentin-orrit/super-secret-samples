/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useState, useRef } from 'react'
import { Play, Pause, Volume2 } from 'lucide-react'

interface SimpleAudioPlayerProps {
    file: File | null
    sampleName: string
}

export default function SampleUploadAudioPlayer({
    file,
    sampleName,
}: SimpleAudioPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [volume, setVolume] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    useEffect(() => {
        if (file) {
            const url = URL.createObjectURL(file)
            setAudioUrl(url)
            setIsPlaying(false)

            return () => {
                URL.revokeObjectURL(url)
            }
        } else {
            setAudioUrl(null)
        }
    }, [file])

    useEffect(() => {
        // Update audio element when URL changes
        if (audioRef.current && audioUrl) {
            audioRef.current.src = audioUrl
            audioRef.current.volume = volume
        }
    }, [audioUrl, volume])

    const handlePlayPause = async () => {
        if (!audioRef.current || !audioUrl) return

        try {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                setIsLoading(true)
                await audioRef.current.play()
                setIsPlaying(true)
                setIsLoading(false)
            }
        } catch (error) {
            console.error('Error playing audio:', error)
            setIsLoading(false)
        }
    }

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value)
        setVolume(newVolume)
        if (audioRef.current) {
            audioRef.current.volume = newVolume
        }
    }

    return (
        <div className="flex items-center justify-between gap-4 p-4 bg-white shadow-xl rounded-2xl w-full border border-gray-400">
            {/* Hidden audio element */}
            <audio
                ref={audioRef}
                onEnded={() => setIsPlaying(false)}
                preload="none"
            />

            <div className="flex gap-2">
                <button
                    onClick={handlePlayPause}
                    className="p-4 bg-amber-100 rounded-full hover:bg-amber-200 disabled:bg-gray-300"
                    disabled={!file || isLoading}
                >
                    {isLoading ? (
                        <span className="block w-5 h-5 rounded-full border-2 border-amber-800 border-t-transparent animate-spin" />
                    ) : isPlaying ? (
                        <Pause size={20} className="text-amber-800" />
                    ) : (
                        <Play size={20} className="text-amber-800" />
                    )}
                </button>
            </div>

            <div className="text-sm lg:text-md text-gray-800 font-semibold text-start overflow-hidden text-ellipsis text-nowrap flex-1">
                {sampleName || 'No sample selected'}
            </div>

            <div className="flex items-center justify-center gap-2">
                <Volume2 size={20} className="text-amber-800" />
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
