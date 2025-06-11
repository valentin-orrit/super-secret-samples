import { persist } from 'zustand/middleware'
import { create } from 'zustand'

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
