import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react'

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
            className="grid grid-flow-col grid-cols-[auto_1fr_auto] sm:grid-cols-9 border-b border-gray-200 w-full sm:px-4 py-4 items-center justify-center text-sssaccentgray text-sm font-thin">

            {/* Instrument - Always visible */}
            <button
                onClick={() => handleSort('instrument')}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                instr
                {getSortIcon('instrument')}
            </button>

            {/* Loop - Hidden on mobile */}
            <button
                onClick={() => handleSort('loop')}
                className="hidden sm:flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                loop
                {getSortIcon('loop')}
            </button>

            {/* Name - Always visible, adjusted col-span */}
            <button
                onClick={() => handleSort('name')}
                className="text-start pl-2 sm:pl-0 flex items-center gap-1 col-span-1 sm:col-span-4 hover:text-gray-700 transition-colors"
            >
                name
                {getSortIcon('name')}
            </button>

            {/* Length - Hidden on mobile */}
            <button
                onClick={() => handleSort('length')}
                className="hidden sm:flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                time
                {getSortIcon('length')}
            </button>

            {/* BPM - Hidden on mobile */}
            <button
                onClick={() => handleSort('bpm')}
                className="hidden sm:flex items-center gap-1 hover:text-gray-700 transition-colors text-left"
            >
                bpm
                {getSortIcon('bpm')}
            </button>

            {/* Empty space for download column - Always visible */}
            <div className=""></div>
        </div>
    )
}