import { useEffect, useState } from 'react'
import { useSearchStore } from '../store'
import SamplefilterMenu from './SampleFilterMenu'
import { SearchIcon, X } from 'lucide-react'

interface SampleHeaderProps {
    title: string
    totalCount: number
    isLoading?: boolean
}

export default function SampleFilterSection({
    title,
    totalCount,
    isLoading = false,
}: SampleHeaderProps) {
    const {
        searchTerm,
        selectedInstrument,
        selectedGenre,
        setSearchTerm,
        setSelectedInstrument,
        setSelectedGenre,
        clearAllFilters,
    } = useSearchStore()
    const [instruments, setInstruments] = useState([])
    const [genres, setGenres] = useState([])

    // fetch instruments from db
    useEffect(() => {
        fetch('/api/get-instruments')
            .then((res) => res.json())
            .then((data) => {
                setInstruments(data)
            })
            .catch((err) => {
                console.error('Fetch error:', err)
            })
    }, [])

    // fetch genres from db
    useEffect(() => {
        fetch('/api/get-genres')
            .then((res) => res.json())
            .then((data) => {
                setGenres(data)
            })
            .catch((err) => {
                console.error('Fetch error:', err)
            })
    }, [])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearchTerm(value)
    }

    const hasActiveFilters = searchTerm || (selectedInstrument && selectedGenre)

    return (
        <header className="w-full flex flex-col align-middle justify-center p-6">
            <div className="flex w-full justify-between items-start">
                <div className="flex flex-row items-end justify-start gap-4">
                    <h1 className="text-3xl text-center font-bold">{title}</h1>
                </div>
                <div className="flex w-1/2 justify-center items-start bg-white rounded-lg p-2 border-2 border-sssmutegray group focus-within:border-sssyellow">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="search by name, genre and tags..."
                        onChange={handleChange}
                        value={searchTerm}
                        className="search-input w-full px-4 outline-none"
                    />
                    <div className=" m-auto text-xs text-sssaccentgray w-1/4">
                        {isLoading ? '...' : totalCount} results!
                    </div>
                </div>
            </div>
            <div className="mt-6 flex gap-4 items-center flex-wrap">
                <SamplefilterMenu
                    menuTitle="instruments"
                    menuContent={instruments}
                    filterType="instrument"
                />
                <SamplefilterMenu
                    menuTitle="genres"
                    menuContent={genres}
                    filterType="genre"
                />

                {/* Active filter tags */}
                {selectedInstrument && (
                    <button
                        onClick={() => setSelectedInstrument(null)}
                        className="hover:bg-yellow-200 p-0.5 ml-1 flex items-center gap-1 px-3 py-1 bg-sssyellow text-sssdarkblue rounded-full text-sm"
                        title="Remove instrument filter"
                    >
                        <span>{selectedInstrument}</span>
                        <X size={14} />
                    </button>
                )}

                {selectedGenre && (
                    <button
                        onClick={() => setSelectedGenre(null)}
                        className="flex items-center gap-1 px-3 py-1 bg-sssorange text-sssdarkblue text-sm hover:bg-orange-200 rounded-full p-0.5 ml-1"
                        title="Remove genre filter"
                    >
                        <span>{selectedGenre}</span>
                        <X size={14} />
                    </button>
                )}

                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="flex items-center gap-1 px-3 py-1 text-sm underline underline-offset-2 text-sssaccentgray hover:text-gray-800 transition-colors"
                        title="Clear all filters"
                    >
                        Clear all
                        {/* <X size={16} className="stroke-sssred" /> */}
                    </button>
                )}
            </div>
        </header>
    )
}
