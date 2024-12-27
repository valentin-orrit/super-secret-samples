import { useVolumeStore } from '../app/store'
import { act } from '@testing-library/react'

describe('Volume Store', () => {
    beforeEach(() => {
        // reset volume
        const { setState } = useVolumeStore
        act(() => {
            setState({ volume: 40 })
        })
    })

    it('should initialize with default volume', () => {
        const { volume } = useVolumeStore.getState()
        expect(volume).toBe(40)
    })

    it('should update volume when setVolume is called', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(75)
        })

        const { volume } = useVolumeStore.getState()
        expect(volume).toBe(75)
    })

    it('should handle minimum volume (0)', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(0)
        })

        const { volume } = useVolumeStore.getState()
        expect(volume).toBe(0)
    })

    it('should handle maximum volume (100)', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(100)
        })

        const { volume } = useVolumeStore.getState()
        expect(volume).toBe(100)
    })

    it('should handle floating point values', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(50.5)
        })

        const { volume } = useVolumeStore.getState()
        expect(volume).toBe(50.5)
    })

    it('should maintain state between actions', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(20)
        })

        let { volume } = useVolumeStore.getState()
        expect(volume).toBe(20)

        act(() => {
            setVolume(30)
        })

        volume = useVolumeStore.getState().volume
        expect(volume).toBe(30)
    })

    it('should handle invalid values', () => {
        const { setVolume } = useVolumeStore.getState()

        act(() => {
            setVolume(-10)
        })

        let { volume } = useVolumeStore.getState()
        expect(volume).toBe(0)

        act(() => {
            setVolume(150)
        })

        volume = useVolumeStore.getState().volume
        expect(volume).toBe(100)
    })
})
