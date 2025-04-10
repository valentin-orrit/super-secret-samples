import { Sample } from '@prisma/client'
import { useState } from 'react'
import { SearchIcon } from 'lucide-react'

interface SampleHeaderProps {
    title: string
    samples: Sample[]
}

export default function SampleHeader({ title, samples }: SampleHeaderProps) {
    const [search, setSearch] = useState<string>('')
    const filteredSamples = samples.filter((sample) =>
        sample.name.toLowerCase().includes(search.toLowerCase())
    )

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value
        setSearch(value)
    }

    return (
        <header className="w-full flex flex-col align-middle justify-center p-6">
            <div className="flex w-full justify-between">
                <div className="flex flex-row items-end justify-start gap-4">
                    <h1 className="text-3xl text-center font-bold">{title}</h1>
                    <p className="text-sssblue text-sm pb-[3px] mx-4">
                        35 credits
                    </p>
                </div>
                <div className="flex w-1/2 justify-center items-start bg-white rounded-xl p-2 border-2 border-transparent group focus-within:border-sssyellow">
                    <SearchIcon />
                    <input
                        type="text"
                        placeholder="Search Here..."
                        onChange={handleChange}
                        value={search}
                        className="search-input w-full px-4 outline-none"
                    />
                </div>
            </div>
        </header>
    )
}
