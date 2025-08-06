import {ChevronUp, ChevronDown, ChevronsUpDown} from 'lucide-react'

interface SampleTableHeadProps {
    sortField: string | null
    sortDirection: 'asc' | 'desc'
    onSort: (field: string) => void
}

export default function SampleTableHead({
                                            sortField,
                                            sortDirection,
                                            onSort,
                                        }: SampleTableHeadProps) {
    const getSortIcon = (field: string) => {
        if (sortField !== field) {
            return <ChevronsUpDown className="w-4 h-4 text-sssaccentgray"/>
        }
        return sortDirection === 'asc' ? (
            <ChevronUp className="w-4 h-4 text-sssblue"/>
        ) : (
            <ChevronDown className="w-4 h-4 text-sssblue"/>
        )
    }

    const handleSort = (field: string) => {
        onSort(field)
    }

    return (
        <div
            className="grid grid-flow-col grid-cols-8 border-b border-gray-200 w-full px-4 py-4 items-center justify-center text-sssaccentgray text-sm font-thin">
            <button
                onClick={() => handleSort('instrument')}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                instrument
                {getSortIcon('instrument')}
            </button>

            <button
                onClick={() => handleSort('loop')}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                loop
                {getSortIcon('loop')}
            </button>

            <button
                onClick={() => handleSort('name')}
                className="text-start flex items-center gap-1 col-span-3 hover:text-gray-700 transition-colors"
            >
                name
                {getSortIcon('name')}
            </button>

            <button
                onClick={() => handleSort('length')}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                time
                {getSortIcon('length')}
            </button>

            {/*<button*/}
            {/*    onClick={() => handleSort('key')}*/}
            {/*    className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"*/}
            {/*>*/}
            {/*    key*/}
            {/*    {getSortIcon('key')}*/}
            {/*</button>*/}

            <button
                onClick={() => handleSort('bpm')}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                bpm
                {getSortIcon('bpm')}
            </button>
        </div>
    )
}
