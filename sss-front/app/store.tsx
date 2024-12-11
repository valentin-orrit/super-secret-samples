import { create } from 'zustand'

type VolumeState = {
    volume: number
    setVolume: (value: number) => void
}

export const useVolumeStore = create<VolumeState>((set) => ({
    volume: 40,
    setVolume: (value) => set({ volume: value }),
}))
