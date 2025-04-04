import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function SamplePagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div className="flex items-center justify-center my-6 gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
                aria-label="Previous page"
            >
                <ChevronLeft size={16} />
            </button>

            <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Create a simple window of pages
                    let pageNum = 1
                    if (totalPages <= 5) {
                        pageNum = i + 1
                    } else if (currentPage <= 3) {
                        pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i
                    } else {
                        pageNum = currentPage - 2 + i
                    }

                    return (
                        <button
                            key={i}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-8 h-8 rounded-md text-sm ${
                                currentPage === pageNum
                                    ? 'bg-amber-600 text-white font-bold'
                                    : 'border border-gray-300'
                            }`}
                        >
                            {pageNum}
                        </button>
                    )
                })}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="p-2 rounded-md border border-gray-300 disabled:opacity-50"
                aria-label="Next page"
            >
                <ChevronRight size={16} />
            </button>

            <span className="text-sm text-gray-500 ml-2">
                Page {currentPage} of {totalPages}
            </span>
        </div>
    )
}
