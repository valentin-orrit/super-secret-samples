import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from './ui/pagination'

interface PaginationControlsProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export default function PaginationControls({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationControlsProps) {
    const getPageNumbers = () => {
        const pages = []

        // Always include first page
        pages.push(1)

        // If current page is not near the start, add ellipsis
        if (currentPage > 3) {
            pages.push(null)
        }

        // Add pages around current page
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)

        for (let i = start; i <= end; i++) {
            pages.push(i)
        }

        // If current page is not near the end, add ellipsis
        if (currentPage < totalPages - 2) {
            pages.push(null)
        }

        // Always include last page if we have more than 1 page
        if (totalPages > 1) {
            pages.push(totalPages)
        }

        return pages
    }

    const pageNumbers = getPageNumbers()

    return (
        <Pagination className="my-1">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        onClick={() => onPageChange(currentPage - 1)}
                        className={
                            currentPage <= 1
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>

                {pageNumbers.map((page, i) =>
                    page === null ? (
                        <PaginationItem key={`ellipsis-${i}`}>
                            <PaginationEllipsis />
                        </PaginationItem>
                    ) : (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={page === currentPage}
                                onClick={() => onPageChange(page)}
                                className="cursor-pointer"
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    )
                )}

                <PaginationItem>
                    <PaginationNext
                        onClick={() => onPageChange(currentPage + 1)}
                        className={
                            currentPage >= totalPages
                                ? 'pointer-events-none opacity-50'
                                : 'cursor-pointer'
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
