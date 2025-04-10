import { persist } from 'zustand/middleware'
import { create } from 'zustand'

// main volume
type VolumeState = {
    volume: number
    setVolume: (value: number) => void
}

export const useVolumeStore = create<VolumeState>((set) => ({
    volume: 40,
    setVolume: (value) =>
        set({
            volume: Math.min(Math.max(0, value), 100),
        }),
}))

type SearchState = {
    searchTerm: string
    setSearchTerm: (term: string) => void
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            searchTerm: '',
            setSearchTerm: (term) => set({ searchTerm: term }),
        }),
        {
            name: 'sample-search-storage',
        }
    )
)
