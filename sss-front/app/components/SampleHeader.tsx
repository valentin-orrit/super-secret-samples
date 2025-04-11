import { SearchIcon } from 'lucide-react'
import { useSearchStore } from '../store'
import SamplefilterMenu from './SampleFilterMenu'

interface SampleHeaderProps {
    title: string
    totalCount: number
    isLoading?: boolean
}

export default function SampleHeader({
    title,
    totalCount,
    isLoading = false,
}: SampleHeaderProps) {
    const { searchTerm, setSearchTerm } = useSearchStore()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearchTerm(value)
    }

    return (
        <header className="w-full flex flex-col align-middle justify-center p-6">
            <div className="flex w-full justify-between items-start">
                <div className="flex flex-row items-end justify-start gap-4">
                    <h1 className="text-3xl text-center font-bold">{title}</h1>
                    <p className="text-sssblue text-sm pb-[3px] mx-4">
                        35 credits
                    </p>
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
            <div className="mt-4 flex gap-4">
                <SamplefilterMenu
                    menuTitle="instruments"
                    menuContent={['drums', 'percs']}
                />
                <SamplefilterMenu
                    menuTitle="genres"
                    menuContent={['house', 'techno']}
                />
            </div>
        </header>
    )
}
