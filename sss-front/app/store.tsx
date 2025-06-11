import { persist } from 'zustand/middleware'
import { create } from 'zustand'

type SearchState = {
    searchTerm: string
    selectedInstrument: string | null
    selectedGenre: string | null
    setSearchTerm: (term: string) => void
    setSelectedInstrument: (instrument: string | null) => void
    setSelectedGenre: (genre: string | null) => void
    clearAllFilters: () => void
}

export const useSearchStore = create<SearchState>()(
    persist(
        (set) => ({
            searchTerm: '',
            selectedInstrument: null,
            selectedGenre: null,
            setSearchTerm: (term) => set({ searchTerm: term }),
            setSelectedInstrument: (instrument) =>
                set({ selectedInstrument: instrument }),
            setSelectedGenre: (genre) => set({ selectedGenre: genre }),
            clearAllFilters: () =>
                set({
                    searchTerm: '',
                    selectedInstrument: null,
                    selectedGenre: null,
                }),
        }),
        {
            name: 'sample-search-storage',
        }
    )
)
