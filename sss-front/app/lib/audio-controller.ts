export class AudioController {
    private audioContext: AudioContext | null = null
    private source: AudioBufferSourceNode | null = null
    private gainNode: GainNode | null = null
    private currentBuffer: AudioBuffer | null = null
    private isPlaying: boolean = false
    private loop: boolean = false
    private playbackStartTime: number = 0
    private currentOffset: number = 0
    private onEndedCallback: (() => void) | null = null

    constructor() {
        if (typeof window !== 'undefined') {
            this.audioContext = new AudioContext()
            this.gainNode = this.audioContext.createGain()
            this.gainNode.connect(this.audioContext.destination)
        }
    }

    async loadTrack(url: string) {
        if (!this.audioContext) return

        const response = await fetch(url)
        const arrayBuffer = await response.arrayBuffer()
        this.currentBuffer = await this.audioContext.decodeAudioData(
            arrayBuffer
        )
        this.currentOffset = 0
    }

    play() {
        if (!this.audioContext || !this.currentBuffer) return
        this.stop()

        this.source = this.audioContext.createBufferSource()
        this.source.buffer = this.currentBuffer
        this.source.loop = this.loop
        this.source.connect(this.gainNode!)

        // detect when sample finishes
        this.source.onended = () => {
            if (!this.loop) {
                this.isPlaying = false
                this.currentOffset = 0
                if (this.onEndedCallback) {
                    this.onEndedCallback()
                }
            }
        }

        this.playbackStartTime =
            this.audioContext.currentTime - this.currentOffset
        this.source.start(0, this.currentOffset)
        this.isPlaying = true
    }

    pause() {
        if (!this.audioContext) return

        if (this.isPlaying && this.currentBuffer) {
            this.currentOffset =
                this.audioContext.currentTime - this.playbackStartTime
        }
        this.stop()
        this.isPlaying = false
    }

    stop() {
        if (this.source) {
            this.source.onended = null
            this.source.stop()
            this.source.disconnect()
            this.source = null
        }
    }

    setVolume(value: number) {
        if (this.gainNode) {
            this.gainNode.gain.value = value
        }
    }

    setLoop(loop: boolean) {
        this.loop = loop
        if (this.source) {
            this.source.loop = loop
        }
    }

    seek(time: number) {
        if (!this.audioContext || !this.currentBuffer) return

        this.currentOffset = time
        if (this.isPlaying) {
            this.stop()
            this.source = this.audioContext.createBufferSource()
            this.source.buffer = this.currentBuffer
            this.source.loop = this.loop
            this.source.connect(this.gainNode!)

            this.source.onended = () => {
                if (!this.loop) {
                    this.isPlaying = false
                    this.currentOffset = 0
                    if (this.onEndedCallback) {
                        this.onEndedCallback()
                    }
                }
            }

            this.playbackStartTime =
                this.audioContext.currentTime - this.currentOffset
            this.source.start(0, this.currentOffset)
        }
    }

    getCurrentTime() {
        if (!this.audioContext) return 0

        if (this.isPlaying && this.currentBuffer) {
            const elapsed =
                this.audioContext.currentTime - this.playbackStartTime
            const duration = this.currentBuffer.duration
            return this.loop ? elapsed % duration : Math.min(elapsed, duration)
        }
        return this.currentOffset
    }

    getIsPlaying() {
        return this.isPlaying
    }

    setOnEndedCallback(callback: () => void) {
        this.onEndedCallback = callback
    }

    cleanup() {
        this.stop()
        this.currentBuffer = null
        this.currentOffset = 0
        this.isPlaying = false
        this.onEndedCallback = null
    }
}